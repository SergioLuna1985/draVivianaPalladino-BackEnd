const connection = require('../bd/baseDeDatos');

async function getPatients(id){

    let patient;

    if (id) {
        const [rows, fields] = await (await connection.main()).execute('SELECT * FROM paciente WHERE paciente.id = ?;', [id]);

        patient = rows[0];

    } else {
        const [rows, fields] = await (await connection.main()).execute('SELECT * FROM paciente ');

        patient = rows;
    }

    return patient;
}

async function editPatients(id, data){

    let answer;

    try {
        const [answer] = await (await connection.main()).execute('UPDATE paciente SET paciente.nombre = ?, paciente.apellido = ?, paciente.dni = ?, paciente.fechaDeCreacion = ?, paciente.fechaDeActualizacion = ? WHERE paciente.id = ?', [data.nombre, data.apellido, data.dni, data.fechaCreacion, data.fechaActualizacion, id],);
    } catch (error) {
        console.log("ERROR al editar la tabla paciente "+error);
    }

    if(answer != null){
    
    
    }
   

}


async function savePatients(data){

    let answer;
   
    try {
        [answer] = await (await connection.main()).execute('INSERT INTO paciente (nombre, apellido, dni, fechaDeCreacion, fechaDeActualizacion ) VALUES (?, ?, ?, ?, ?);',[data.nombre, data.apellido, data.dni, data.fechaCreacion, data.fechaActualizacion]);
    } catch (error) {
        console.error("ERROR en consulta SQL sobre tabla direccion " + error);
    }

}


async function deletePatients(id){

    try {
        const [rows] = await (await connection.main()).execute('DELETE FROM `paciente` WHERE paciente.id = ?', [id]);
    } catch (error) {
        console.error("ERROR al eliminar el registro "+error);
    }
    

}

module.exports = {getPatients, editPatients, savePatients, deletePatients};