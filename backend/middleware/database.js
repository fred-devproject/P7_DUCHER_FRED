

const { Sequelize } = require('sequelize');

const db = new Sequelize('groupodb_dev', 'postgres', '!GroupoPWD!', {
    host: 'localhost',
    dialect:'postgres'
});

async function testConnect() {
    try {
        await db.authenticate();
        console.log('Yesss Postgres is connected !!!');
    } catch (error){
        console.log('WTF !!! another one Bug', error);
    }
}

testConnect();

module.exports = db;