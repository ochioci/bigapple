const express = require("express");
const bodyParser = require('body-parser')
const session = require("express-session");

const PORT = process.env.PORT || 3001;
var jsonParser = bodyParser.json()
const app = express();
const sqlite3 = require("sqlite3");
const {initLoginAPI} = require("./auth/login.cjs");
const {initRegisterAPI} = require("./auth/register.cjs");
const {initContactAPI} = require("./misc/contact.cjs");
const {initEstatesAPI} = require("./content/estates.cjs");
// import {initLoginAPI} from "./auth/login.cjs";
// import {initRegisterAPI} from "./auth/register.cjs"
app.use(jsonParser);
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const requireAuth = (req, res, next) => {
    if (req.session.userID !== undefined) {
        // console.log("accounts authenticated, continue")
        next(); // User is authenticated, continue to next middleware
    } else {
        // console.log("accounts not authenticated, failure")
        res.json({message: "failure"})
    }
}

const requireEstate = (req, res, next) => {
    if (req.session.userID !== undefined) {
        if (req.session.role == "Estate") {
            next()
        } else {
            res.json({message: "failure"})
        }
    } else {
        res.json({message: "failure"})
    }

}

const db = new sqlite3.Database('./app.db');
db.run("CREATE TABLE IF NOT EXISTS messages([message] TEXT, [email] TEXT)")
db.run("CREATE TABLE IF NOT EXISTS estates([name] TEXT, [location] TEXT, [availability] TEXT, [ownerID] INTEGER NOT NULL, [estateID] INTEGER PRIMARY KEY NOT NULL)")
db.run("CREATE TABLE IF NOT EXISTS users([firstname] TEXT, [lastname] TEXT, [email] TEXT, [hashedPassword] TEXT, [role] TEXT, [userID] INTEGER PRIMARY KEY NOT NULL)")



initLoginAPI(app, db, requireAuth, jsonParser)
initRegisterAPI(app, db, requireAuth, jsonParser)
initContactAPI(app, db, requireAuth, jsonParser)
initEstatesAPI(app, db, requireAuth, requireEstate, jsonParser)



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});