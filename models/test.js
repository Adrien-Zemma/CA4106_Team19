module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define("Test", {
        foo: DataTypes.INTEGER,
        bar: DataTypes.STRING,
    });

    return Test;
};
