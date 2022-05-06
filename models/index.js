import { DataTypes } from 'sequelize';


export default (sequelize) => ({
    User: sequelize.define('User', {
        username: DataTypes.STRING,
        birthday: DataTypes.DATE,
    }),
    Post: sequelize.define('Post', {
        name: DataTypes.STRING,
        details: DataTypes.STRING
    })
});