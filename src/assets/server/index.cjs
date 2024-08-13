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
    if (req.session.userID !== undefined) {
        // console.log("accounts authenticated, continue")
        next(); // User is authenticated, continue to next middleware
    } else {
        // console.log("accounts not authenticated, failure")
        res.json({message: "failure"})
    }
}

const db = new sqlite3.Database('./app.db');
db.run("CREATE TABLE IF NOT EXISTS messages([message] TEXT, [email] TEXT)")
db.run("CREATE TABLE IF NOT EXISTS estates([name] TEXT, [location] TEXT, [availability] TEXT, [ownerID] INTEGER NOT NULL, [estateID] INTEGER PRIMARY KEY NOT NULL)")
db.run("CREATE TABLE IF NOT EXISTS users([firstname] TEXT, [lastname] TEXT, [email] TEXT, [hashedPassword] TEXT, [userID] INTEGER PRIMARY KEY NOT NULL)")

//PROPOSED DATABASE STRUCTURE:
//  Table "estates" - stores all picking locations
//      -Columns: Location, primary key, owner email, availability dates, manfiest of available goods

// Table "Pickups"
//      -Columns: Pickup email, estate primary key, date/time window, primary key, manifest of goods picked up

//Table "Dropoffs"
//      -Columns: Dropoff email, pickup email, pickup primary key, dropoff location, manifest of goods dropped off

app.post('/updateEstate', requireAuth, jsonParser, (req, res) => {
    db.run(`UPDATE estates SET name=$name, location=$location, availability=$availability WHERE ownerID=$userID AND estateID=$estateID`, {
        $name: req.body.name,
        $location: req.body.location,
        $availability: req.body.availability,
        $userID: req.session.userID,
        $estateID: req.body.estateID
    })
    res.json({message: "success"})
})

app.post('/deleteEstate', requireAuth, jsonParser, (req, res) => {
    db.run(`DELETE FROM estates WHERE estateID = $estateID AND ownerID=$userID`, {
        $userID: req.session.userID,
        $estateID: req.body.estateID
    })
    res.json({message: "success"})
})

app.get('/checkLogin', requireAuth, (req, res) => {
    db.get(`SELECT * FROM users WHERE userID = $userID`, {$userID: req.session.userID}, (err, row) => {
        if (row === undefined) {
            console.log(req.session.userID, row)
            res.json({message: "success", loggedIn: false})
        } else {
            res.json({message: "success", loggedIn: true, name: row.firstname})
        }
    })
})

app.post('/register', (req, res) => {

    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let email = req.body.email
    let password = req.body.password

    db.get(`SELECT * FROM users WHERE email = $email`, {$email: email.toString()}, (err, row) => {
        console.log(row)
        console.log(req.body.email.toString())
        if (row===undefined) {
            res.json({ message: "success"});
            console.log("registration success")
            db.run(`INSERT INTO users (firstname, lastname, email, hashedPassword) VALUES (?, ?, ?, ?)`, [firstname, lastname, email, password])
        } else {
            res.json({message: "failure"})
            console.log("registration failure")
        }
    })

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
            req.session.userID = row.userID;
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

app.get("/getEstates", requireAuth, jsonParser, (req, res) => {
    let rows = []
    db.all("SELECT * FROM estates WHERE ownerID = $userID", {$userID: req.session.userID},
        (error, row) => {
            row.forEach((r) => {
                rows.push(r)
            })
            res.json({"message": "success", "rows": rows})
        }
    );
})
// db.run(`INSERT INTO users (firstname, lastname, email, hashedPassword) VALUES (?, ?, ?, ?)`
app.post("/addEstate", requireAuth, jsonParser, (req, res) => {
    db.get(`INSERT INTO estates (name, location, availability, ownerID) VALUES ($n, $l, $a, $o)`, {$n: req.body.name, $l: req.body.location, $a: req.body.availability, $o: req.session.userID }, (err, row) => {
    })
    res.json({message: "success"})
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});