import mysql from 'mysql2/promise';
import 'dotenv/config';
import { env } from "node:process";
import { DBConfig } from '../data/source/DBConfig.js';

class Database { 
    dbConnection

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

    async createTables() { 
        await this.dbConnection.query(`
            CREATE TABLE IF NOT EXISTS ${DBConfig.UserTable} (
                user_id int PRIMARY KEY AUTO_INCREMENT,
                discord_id varchar(100),
                cookie varchar(255),
                game_id int,
                game_role_id varchar(100),
                nickname varchar(255),
                region varchar(30)
            );
        `)

        await this.dbConnection.query(`
            CREATE TABLE IF NOT EXISTS ${DBConfig.TaskTable} (
                id int PRIMARY KEY AUTO_INCREMENT,
                user_id int,
                task_type varchar(100),
                schedule datetime,
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
            SELECT * FROM ${DBConfig.UserTable} WHERE discord_id = 
        `)
        console.log(data)
    }

    async delete() {
        await this.dbConnection.query(`DELETE FROM ${DBConfig.UserTable} WHERE discord_id = `)
    }
    
}

new Database().delete()