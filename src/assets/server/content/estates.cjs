function initEstatesAPI(app, db, requireAuth, requireEstate, jsonParser) {
    app.post('/updateEstate', requireEstate, jsonParser, (req, res) => {
        db.run(`UPDATE estates SET name=$name, location=$location, availability=$availability WHERE ownerID=$userID AND estateID=$estateID`, {
            $name: req.body.name,
            $location: req.body.location,
            $availability: req.body.availability,
            $userID: req.session.userID,
            $estateID: req.body.estateID
        })
        res.json({message: "success"})
    })

    app.post('/deleteEstate', requireEstate, jsonParser, (req, res) => {
        db.run(`DELETE FROM estates WHERE estateID = $estateID AND ownerID=$userID`, {
            $userID: req.session.userID,
            $estateID: req.body.estateID
        })
        res.json({message: "success"})
    })


    app.get("/getEstates", requireEstate, jsonParser, (req, res) => {
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
    app.post("/addEstate", requireEstate, jsonParser, (req, res) => {
        // console.log(req.body)
        db.get(`INSERT INTO estates (name, location, availability, ownerID) VALUES ($n, $l, $a, $o)`, {$n: req.body.name, $l: req.body.location, $a: req.body.availability, $o: req.session.userID }, (err, row) => {
        })
        res.json({message: "success"})
    })
}

module.exports = {initEstatesAPI}