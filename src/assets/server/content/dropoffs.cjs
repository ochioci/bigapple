function initDropoffsAPI(app, db, requireAuth, requireDropoff, jsonParser) {
    app.post('/updateDropoff', requireDropoff, jsonParser, (req, res) => {
        db.run(`UPDATE dropoffs SET name=$name, location=$location, availability=$availability WHERE ownerID=$userID AND dropoffID=$dropoffID`, {
            $name: req.body.name,
            $location: req.body.location,
            $availability: req.body.availability,
            $userID: req.session.userID,
            $dropoffID: req.body.dropoffID
        })
        res.json({message: "success"})
    })

    app.post('/deleteDropoff', requireDropoff, jsonParser, (req, res) => {
        db.run(`DELETE FROM dropoffs WHERE dropoffID = $dropoffID AND ownerID=$userID`, {
            $userID: req.session.userID,
            $dropoffID: req.body.dropoffID
        })
        res.json({message: "success"})
    })


    app.get("/getDropoffs", requireDropoff, jsonParser, (req, res) => {
        let rows = []
        db.all("SELECT * FROM dropoffs WHERE ownerID = $userID", {$userID: req.session.userID},
            (error, row) => {
                row.forEach((r) => {
                    rows.push(r)
                })
                res.json({"message": "success", "rows": rows})
            }
        );
    })
// db.run(`INSERT INTO users (firstname, lastname, email, hashedPassword) VALUES (?, ?, ?, ?)`
    app.post("/addDropoff", requireDropoff, jsonParser, (req, res) => {
        // console.log(req.body)
        db.get(`INSERT INTO dropoffs (name, location, availability, ownerID) VALUES ($n, $l, $a, $o)`, {$n: req.body.name, $l: req.body.location, $a: req.body.availability, $o: req.session.userID }, (err, row) => {
        })
        res.json({message: "success"})
    })
}

module.exports = {initDropoffsAPI}