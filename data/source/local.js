import { env } from 'node:process'
import mysql from 'mysql2/promise';
import { DBConfig } from './DBConfig.js';
import { UserModel } from '../../domain/model/UserModel.js';
import { UserNotFoundError } from '../../domain/error/Errors.js';

export class Local {
    dbConnection
    task = []

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

    async storeUser(newUser) {
        const userGameRecord = newUser.userGameRecord
        if (!userGameRecord) return 
        let data = await this.dbConnection.query(`
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
        console.log(data)
    }

    addTask(newTask) { 
        this.task.push(newTask)
    }

    removeTask(param) {
        const { time = Date.now() } = param
        this.task = this.task.filter((value) => value.date > time)
    }

    getTask(param) {
        const { by = Date.now() } = param
        const selectedTasks = this.task.filter(value => value.date <= by)
        console.log((new Date(by)).toLocaleString('id-ID'))
        selectedTasks.forEach((value) => {
            console.log(new Date(value.date).toLocaleString('id-ID'))
            console.log(value.date === by)
        })
        return selectedTasks
    }
}