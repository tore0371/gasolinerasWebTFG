import sequelize from '../config/databaseConection.js'
import data_gasolieras from '../models/data_gasolineras.model.js'
import gasolineras from '../models/gasolineras.model.js'


const getAllGasolineras = async function () {
    console.log("db")
    var gasolinerasData = await gasolineras.findAll({

    })
    return gasolinerasData
}

const getTodayData = async function (todayDate, tomorrowDate) {
    var gasolinerasData = await sequelize.query(
        "SELECT GASOLINERAS.ID_GASOLINERA,GASOLINERAS.LATITUD, GASOLINERAS.LONGITUD, DATA_GASOLINERAS.FECHA, DATA_GASOLINERAS.PRECIO_GASOLEO_B \
        FROM GASOLINERAS \
        INNER JOIN DATA_GASOLINERAS ON GASOLINERAS.ID_GASOLINERA = DATA_GASOLINERAS.ID_GASOLINERA \
        WHERE DATA_GASOLINERAS.FECHA >= '" +todayDate+"' AND DATA_GASOLINERAS.FECHA <'"+tomorrowDate+"'"
    );
    return gasolinerasData
}








// EJEMPLO DE COMO  HACER LA QUERY A MANO 


// const getAllGasolineras = async function(){
//     console.log("db")
//     var gasolinerasData = await sequelize.query(
//         "SELECT * FROM GASOLINERAS"
//     );
//     return gasolinerasData
// }


export {
    getAllGasolineras,
    getTodayData
}