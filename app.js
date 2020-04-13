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

app.get('/populate', async (_, res) => {
    const movies = await getData();
    const list = await models.Movie.findAll();
    for (const movie of movies) {
        if (list.find((elem) => elem.Title === movie.Title))
            continue;
        await models.Movie.create(movie);
    }
    res.send('ok');
});

async function addMovie(title) {
    const newMovie = await axios.get('https://www.omdbapi.com/',
        {
            params: {
                'apikey': "686069f7",
                't': title
            }
        });
    await models.Movie.create(newMovie.data);
}

app.get("/*", async (req, res) => {
    const page = req.path.split('/')[1] !== '' ? parseInt(req.path.split('/')[1]) : 1;
    if (req.query.movieTitle && typeof req.query.movieTitle === "string") {
        const searchMovie = await models.Movie.findOne({where: {Title: req.query.movieTitle}});
        if (!searchMovie) {
            await addMovie(req.query.movieTitle)
        }
    }
    if (req.query.movieToDelete && typeof req.query.movieToDelete === "string") {
        const searchMovie = await models.Movie.findOne({where: {Title: req.query.movieToDelete}});
        if (searchMovie) {
            await searchMovie.destroy()
        }
    }
    const movieByPage = 8;
    const totalMovie = await models.Movie.count();
    const {_, rows} = await models.Movie.findAndCountAll({offset: (page - 1) * movieByPage, limit: movieByPage});
    res.render("index", {movies: rows, pageNumber: Math.ceil(totalMovie / movieByPage), currentPage: page});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
