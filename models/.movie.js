module.exports =
    (sequelize, Sequelize) => {
        const Movie = sequelize.define('Movie', {
            "Title": {
                type: Sequelize.STRING,
                allowNull: false,
            },
            "Year": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "Rated": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "Released": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "Runtime": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "Genre": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "Director": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "Writer": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "Actors": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "Plot": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "Language": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "Country": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "Awards": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "Poster": {
                type: Sequelize.STRING,
                allowNull: false,
            },
            "Ratings": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "Metascore": {
                type: Sequelize.STRING,
                allowNull: true,
            },
            "imdbID": {
                type: Sequelize.STRING,
                allowNull: true,
            },
        });
        return Movie
    }
