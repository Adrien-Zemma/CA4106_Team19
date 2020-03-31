const express = require("express");

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("index");
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
