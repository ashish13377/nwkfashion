const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv').config()
const bodyparser = require("body-parser");
const userRoutes = require("./routes/userRoutes.js")
const connectMongo = require("./config/db/db.js")
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5904;
const URL = `http://localhost:${PORT}/`

connectMongo();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.use("/api/users", userRoutes);


app.listen(PORT, () => {
    console.log(
        `*************************************************************
*                                                           *
*       App Name  : nwkfacion,                              *
*       Version : 1.0.0,                                    *
*       Main : app.js ,                                     *
*       Copyright (c) 2023, nwkfacion.                      *
*       Server Listening on ${URL}          *
*                                                           *
*************************************************************  
`);
})