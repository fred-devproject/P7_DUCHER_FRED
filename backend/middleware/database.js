

const sequelize  = require('sequelize');
require('dotenv').config();

const db = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
    host: 'localhost',
    dialect:'postgres',
    logging: false
});


async function testConnect() {
    try {
        db.authenticate();
        console.log('Database connected !!!');
    } catch (error){
        console.log('Echec de la connection à la base de données', error);
    }
}

testConnect();


module.exports = db;