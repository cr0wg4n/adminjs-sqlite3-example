import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const queryInterface = sequelize.getQueryInterface();
    await queryInterface.addColumn('Users','name',{
        type: DataTypes.STRING,
        allowNull: true
    })
};
