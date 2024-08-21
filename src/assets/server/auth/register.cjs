function initRegisterAPI(app, db, requireAuth, jsonParser) {
    app.post('/api/register', (req, res) => {

        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let email = req.body.email
        let password = req.body.password
        let role = req.body.userRole

        db.get(`SELECT * FROM users WHERE email = $email`, {$email: email.toString()}, (err, row) => {
            console.log(row)
            console.log(req.body.email.toString())
            if (row===undefined) {
                res.json({ message: "success"});
                console.log("registration success")
                db.run(`INSERT INTO users (firstname, lastname, email, hashedPassword, role) VALUES (?, ?, ?, ?, ?)`, [firstname, lastname, email, password, role])
            } else {
                res.json({message: "failure"})
                console.log("registration failure")
            }
        })

        // console.log(req.body);
    });
}

module.exports={initRegisterAPI}