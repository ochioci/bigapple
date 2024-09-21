function initEstatesAPI(app, db, requireAuth, requireEstate, jsonParser) {
    app.post('/api/updateEstate', requireEstate, jsonParser, (req, res) => {
        db.run(`UPDATE estates SET name=$name, location=$location, availability=$availability WHERE ownerID=$userID AND estateID=$estateID`, {
            $name: req.body.name,
            $location: req.body.location,
            $availability: req.body.availability,
            $userID: req.session.userID,
            $estateID: req.body.estateID
        })
        res.json({message: "success"})
    })

    app.post('/api/deleteEstate', requireEstate, jsonParser, (req, res) => {
        db.run(`DELETE FROM estates WHERE estateID = $estateID AND ownerID=$userID`, {
            $userID: req.session.userID,
            $estateID: req.body.estateID
        })

        db.run(`DELETE FROM estateWindows WHERE estateID = $estateID`, {$estateID: req.body.estateID})
        db.run(`DELETE FROM appointments WHERE estateID = $estateID`, {$estateID: req.body.estateID})
        res.json({message: "success"})
    })


    app.get("/api/getEstates", requireEstate, jsonParser, (req, res) => {
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
    app.post("/api/addEstate", requireEstate, jsonParser, (req, res) => {
        // console.log(req.body)
        db.get(`INSERT INTO estates (name, location, approxLocation, availability, treeDetails, ownerID) VALUES ($n, $l, $al, $a, $t, $o)`, {$t: req.body.treeDetails, $n: req.body.name, $l: req.body.location.join(", "), $al: req.body.location.slice(1, 3).join(", "), $a: req.body.availability, $o: req.session.userID }, (err, row) => {
            // console.log(err, row)
        })
        res.json({message: "success"})
    })

    app.get("/api/selectEstates", requireAuth, jsonParser, (req, res) => {
        let rows = []
        db.all("SELECT * FROM estates", (err, row) => {
            row.forEach((r) => {
                rows.push(r)
            })
            res.json({"message": "success", "rows": rows})
        })
    })


    // todo: BELOW HAVE NOT BEEN ADDED TO VERCEL PROXY!!!!!
    app.post("/api/getEstateAvailability", requireAuth, jsonParser, (req, res) => {
        let rows = []
        db.all("SELECT * FROM estateWindows WHERE estateID = $estateID", {$estateID: req.body.estateID},
            (err, row) => {
            row.forEach((r) => {
                rows.push(r)
            })
            res.json({"message": "success", "rows": rows})
        })
    })
    app.post("/api/addEstateAvailability", requireAuth, jsonParser, (req, res) => {
        let dates = req.body.dates;
        for (let i = 0; i < dates.length; i++) {
            db.get("INSERT INTO estateWindows (timeStart, timeEnd, date, estateID) VALUES ($st, $et, $d, $id)",
                {$st: req.body.startTime, $et: req.body.endTime, $d: dates[i], $id: req.body.estateID},
                (err, row) => {})
        }
        res.json({message: "success"})
    })

    app.post("/api/updateEstateAvailability", requireAuth, jsonParser, (req, res) => {
        db.get("UPDATE estateWindows SET timeStart=$st, timeEnd=$et WHERE windowID=$id", {
            $st: req.body.startTime,
            $et: req.body.endTime,
            $id: req.body.windowID,
        })
        res.json({message: "success"})
    })

    app.post("/api/deleteEstateAvailability", requireAuth, jsonParser, (req, res) => {
        db.get("DELETE FROM estateWindows WHERE windowID = $id", {$id: req.body.windowID})
        db.run(`DELETE FROM appointments WHERE windowID = $id`, {$id: req.body.windowID})
        res.json({message: "success"})
    })

    app.post("/api/getBookingRequests", requireEstate, jsonParser, (req, res) => {
        db.all(`SELECT estateID FROM estates WHERE ownerID = $id`, {$id: req.session.userID}, (err, rows) => {
            let r = []
            let reqs = []
            let ct = 0;
            rows.forEach((rr) => {
                r.push(rr.estateID)
                db.all(`SELECT * FROM appointments WHERE estateID = $id`, {$id: rr.estateID}, (err, rows2) => {
                    // console.log(ct, rows.length)
                    rows2.forEach((rr2) => {
                        reqs.push(rr2)
                    })
                    ct += 1;
                    if (ct >= rows.length) {
                        // console.log(reqs)
                        res.json({"message": "success", "rows": reqs})
                    }
                })
            })
            // console.log(r)
            // res.json({message: "success"})

        })
    })

    app.post("/api/getWindow", requireEstate, jsonParser, (req, res) => {
        db.all(`SELECT * FROM estateWindows WHERE windowID = $id`, {$id: req.body.windowID}, (err, rows) => {
            res.json({"message": "success", rows})
        })
    })

}


module.exports = {initEstatesAPI}