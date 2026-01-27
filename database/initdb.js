import mysql from 'mysql2/promise';
import 'dotenv/config';
import { env } from "node:process";
import { DBConfig } from '../data/source/DBConfig.js';
import { Local } from '../data/source/local.js';

class Database { 
    dbConnection

    localApi = new Local()

    constructor() { 
        this.initConnection()
        this.createDatabase()
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

    async createDatabase() { 
        await this.dbConnection.query(`
            CREATE DATABASE IF NOT EXISTS hoyo
            CHARACTER SET utf8mb4 
            COLLATE utf8mb4_unicode_ci
        `)

        await this.dbConnection.query(`USE hoyo`)
    }

    async drop() { 
        await this.dbConnection.query(`DROP TABLE ${DBConfig.TaskTable}`)
        await this.dbConnection.query(`DROP TABLE ${DBConfig.UserTable}`)
    }

    async createTables() { 
        await this.dbConnection.query(`
            CREATE TABLE IF NOT EXISTS ${DBConfig.UserTable} (
                user_id int PRIMARY KEY AUTO_INCREMENT,
                discord_id varchar(100) UNIQUE NOT NULL,
                cookie text NOT NULL,
                game_id int NOT NULL,
                game_role_id varchar(100) NOT NULL,
                nickname varchar(255) NOT NULL,
                region varchar(30) NOT NULL
            )
        `)

        await this.dbConnection.query(`
            CREATE TABLE IF NOT EXISTS ${DBConfig.TaskTable} (
                id int PRIMARY KEY AUTO_INCREMENT,
                user_id int NOT NULL,
                task_type varchar(100) NOT NULL,
                schedule datetime NOT NULL,
                FOREIGN KEY (user_id) REFERENCES ${DBConfig.UserTable}(user_id)
            );
        `)

        console.log("Finished")
    }

    async alter() { 
        await this.dbConnection.query(`ALTER TABLE ${DBConfig.UserTable} MODIFY COLUMN cookie TEXT`)
    }

    async queryTest() { 
        let data = await this.dbConnection.query(`
            SELECT * FROM ${DBConfig.UserTable} 
        `, [new Date()])
        console.log(data)
    }

    async deleteAll() { 
        await this.dbConnection.query(`DELETE FROM ${DBConfig.TaskTable}`)
        await this.dbConnection.query(`DELETE FROM ${DBConfig.UserTable}`)
    }

    async insert() { 
        let data = await this.dbConnection.query(`
            INSERT INTO ${DBConfig.UserTable} (
            discord_id, 
            cookie, 
            game_id, 
            game_role_id, 
            nickname,
            region
            ) VALUES ("testtt", "test", 2, "test", "test", "test")
        `)
        console.log(data)
        let [result, _] = data
        console.log(result.affectedRows)
    }
}

new Database().deleteAll()