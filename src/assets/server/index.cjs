const express = require("express");
const bodyParser = require('body-parser')


const PORT = process.env.PORT || 3001;
var jsonParser = bodyParser.json()
const app = express();
app.use(jsonParser);


app.post("/contactAPI", jsonParser, (req, res) => {
    console.log(req.body, Object.keys(req.body));
    res.json({ message: "success", body: req.body });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});