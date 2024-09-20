function initTransferAPI (app, db, requireAuth, requireTransfer, jsonParser) {
    app.post('/api/updateTransfer', requireTransfer, jsonParser, (req, res) => {
        db.run(`UPDATE transfers SET window=$window, dropoffWindow=$dropoffWindow, estateID=$estateID, dropoffID=$dropoffID WHERE transferID = $transferID AND userID=$userID`, {
            $window: req.body.window,
            $estateID: req.body.estateID,
            $dropoffID: req.body.dropoffID,
            $userID: req.session.userID,
            $transferID: req.body.transferID,
            $dropoffWindow: req.body.dropoffWindow
        })
        res.json({message: "success"})
    })

    app.post('/api/deleteTransfer', requireTransfer, jsonParser, (req, res) => {
        db.run(`DELETE FROM transfers WHERE transferID = $transferID AND userID=$userID`, {
            $userID: req.session.userID,
            $transferID: req.body.transferID
        })
        res.json({message: "success"})
    })


    app.get("/api/getTransfers", requireTransfer, jsonParser, (req, res) => {
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
    app.post("/api/addTransfer", requireTransfer, jsonParser, (req, res) => {
        // console.log(req.body)
        db.get(`INSERT INTO transfers (window, estateID, dropoffID, userID, isConfirmed, dropoffWindow) VALUES ($n, $l, $a, $o, 0, -1)`, {$n: req.body.window, $l: req.body.estateID, $a: req.body.dropoffID, $o: req.session.userID }, (err, row) => {
        })
        res.json({message: "success"})
    })

    app.post("/api/confirmTransfer", requireTransfer, jsonParser, (req, res) => {
        db.get(`UPDATE transfers SET isConfirmed=1 WHERE userID = $userID AND transferID = $transferID`, {
            $userID: req.session.userID,
            $transferID: req.body.transferID
        })
        res.json({message: "success"})
    })



    //There is probably an atrocious race condition in here. It is an affront to asynchronous programming that this code works.
    app.post("/api/getAllAvailability", requireTransfer, jsonParser, (req, res) => {
        // db.serialize(() => {
        // })
        db.all(`SELECT * FROM estateWindows`, (err, rows) => {
            if (err != null) {
                // console.log(err, rows)
                res.json({"message": "failure"})
                return;
            }
            let r = []
            let e = {}
            let l = rows.length;
            let ct = 0;
            // console.log(rows.length)
            rows.forEach((rr) => {


                if (!(rr.estateID+"" in e)) {
                    db.all(`SELECT estateID, approxLocation, treeDetails FROM estates WHERE estateID = $estateID `, {$estateID: rr.estateID}, (err, row) => {
                        // console.log(ct, rows.length)
                        // console.log(e, rr.estateID, row)
                        r.push(rr)
                        if (row != null) {
                            e[rr.estateID+""] = row
                        }
                        if (ct >= ( rows.length-1)) {
                            res.json({"message": "success", "estates": e, "pickups": r})
                        }
                        ct += 1;
                    })
                }

            })

        })
    })

    app.post("/api/bookAppointment", requireTransfer, jsonParser, (req, res) => {
        // console.log(req)
        db.run(`INSERT INTO appointments (windowID, userID, estateID) VALUES ($windowID, $userID, $estateID)`, {
            $userID: req.session.userID,
            $estateID: req.body.estateID,
            $windowID: req.body.windowID
        })
        db.run(`UPDATE estateWindows SET bookedBy = bookedBy+1 WHERE windowID = $windowID`, {$windowID: req.body.windowID})
        res.json({"message": "success"})
    })
}
// [window] TEXT, [estateID] INTEGER NOT NULL, [dropoffID] INTEGER NOT NULL, [userID] INTEGER NOT NULL, [transferID] INTEGER PRIMARY KEY NOT NULL)")
module.exports = {initTransferAPI}