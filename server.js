const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({ path: './config/.env' });
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const dbconnect = require('./config/db');

const cors = require('cors');

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//JWT
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})


//connenction to the routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

//function to connect to database:
dbconnect();


// server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})