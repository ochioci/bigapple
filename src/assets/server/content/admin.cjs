function initAdminAPI(app, db, requireAuth, requireAdmin, jsonParser) {
    app.post("/api/getAllEstates", requireAdmin, jsonParser, (req, res) => {
        // console.log(req.body)
        db.all("SELECT * FROM estates", (err, rows) => {
            if (err != null) {
                res.json({"message": "failure"})
            } else {
                res.json({"message": "success", rows: rows})
            }
        })
    })

    app.post("/api/getAllUsers", requireAdmin, jsonParser, (req, res) => {
        db.all("SELECT firstname, lastname, phoneNumber, email, userID FROM users", (err, rows) => {
            if (err != null) {
                res.json({"message": "failure"})
            } else {
                res.json({"message": "success", rows: rows})
            }
        })
    })

    app.post("/api/getAllAppointments", requireAdmin, jsonParser, (req, res) => {
        db.all("SELECT * from appointments", (err, rows) => {
            if (err != null) {
                res.json({"message": "failure"})
            } else {
                db.all("SELECT * FROM estateWindows", (err2, rows2) => {
                    if (err2 != null) {
                        res.json({"message": "failure"})
                    } else {
                        res.json({"message": "success", apts: rows, windows: rows2})
                    }
                })
            }
        })
    })
}



module.exports = {initAdminAPI}