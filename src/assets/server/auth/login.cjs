function initLoginAPI(app, db, requireAuth, jsonParser) {
    app.get('/checkLogin', requireAuth, (req, res) => {
        db.get(`SELECT * FROM users WHERE userID = $userID`, {$userID: req.session.userID}, (err, row) => {
            if (row === undefined) {
                console.log(req.session.userID, row)
                res.json({message: "success", loggedIn: false})
            } else {
                res.json({message: "success", loggedIn: true, name: row.firstname, role: row.role})
            }
        })
    })

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
                req.session.role = row.role;
                req.session.email = row.email;
                // console.log("Session id: " + row.email)
                res.json({message: "success", loginName: row.firstname})
            }
            // console.log(e, p)
        })
    })

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
}
module.exports = { initLoginAPI }
