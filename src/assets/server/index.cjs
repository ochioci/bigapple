const express = require("express");
const bodyParser = require('body-parser')
const session = require("express-session");
const cors = require('cors')

const PORT = process.env.PORT || 3001;
var jsonParser = bodyParser.json()
const app = express();
const sqlite3 = require("sqlite3");
const {initLoginAPI} = require("./auth/login.cjs");
const {initRegisterAPI} = require("./auth/register.cjs");
const {initContactAPI} = require("./misc/contact.cjs");
const {initEstatesAPI} = require("./content/estates.cjs");
const {initDropoffsAPI} = require("./content/dropoffs.cjs");
const {initTransferAPI} = require("./content/transfers.cjs");
const {initAdminAPI} = require("./content/admin.cjs");
// import {initLoginAPI} from "./auth/login.cjs";
// import {initRegisterAPI} from "./auth/register.cjs"
app.use(jsonParser);
app.use(cors())
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

const requireTransfer = (req, res, next) => {
    if (req.session.userID !== undefined) {
        if (req.session.role == "Picker") {
            next()
        } else {
            res.json({message: "failure"})
        }
    } else {
        res.json({message: "failure"})
    }
}

const requireShelter = (req, res, next) => {
    if (req.session.userID !== undefined) {
        if (req.session.role == "Shelter") {
            next()
        } else {
            res.json({message: "failure"})
        }
    } else {
        res.json({message: "failure"})
    }
}

const requireAdmin = (req, res, next) => {
    if (req.session.userID !== undefined) {
        if (req.session.role == "admin") {
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
db.run("CREATE TABLE IF NOT EXISTS estates([name] TEXT, [location] TEXT, [approxLocation] TEXT, [availability] TEXT, [treeDetails] TEXT, [ownerID] INTEGER NOT NULL, [estateID] INTEGER PRIMARY KEY NOT NULL)")
db.run("CREATE TABLE IF NOT EXISTS dropoffs([name] TEXT, [location] TEXT, [availability] TEXT, [ownerID] INTEGER NOT NULL, [dropoffID] INTEGER PRIMARY KEY NOT NULL)")
db.run("CREATE TABLE IF NOT EXISTS users([firstname] TEXT, [lastname] TEXT, [email] TEXT, [hashedPassword] TEXT, [role] TEXT, [phoneNumber] TEXT, [userID] INTEGER PRIMARY KEY NOT NULL)", (err, row) => {
    db.all("SELECT * FROM users WHERE role = 'admin'", (err, rows) => {
        if (err || rows.length === 0) {
            db.run("INSERT INTO users (email, hashedPassword, role) VALUES ('angiesmichaels@gmail.com', 'July292007', 'admin')")
        }
    })
})
db.run("CREATE TABLE IF NOT EXISTS transfers([window] TEXT, [dropoffWindow] TEXT, [estateID] INTEGER NOT NULL, [dropoffID] INTEGER NOT NULL, [userID] INTEGER NOT NULL, [isConfirmed] INTEGER NOT NULL, [transferID] INTEGER PRIMARY KEY NOT NULL)")
db.run("CREATE TABLE IF NOT EXISTS estateWindows([timeStart] TEXT, [timeEnd] TEXT, [date] TEXT, [bookedBy] INTEGER DEFAULT 0 NOT NULL, [estateID] INTEGER NOT NULL, [windowID] INTEGER PRIMARY KEY NOT NULL)")
db.run("CREATE TABLE IF NOT EXISTS appointments([status] TEXT DEFAULT `requested` NOT NULL, [windowID] INTEGER NOT NULL, [estateID] INTEGER NOT NULL, [userID] INTEGER NOT NULL, [appointmentID] INTEGER PRIMARY KEY NOT NULL)")
initLoginAPI(app, db, requireAuth, jsonParser)
initRegisterAPI(app, db, requireAuth, jsonParser)
initContactAPI(app, db, requireAuth, jsonParser)
initEstatesAPI(app, db, requireAuth, requireEstate, jsonParser)
initDropoffsAPI(app, db, requireAuth, requireShelter, jsonParser)
initTransferAPI(app, db, requireAuth, requireTransfer, jsonParser)
initAdminAPI(app, db, requireAuth, requireAdmin, jsonParser)


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});