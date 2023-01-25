import Sequelize from 'sequelize'


const sequelize = new Sequelize('gasolineras', 'sa', 'yourStrong(!)Password', {
    dialect: 'mssql',
    host: 'localhost',
    dialectOptions: {
        options: { "requestTimeout": 600000 }
      },
});


export default sequelize
