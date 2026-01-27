import { env } from 'node:process'
import mysql from 'mysql2/promise';
import { DBConfig } from './DBConfig.js';
import { UserModel } from '../../domain/model/UserModel.js';
import { InsertError, UserNotFoundError } from '../../domain/error/Errors.js';
import { TaskModel } from '../../domain/model/Task.js';

export class Local {
    dbConnection

    constructor() {
        this.initConnection()
    }

    async initConnection() { 
        const password = env.DB_PASSWORD
        const port = env.DB_PORT
        const host = env.DB_HOST
        const user = env.DB_USER
        this.dbConnection = mysql.createPool({
            host: host,
            port: port,
            user: user,
            password: password,
            database: "hoyo",
            enableKeepAlive: true
        })
    }

    isUserExist(discordId) {
        return this.userData.find((value, index) => value.userDiscordId == discordId) != undefined
    }

    async getUserById(discordId) { 
        let [rows, _] = await this.dbConnection.query(`
            SELECT * FROM ${DBConfig.UserTable} WHERE discord_id = ?
        `, [discordId])
        const userData = rows.length > 0 ? rows[0] : null
        if (userData === null) throw new UserNotFoundError("")

        let userModel = UserModel.fromDatabase(userData)
        return userModel
    }

    async storeUser({con = this.dbConnection, newUser}) {
        const userGameRecord = newUser.userGameRecord
        if (!userGameRecord) return 
        let data = await con.query(`
            INSERT INTO ${DBConfig.UserTable} (
            discord_id, 
            cookie, 
            game_id, 
            game_role_id, 
            nickname,
            region
            ) VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            newUser.discordId,
            newUser.cookies,
            userGameRecord.gameId,
            userGameRecord.gameRoleId,
            userGameRecord.nickname,
            userGameRecord.region
        ]
        )
        let [result, _] = data
        console.log(result.affectedRows)
        return result.insertId
    }

    async addTask({con= this.dbConnection, userId, newTask}) { 
        
        let data = await con.query(`
            INSERT INTO ${DBConfig.TaskTable} (
            user_id,
            task_type,
            schedule
            ) VALUES (?, ?, ?)
        `,
        [
            userId,
            newTask.type,
            newTask.date
        ]
        )
        let [result, _] = data
        return result.affectedRows
    }

    async removeTask(param) {
        const { time = new Date() } = param
        await this.dbConnection.query(`DELETE FROM ${DBConfig.TaskTable} WHERE schedule <= ?`, [time])
    }

    async getTask(param) {
        const { by = new Date() } = param

        const [rows, _] = await this.dbConnection.query(`
            SELECT 
            user.user_id,
            user.discord_id, 
            user.cookie, 
            user.game_id, 
            user.game_role_id, 
            user.nickname,
            user.region,
            task.id,
            task.task_type,
            task.schedule
            FROM ${DBConfig.TaskTable} task
            INNER JOIN ${DBConfig.UserTable} user
            ON task.user_id = user.user_id
            WHERE task.schedule <= ?
            ORDER BY task.schedule ASC`, 
            [by]
        )

        let taskModel = rows.map(value => {
            console.log(value)
            return TaskModel.fromDatabase(value)
        }) 
        return taskModel
    }

    async rescheduleTask(param) { 
        const { taskId, newDate = new Date() } = param

        let [data, _] = await this.dbConnection.query(`
            UPDATE ${DBConfig.TaskTable}
            SET schedule = ?
            WHERE id = ?
        `, [newDate, taskId])

        console.log(`UPDATE ${data}`)
    }

    async storeUserWithTask(user, tasks) { 
        const connection = await this.dbConnection.getConnection()
        try { 
            await connection.beginTransaction()

            const userId = await this.storeUser({
                con: connection,
                newUser: user
            })
            if (!userId) throw new InsertError("Insert user error")

            for (const task of tasks) { 
                const affectedRows = await this.addTask({
                    con: connection,
                    userId: userId,
                    newTask: task
                })
                if (affectedRows <= 0) throw new InsertError("Insert task error")
            }
            await connection.commit()
        } catch(error) { 
            await connection.rollback()
            throw new InsertError(error.message)
        } finally {
            connection.release()
        }
    }
}