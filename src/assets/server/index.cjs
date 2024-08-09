const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();


app.get("/contactAPI", (req, res) => {
    res.json({ message: "success", query: req.query, body: req.body });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});