const connection = require('../bd/baseDeDatos');
const crypto = require('crypto');

async function getUsersLogin(user, pass){

    let userDb;

    const [rows, fields] = await (await connection.main()).execute('SELECT `id`, `nombre` FROM `usuario` WHERE `usuario`= ? AND `contrasenia`= ?;', [user, getHashPass(pass)]);

    answer = rows.map(function (elementoActual){
        return elementoActual;
    }) 

    if(answer[0]){
        userDb = answer[0];
    }else{
        userDb = null;
    }

    return userDb;
}

function getHashPass(password){
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}


module.exports = {getUsersLogin};