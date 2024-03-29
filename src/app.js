const Express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const middleware = require('./middlewares/index');
const configs = require('./config');

//Connect DB
mongoose.connect(configs.connectionString);


//Load Models
require('./models/user');

//#region Imports Routes
const indexRoute = require('./routes/indexRoute');
const authRoute = require('./routes/authRoute');
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

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});