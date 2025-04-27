const mysql = require("mysql2")

const dotenv = require("dotenv")
dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB,
  password: process.env.DB_PASS,
})

module.exports = pool.promise()
