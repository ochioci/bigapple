const express = require("express");
const bodyParser = require('body-parser')
const session = require("express-session");

const PORT = process.env.PORT || 3001;
var jsonParser = bodyParser.json()
const app = express();
const sqlite3 = require("sqlite3");
app.use(jsonParser);
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const requireAuth = (req, res, next) => {
    if (req.session.email !== undefined) {
        // console.log("user authenticated, continue")
        next(); // User is authenticated, continue to next middleware
    } else {
        // console.log("user not authenticated, failure")
        res.json({message: "failure"})
    }
}

const db = new sqlite3.Database('./app.db');
db.run("CREATE TABLE IF NOT EXISTS messages([message] TEXT, [email] TEXT)")
db.run("CREATE TABLE IF NOT EXISTS estates([location] TEXT, [availability] TEXT)")
db.run("CREATE TABLE IF NOT EXISTS users([firstname] TEXT, [lastname] TEXT, [email] TEXT, [hashedPassword] TEXT)")



//TODO: Implement registration unique email check
//TODO: Implement login session stuff
//TODO:: Implement password hashing
app.post('/register', (req, res) => {
    res.json({ message: "success"});
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let email = req.body.email
    let password = req.body.password
    db.run(`INSERT INTO users (firstname, lastname, email, hashedPassword) VALUES (?, ?, ?, ?)`, [firstname, lastname, email, password])
    // console.log(req.body);
});

app.post('/logout', jsonParser, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            // console.error(err);
            res.json({message: "failure"})
        } else {
            res.json({message: "success"})
        }
    });

})

//LOGIN API
app.post('/login', jsonParser, (req, res) => {

    let e = req.body.email
    let p = req.body.password
    db.get("SELECT * FROM users WHERE (email=$email AND hashedPassword=$password) ", {$email: e, $password: p}, (err, row) => {
        // console.log(row)
        if (row === undefined) {
            // console.log("login failed")
            res.json({message: "failure"})
        } else {
            // console.log("success!")
            req.session.email = row.email;
            // console.log("Session id: " + row.email)
            res.json({message: "success", loginName: row.firstname})
        }
        // console.log(e, p)
    })
})
//


app.post("/contactAPI", requireAuth, jsonParser, (req, res) => {
    res.json({ message: "success"});
    let m = req.body.message
    let e = req.body.email
    db.run(`INSERT INTO messages (message, email) VALUES (?, ?)`, [m, e])
});

app.get("/getMessages", jsonParser, (req, res) => {
    let rows = []
    db.all("SELECT * FROM messages",
        (error, row) => {
            row.forEach((r) => {
                rows.push(r)
            })
            res.json({"messsage": "success", "rows": rows})
        }
    );
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});