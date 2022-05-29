const connection = require('../bd/baseDeDatos');

async function getConsultingRooms(id){

    let consultingRoom;

    if (id) {
        const [rows, fields] = await (await connection.main()).execute('SELECT consultorio.id, consultorio.nombre, consultorio.alias, consultorio.telefono, consultorio.email, consultorio.estado, consultorio.fechaDeCreacion As fechaCreacion, consultorio.fechaDeActualizacion As fechaActualizacion , tipodeconsulta.nombre As tipoDeConsulta, direccion.calle, direccion.numero, direccion.barrio, direccion.localidad, direccion.provincia FROM `consultorio` LEFT JOIN tipodeconsulta ON consultorio.tipodeconsulta = tipodeconsulta.id LEFT JOIN direccion ON consultorio.direccion = direccion.id WHERE consultorio.id = ?;', [id]);

        consultingRoom = rows[0];

    } else {
        const [rows, fields] = await (await connection.main()).execute('SELECT  consultorio.id, consultorio.nombre, consultorio.alias, consultorio.telefono, consultorio.email, consultorio.estado, consultorio.fechaDeCreacion As fechaCreacion, consultorio.fechaDeActualizacion As fechaActualizacion , tipodeconsulta.nombre As tipoDeConsulta, direccion.calle, direccion.numero, direccion.barrio, direccion.localidad, direccion.provincia  FROM `consultorio` LEFT JOIN tipodeconsulta ON consultorio.tipodeconsulta = tipodeconsulta.id LEFT JOIN direccion ON consultorio.direccion = direccion.id');

        consultingRoom = rows;
    }

    return consultingRoom;
}

async function editConsultingRooms(id, data){

    console.log(data);

    let answer;

    try {
        const [answer] = await (await connection.main()).execute('UPDATE consultorio INNER JOIN tipodeconsulta ON consultorio.tipodeconsulta = tipodeconsulta.id INNER JOIN direccion ON consultorio.direccion = direccion.id SET consultorio.nombre = ?, consultorio.alias = ?, consultorio.telefono = ?, consultorio.email = ?, consultorio.estado = ?, consultorio.fechaDeCreacion = ?, consultorio.fechaDeActualizacion = ?, consultorio.tipodeconsulta = ?, direccion.calle = ?, direccion.numero = ?, direccion.barrio = ?, direccion.localidad = ?, direccion.provincia = ? WHERE consultorio.id = ?', [data.nombre, data.alias, data.telefono, data.email, data.estado, data.fechaCreacion, data.fechaActualizacion, data.tipoDeConsulta, data.calle, data.numero, data.barrio, data.localidad, data.provincia, id],);
    } catch (error) {
        console.log("ERROR al editar la tabla dirección "+error);
    }

    if(answer != null){
    
    
    }
   

}


async function saveConsultingRooms(data){

    let answer;
   
    try {
        [answer] = await (await connection.main()).execute('INSERT INTO direccion (calle, numero, barrio, localidad, provincia ) VALUES (?, ?, ?, ?, ?);',[data.calle, data.numero, data.barrio, data.localidad, data.provincia]);
    } catch (error) {
        console.error("ERROR en consulta SQL sobre tabla direccion " + error);
    }
    
    if(answer != null){

        let idDireccion = answer.insertId;

        try {
            const [rows] = await (await connection.main()).execute('INSERT INTO consultorio (alias, nombre, direccion, telefono, email, tipodeconsulta, fechaDeCreacion, fechaDeActualizacion) VALUES (?, ?, ?, ?, ?, ?, ?, ? );', [data.alias, data.nombre, idDireccion, data.telefono, data.email, data.tipoDeConsulta, data.fechaCreacion, data.fechaActualizacion]);

        } catch (error) {
            console.error("ERROR en consulta SQL sobre tabla consultorio " + error);
        }

    }

}


async function deleteConsultingRooms(id){

    try {
        const [rows] = await (await connection.main()).execute('DELETE FROM `consultorio` WHERE consultorio.id = ?', [id]);
    } catch (error) {
        console.log("ERROR al eliminar el registro "+error);
    }
    

}

module.exports = {getConsultingRooms, editConsultingRooms, saveConsultingRooms, deleteConsultingRooms};