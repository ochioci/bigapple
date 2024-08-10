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
    cookie: { secure: true }
}));

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
    console.log(req.body);
});


//LOGIN API
app.post('/login', jsonParser, (req, res) => {

    let e = req.body.email
    let p = req.body.password
    db.get("SELECT * FROM users WHERE (email=$email AND hashedPassword=$password) ", {$email: e, $password: p}, (err, row) => {
        console.log(row)
        if (row === undefined) {
            console.log("login failed")
            res.json({message: "failure"})
        } else {
            console.log("success!")

            res.json({message: "success", loginName: row.firstname})
        }
        // console.log(e, p)
    })

})
//


app.post("/contactAPI", jsonParser, (req, res) => {
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