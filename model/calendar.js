const connection = require('../bd/baseDeDatos');

async function getCalendars(id){

    let calendars;

    if (id) {
        const [rows, fields] = await (await connection.main()).execute('SELECT * FROM `calendario` WHERE `id` = ?', [id]);

        calendars = rows[0];

    } else {
        
        const [rows, fields] = await (await connection.main()).execute(' SELECT calendario.id, calendario.nombre As nombreCalendario, consultorio.alias As aliasConsultorio, consultorio.nombre As nombreConsultorio, consultorio.telefono As telefonoConsultorio, consultorio.email As emailConsultorio, direccion.calle As calleConsultorio, direccion.numero As numeroDeCalleConsultorio, direccion.barrio barrioConsultorio, direccion.localidad As localidadConsultorio, direccion.provincia As provinciaConsultorio, especialidad.nombre As especialidadConsultorio, profesional.nombre As nombreProfesional, profesional.apellido As apellidoProfesional FROM `calendario`LEFT JOIN calendarioconsultorio ON calendario.id = calendarioconsultorio.idcalendario LEFT JOIN consultorio ON calendarioconsultorio.idconsultorio = consultorio.id LEFT JOIN direccion ON consultorio.direccion = direccion.id LEFT JOIN consultorioespecialidad ON consultorio.id = consultorioespecialidad.idconsultorio LEFT JOIN especialidad ON consultorioespecialidad.idespecialidad = especialidad.id LEFT JOIN profesionalconsultorio ON consultorio.id = profesionalconsultorio.idprofesional LEFT JOIN profesional ON profesionalconsultorio.idprofesional = profesional.id; ');

        calendars = rows;
    }

    return calendars;
}

async function editCalendars(id, data, imagen){

    let calendars;

    const [rows] = await (await connection.main()).execute('UPDATE `productos` SET `nombre`= ?,`descripcion`= ?,`precio`= ?,`stock`= ?,`bonificacion`= ?,`imagen`= ?,`Categoria`= ?,`Administrador`= ?,`estado`= ? WHERE `id`= ?', [data.nombre, data.descripcion, data.precio, data.stock, data.bonificacion, imagen, data.Categoria, data.Administrador, data.estado, id],);
     
    if(rows.affectedRows==1){
        calendars = getCalendars(id);
    }else{
        calendars = null; 
    }

    return calendars;
}

async function saveCalendars(data, imagen){

    let calendars;

    const [rows] = await (await connection.main()).execute('INSERT INTO `productos`(`nombre`, `descripcion`, `precio`, `stock`, `bonificacion`, `imagen`, `Categoria`, `Administrador`, `estado`) VALUES (?,?,?,?,?,?,?,?,?)', [data.nombre, data.descripcion, data.precio, data.stock, data.bonificacion, imagen, data.Categoria, data.Administrador, data.estado]);

    if(rows.affectedRows==1){
        calendars = getCalendars(rows.insertId);
    }else{
        calendars = null; 
    }

    return calendars;
}

async function deleteCalendars(id){

    let estado;

    const [rows] = await (await connection.main()).execute('DELETE FROM `productos` WHERE productos.id = ?', [id]);

    if(rows.affectedRows==1){
        estado = true;
    }else{
        estado = false; 
    }

    return estado;
}



module.exports = {getCalendars, editCalendars, saveCalendars, deleteCalendars};