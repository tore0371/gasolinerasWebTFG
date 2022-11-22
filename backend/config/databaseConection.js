import Sequelize from 'sequelize'


const sequelize = new Sequelize('gasolineras', 'sa', 'yourStrong(!)Password', {
    dialect: 'mssql',
    host: '172.17.0.3',
    dialectOptions: {
        options: { "requestTimeout": 600000 }
      },
});


export default sequelize
