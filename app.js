const express = require("express");
const axios = require("axios");

const models = require("./models");

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/assets', express.static(__dirname + '/assets'));

async function getData() {
    const movie_list = ["tron", "The Avengers", "Parasite", "1917", "Captain Marvel", "Citizen Kane", "All About Eve",
        "SINGIN' IN THE RAIN", "THE MALTESE FALCON", "REAR WINDOW", "THE GRAPES OF WRATH"];
    let promises = [];
    for (const movie of movie_list) {
        promises.push(axios.get('https://www.omdbapi.com/',
            {
                params: {
                    'apikey': "686069f7",
                    't': movie
                }
            }))
    }
    return (await Promise.all(promises)).map(res => res.data);
}

app.get("/", async (req, res) => {
    const movies = await getData();
    res.render("index", {movies: movies});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
