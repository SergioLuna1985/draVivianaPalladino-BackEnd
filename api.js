const express = require ('express');
const apiApplication = express();
const bodyParser = require ('body-parser');
const config = require('config');
const cors = require('cors');

const port = config.get('Api.port');
apiApplication.set('port', port);

apiApplication.use(cors());
apiApplication.use(bodyParser.urlencoded( {extended:false} ));
apiApplication.use(bodyParser.json());

const calendars = require('./controller/api/calendars');

apiApplication.get('/calendars', calendars.getCalendars);
apiApplication.get('/calendars/:id', calendars.getCalendars);
apiApplication.post('/calendars', calendars.saveCalendars);
apiApplication.put('/calendars/:id', calendars.editCalendars);
apiApplication.delete('/calendars/:id', calendars.deleteCalendars);


apiApplication.listen(apiApplication.get('port'), () => {
  console.log(`Aplicación Api corriendo en el puerto ${apiApplication.get('port')}`);
})