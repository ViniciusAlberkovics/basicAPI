const Express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const middleware = require('../middlewares/index');

//Connect DB
let mongoConnection = 'mongodb+srv://nodeAPI:pZLUe72QqZKOnmHn@clusterunique-8sk5m.mongodb.net/BasicAPI'
mongoose.connect(mongoConnection);


//Load Models
require('../models/user');

//#region Imports Routes
const indexRoute = require('../routes/indexRoute');
const authRoute = require('../routes/authRoute');
//#endregion

const app = new Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

//#region Middleware Global
app.use(middleware.apiAuthorization);
app.use(middleware.error);
//#endregion

//#region Register Routes
app.use('/', indexRoute);
app.use('/auth', authRoute);
//#endregion

const port = process.env.PORT || 5001;
const hostname = 'localhost';

app.listen(port, hostname, () => {
    console.log(`Listening on http://${hostname}:${port}/`);
});