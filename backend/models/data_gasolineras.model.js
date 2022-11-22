import Sequelize from 'sequelize'

import db from '../config/databaseConection.js'
import gasolineras from './gasolineras.model.js'

const data_gasolineras = db.define("DATA_GASOLINERAS", {
    ID_DATA:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    FECHA:{
        type: Sequelize.DATE
    },
    PRECIO_BIODIESEL:{
        type: Sequelize.FLOAT
    },
    PRECIO_BIOETANOL:{
        type: Sequelize.FLOAT
    },
    PRECIO_GAS_NATURAL_COMPRIMIDO:{
        type: Sequelize.FLOAT
    },
    PRECIO_GAS_NATURAL_LICUADO:{
        type: Sequelize.FLOAT
    },
    PRECIO_GASES_LICUADOS_DEL_PETROLEO:{
        type: Sequelize.FLOAT
    },
    PRECIO_GASOLEO_A:{
        type: Sequelize.FLOAT
    },
    PRECIO_GASOLEO_B:{
        type: Sequelize.FLOAT
    },
    PRECIO_GASOLEO_PREMIUM:{
        type: Sequelize.FLOAT
    },
    PRECIO_GASOLINA_95_E10:{
        type: Sequelize.FLOAT
    },
    PRECIO_GASOLINA_95_E5:{
        type: Sequelize.FLOAT
    },
    PRECIO_GASOLINA_95_E5_PREMIUM:{
        type: Sequelize.FLOAT
    },
    PRECIO_GASOLINA_98_E10:{
        type: Sequelize.FLOAT
    },
    PRECIO_GASOLINA_98_E5:{
        type: Sequelize.FLOAT
    },
    PRECIO_HIDROGENO:{
        type: Sequelize.FLOAT
    },
    REMISION:{
        type: Sequelize.STRING
    },
    PORCENTAJE_BIOETANOL:{
        type: Sequelize.FLOAT
    },
    PORCENTAJE_ESTER_METILICO:{
        type: Sequelize.FLOAT
    },
    IDEESS:{
        type: Sequelize.INTEGER
    },
    IDCCAA:{
        type: Sequelize.STRING
    }
},{
    freezeTableName: true,
    timestamps:false
});

data_gasolineras.hasMany(gasolineras, {foreignKey: 'ID_GASOLINERA'})


export default data_gasolineras