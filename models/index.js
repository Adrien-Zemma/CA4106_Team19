const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: "mysql",
        dialectOptions: {
            socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
        }
    }
);
sequelize.authenticate()
    .then(() => {
        console.log("Connected to database successfully");
    })
    .catch((err) => {
        console.log("Failed to connect to database:");
        console.error(err);
    });

const indexFile = path.basename(__filename);
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== indexFile) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
