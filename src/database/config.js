import Sequelize from "sequelize"
import 'dotenv/config'
const db = new Sequelize(
    'isekai',
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
    host:process.env.DATABASE_HOST,
    dialect: 'mysql',
})

export default db