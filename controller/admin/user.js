const dataBase = require('../../model/user'); 
const crypto = require('crypto');


function getLogin(req, res){
    res.render('admin/users/login.ejs',{
        message: ''
    });
}

async function postLogin(req,res){ 
    const dbUser = await dataBase.getUsersLogin(req.body.user,req.body.password);
    
    if(dbUser){
        const authToken = generateAuthToken(); 
        global.authTokens[authToken] = {
            "user":dbUser,
        }; 
        res.cookie('AuthToken', authToken );

        res.redirect('/admin/calendars');
    }else{
        res.render('admin/users/login.ejs',{
            message: 'Usuario inválido'
        });
    }
}  

function getLogout(req, res){
    const authToken = req.cookies['AuthToken'];
    delete authTokens[authToken];
    res.cookie('AuthToken', '', {maxAge: -3000});
    res.redirect('/login');

}

function checkUser(req, res, next){ 
    if (!req.user) {
        res.redirect('/login');
    }else{
        next();
    }
}


function generateAuthToken(){
    return crypto.randomBytes(30).toString('hex');
}
module.exports = {getLogin, postLogin,getLogout, checkUser}