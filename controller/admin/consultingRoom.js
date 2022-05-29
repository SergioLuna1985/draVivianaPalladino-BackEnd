const dataBaseConsultingRoom = require("../../model/consultingRoom");

async function getConsultingRooms(req,res){  
    consultingRoom = await dataBaseConsultingRoom.getConsultingRooms();
    res.render('admin/consultingRoom/list.ejs',{ 
        consultingRooms : consultingRoom,
        message: req.flash('error')
    });

}

async function editConsultingRooms(req,res){ 
    consultingRoom = await dataBaseConsultingRoom.getConsultingRooms(req.params.id); 
    res.render('admin/consultingRoom/form.ejs',{ 
        data : consultingRoom
    });
   
}

async function editPostConsultingRooms(req,res){
    
    let id = req.params.id; 

    await dataBaseConsultingRoom.editConsultingRooms(id, req.body);
    res.redirect('/admin/consultingRoom/');

}

async function addConsultingRooms(req,res){ 

    res.render('admin/consultingRoom/form.ejs',{ 
        data : ""
    });
   
}


async function saveConsultingRooms(req, res){
   
    await dataBaseConsultingRoom.saveConsultingRooms(req.body);
    res.redirect('/admin/consultingRoom/');

}

async function deleteConsultingRooms(req, res){
    let id = req.params.id;
    let answer = await dataBaseConsultingRoom.deleteConsultingRooms(id);
    res.redirect('/admin/consultingRoom/');
}


module.exports = {getConsultingRooms, editConsultingRooms, editPostConsultingRooms, addConsultingRooms, saveConsultingRooms, deleteConsultingRooms};