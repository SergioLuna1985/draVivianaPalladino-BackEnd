const mysql = require('mysql2/promise');
const config = require('config');

async function main() {

    const connection = await mysql.createConnection({
        host: config.get('DB.ip'), 
        user: config.get('DB.user'), 
        password: config.get('DB.pass'), 
        database: config.get('DB.name')});
    // query database

    connection.connect((err)=>{
        if(err){
            console.log("El error de conexión es: "+err);
            return;
        }
    });

    return connection;

  }

module.exports = {main};