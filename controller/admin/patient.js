const dataBasePatients = require("../../model/patient");
const dataBaseTestimonies = require("../../model/testimony");

async function getPatients(req,res){  
    patients = await dataBasePatients.getPatients();
    testimonies = await dataBaseTestimonies.getTestimonies();
    res.render('admin/patient/list.ejs',{ 
        patients,
        testimonies,
        message: req.flash('error')
    });

}

async function editPatients(req,res){ 
    patient = await dataBasePatients.getPatients(req.params.id); 
    res.render('admin/patient/form.ejs',{ 
        patient
    });
   
}

async function editPostPatients(req,res){
    
    let id = req.params.id; 

    await dataBasePatients.editPatients(id, req.body);
    res.redirect('/admin/patient/');

}

async function addPatients(req,res){ 

    res.render('admin/patient/form.ejs',{ 
        patient : ""
    });
   
}


async function savePatients(req, res){
   
    await dataBasePatients.savePatients(req.body);
    res.redirect('/admin/patient/');

}

async function deletePatients(req, res){
    let id = req.params.id;
    let answer = await dataBasePatients.deletePatients(id);
    res.redirect('/admin/patient/');
}


module.exports = {getPatients, editPatients, editPostPatients, addPatients, savePatients, deletePatients};