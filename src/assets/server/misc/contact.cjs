function initContactAPI(app, db, requireAuth, jsonParser){
    app.post("/contactAPI", requireAuth, jsonParser, (req, res) => {
        res.json({message: "success"});
        let m = req.body.message
        let e = req.session.email
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
}
module.exports = {initContactAPI};