function initTransferAPI (app, db, requireAuth, requireTransfer, jsonParser) {
    app.post('/updateTransfer', requireTransfer, jsonParser, (req, res) => {
        db.run(`UPDATE transfers SET window=$window, estateID=$estateID, dropoffID=$dropoffID WHERE transferID = $transferID AND userID=$userID`, {
            $window: req.body.window,
            $estateID: req.body.estateID,
            $dropoffID: req.body.dropoffID,
            $userID: req.session.userID,
            $transferID: req.body.transferID
        })
        res.json({message: "success"})
    })

    app.post('/deleteTransfer', requireTransfer, jsonParser, (req, res) => {
        db.run(`DELETE FROM transfers WHERE transferID = $transferID AND userID=$userID`, {
            $userID: req.session.userID,
            $transferID: req.body.transferID
        })
        res.json({message: "success"})
    })


    app.get("/getTransfers", requireTransfer, jsonParser, (req, res) => {
        let rows = []
        db.all("SELECT * FROM transfers WHERE userID = $userID", {$userID: req.session.userID},
            (error, row) => {
                row.forEach((r) => {
                    rows.push(r)
                })
                res.json({"message": "success", "rows": rows})
            }
        );
    })
// db.run(`INSERT INTO users (firstname, lastname, email, hashedPassword) VALUES (?, ?, ?, ?)`
    app.post("/addTransfer", requireTransfer, jsonParser, (req, res) => {
        // console.log(req.body)
        db.get(`INSERT INTO transfers (window, estateID, dropoffID, userID, isConfirmed) VALUES ($n, $l, $a, $o, 0)`, {$n: req.body.window, $l: req.body.estateID, $a: req.body.dropoffID, $o: req.session.userID }, (err, row) => {
        })
        res.json({message: "success"})
    })

    app.post("/confirmTransfer", requireTransfer, jsonParser, (req, res) => {
        db.get(`UPDATE transfers SET isConfirmed=1 WHERE userID = $userID AND transferID = $transferID`, {
            $userID: req.session.userID,
            $transferID: req.body.transferID
        })
        res.json({message: "success"})
    })
}
// [window] TEXT, [estateID] INTEGER NOT NULL, [dropoffID] INTEGER NOT NULL, [userID] INTEGER NOT NULL, [transferID] INTEGER PRIMARY KEY NOT NULL)")
module.exports = {initTransferAPI}