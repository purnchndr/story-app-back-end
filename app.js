const express = require('express');
var cors = require('cors');
const morgan = require('morgan');
const userRoute = require('./routes/user');
const storyRoute = require('./routes/story');
const { catchRouteError, undefinedRoute } = require('./errors/error');
const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/user/', userRoute);
app.use('/api/story/', storyRoute);
app.all('*', undefinedRoute);
app.use(catchRouteError);

module.exports = app;
