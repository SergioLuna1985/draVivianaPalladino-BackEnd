const dataBaseCalendars = require("../../model/calendar");
const dataBaseConsultingRooms = require("../../model/consultingRoom");


async function getCalendars(req,res){  
    let calendars = await dataBaseCalendars.getCalendars();
    res.render('admin/calendars/list.ejs',{ 
        calendars: calendars,
        message: req.flash('error')
    });

}

async function editCalendars(req,res){ 
    let calendar = await dataBaseCalendars.getCalendars(req.params.id); 
    let consultingRoom = await dataBaseConsultingRooms.getConsultingRooms(); 
    res.render('admin/calendars/form.ejs',{ 
        calendar : calendar,
        consultingRooms : consultingRoom,
        professionals : ""
 
    });
   
}

async function editPostCalendars(req,res){
    
    let id = req.params.id; 
    let EDFile;
    pathImagen = "";
   
    if (!req.files || Object.keys(req.files).length === 0) {
        pathImagen = req.body.imagen;
    }else{
        EDFile = req.files.file;
        uploadPath = './public/admin/assets/img/calendars/' + EDFile.name;
        await EDFile.mv(uploadPath,err => {
            if(err) return res.status(500).send({ message : err })
        });
        pathImagen = `/admin/assets/img/calendars/${EDFile.name}`;
        
    }

    await dataBaseProduct.editCalendars(id, req.body, pathImagen);
    res.redirect('/admin/calendars/');

    
}

async function addCalendars(req,res){ 

    categories = await dataBaseCategory.getCategories(); 
    res.render('admin/calendars/form.ejs',{ 
        calendar : "",
        Categories : categories
    });
   
}


async function saveCalendars(req, res){

    let EDFile;
    pathImagen = "";
   
    if (req.files || Object.keys(req.files).length !== 0) {
        EDFile = req.files.file;
        uploadPath = './public/admin/assets/img/calendars/' + EDFile.name;
        await EDFile.mv(uploadPath,err => {
            if(err) return res.status(500).send({ message : err })
        });
        pathImagen = `/admin/assets/img/calendars/${EDFile.name}`;
    }

    await dataBaseCalendars.saveCalendars(req.body, pathImagen);
    res.redirect('/admin/calendars/');

}

async function deleteCalendars(req, res){
    let id = req.params.id;
   
    await dataBaseCalendars.deleteCalendars(id);
    res.redirect('/admin/calendars/');
}


module.exports = {getCalendars, editCalendars, editPostCalendars, addCalendars, saveCalendars, deleteCalendars};