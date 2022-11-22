import Sequelize from 'sequelize'

import db from '../config/databaseConection.js'

const gasolineras = db.define("GASOLINERAS", {
    ID_GASOLINERA:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    CP:{
        type: Sequelize.INTEGER,
    },
    DIRECCION:{
        type: Sequelize.STRING,
    },
    HORARIO:{
        type: Sequelize.STRING,
    },
    LATITUD:{
        type: Sequelize.FLOAT,
    },
    LOCALIDAD:{
        type: Sequelize.STRING,
    },
    LONGITUD:{
        type: Sequelize.FLOAT,
    },
    MARGEN:{
        type: Sequelize.STRING,
    },
    MUNICIPIO:{
        type: Sequelize.STRING,
    },
    ID_MUNICIPIO:{
        type: Sequelize.INTEGER,
    },
    ID_PROVINCIA:{
        type: Sequelize.INTEGER,
    },
    PROVINCIA:{
        type: Sequelize.STRING,
    },
    ROTULO:{
        type: Sequelize.STRING,
    },
    TIPO_VENTA:{
        type: Sequelize.STRING,
    }
},{
    freezeTableName: true,
    timestamps:false
});

export default gasolineras