const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const fileUpload = require('express-fileupload')

const webAplication = express();

const port = config.get('Admin.port');
webAplication.set('port', port);

const authTokens = [];
global.authTokens = authTokens;

webAplication.set('views', __dirname +'/views' );
webAplication.set('view engine','ejs');

webAplication.use(cors());
webAplication.use(fileUpload());
webAplication.use(bodyParser.urlencoded({extended:false}));
webAplication.use(bodyParser.json());
webAplication.use(express.static(path.join(__dirname,'public')));
webAplication.use(session({ 
  secret:'EstudioMoon', 
  saveUninitialized: true, 
  resave: true
})); 
webAplication.use(cookieParser());
webAplication.use(flash()); 

// inyecto el usuario
webAplication.use((req, res, next) => {
    // Obtener el token del usuario por las cookies
    const authToken = req.cookies['AuthToken'];
    // Inyecto el usuario a la peticion 
    req.user = authTokens[authToken];
    next();
});

//BACKEND

const admin = require('./controller/admin/home');
const calendars = require('./controller/admin/calendar');
const consultingRooms = require('./controller/admin/consultingRoom');
const abmUser = require('./controller/admin/user');

webAplication.get('/admin/*',abmUser.checkUser);

webAplication.get('/admin',admin.getIndex);

/* Calendarios*/

webAplication.get('/admin/calendars', calendars.getCalendars);
webAplication.get('/admin/calendars/edit/:id', calendars.editCalendars);
webAplication.post('/admin/calendars/edit/:id', calendars.editPostCalendars);
webAplication.get('/admin/calendars/add', calendars.addCalendars);
webAplication.post('/admin/calendars/add', calendars.saveCalendars);
webAplication.get('/admin/calendars/del/:id', calendars.deleteCalendars);

/* Consultorios*/

webAplication.get('/admin/consultingRoom', consultingRooms.getConsultingRooms);
webAplication.get('/admin/consultingRoom/edit/:id', consultingRooms.editConsultingRooms);
webAplication.post('/admin/consultingRoom/edit/:id', consultingRooms.editPostConsultingRooms);
webAplication.get('/admin/consultingRoom/add', consultingRooms.addConsultingRooms);
webAplication.post('/admin/consultingRoom/add', consultingRooms.saveConsultingRooms);
webAplication.get('/admin/consultingRoom/del/:id', consultingRooms.deleteConsultingRooms);

/* */

webAplication.get('/login',abmUser.getLogin);
webAplication.get('/logout',abmUser.getLogout);
webAplication.post('/login',abmUser.postLogin);



webAplication.listen(webAplication.get('port'),()=>{
    console.log('Servidor web corriendo en puerto:'+webAplication.get('port'));
}); 
