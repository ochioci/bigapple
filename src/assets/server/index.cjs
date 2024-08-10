const express = require("express");
const bodyParser = require('body-parser')


const PORT = process.env.PORT || 3001;
var jsonParser = bodyParser.json()
const app = express();
const sqlite3 = require("sqlite3");
app.use(jsonParser);

const db = new sqlite3.Database('./app.db');
db.run("CREATE TABLE IF NOT EXISTS messages([message] TEXT, [email] TEXT)")

app.post("/contactAPI", jsonParser, (req, res) => {
    console.log(req.body, Object.keys(req.body));
    res.json({ message: "success"});
    let m = req.body.message
    let e = req.body.email
    db.run(`INSERT INTO messages (message, email) VALUES (?, ?)`, [m, e])
});

app.get("/getMessages", jsonParser, (req, res) => {
    // console.log(req.body, Object.keys(req.body));

    // console.log("!!!")
    let rows = []
    db.all("SELECT * FROM messages",
        (error, row) => {
            // console.log(row);
            // rows.push(row);
            row.forEach((r) => {
                // console.log(r);
                rows.push(r)
            })
            res.json({"messsage": "success", "rows": rows})
        }
    );
    // console.log(rows)

})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});