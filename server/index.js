const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session")
const cookieParser = require("cookie-parser")
const path = require('path'); 
// dotenv
require('dotenv').config({ path: path.join(__dirname, '.env') });
//require("dotenv").config();

const app = express();

// Use our middlewares
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("common"));
app.use(express.json());
app.use(session(
    {
        secret: '1234567890', // don't use this secret in prod :)
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: 'auto',
            httpOnly: true,
            maxAge: 3600000
        }
    })
);

// Routes

app.use('/login', require('./routes/login'))
app.use('/token', require('./routes/token'))
app.use('/refresh', require('./routes/refresh'))
app.use('/oauth-callback', require('./routes/oauth-callback'))

// Provide a default port 
const port = process.env.SERVER_PORT || 3000;

// Listen to server  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
