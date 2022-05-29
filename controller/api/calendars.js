const dataBase = require("../../model/calendars");


async function getCalendars(req, res){
    let id = req.params.id;
    if (id){
        
        let answer = await dataBase.getCalendars(id);
    
        if (answer){
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(answer)); 
        }else{
            res.sendStatus(404); 
        }
    }else{
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(await dataBase.getCalendars()));
    }
}

async function editCalendars(req, res){
    let id = req.params.id;
   
    let answer = await dataBase.editCalendars(id, req.body);

    if (answer){
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(answer)); 
    }else{
        res.sendStatus(404);  
    }
    
}

async function saveCalendars(req, res){
    let data = req.body;
    let answer = await dataBase.saveCalendars(data);

    if (answer){
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(answer)); 
    }else{
        res.sendStatus(404);  
    }

}

async function deleteCalendars(req, res){
    let id = req.params.id;
   
    let answer = await dataBase.deleteCalendars(id);

    if (answer){
        res.set('Content-Type', 'text/plain');
        res.send("Eliminado correctamente");
    }else{
        res.sendStatus(404);  
    }
    
}


module.exports = {getCalendars, editCalendars, saveCalendars, deleteCalendars};