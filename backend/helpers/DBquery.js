import sequelize from '../config/databaseConection.js'
import data_gasolieras from '../models/data_gasolineras.model.js'
import gasolineras from '../models/gasolineras.model.js'


const getAllGasolineras = async function(){
    console.log("db")
    var gasolinerasData = await gasolineras.findAll({

    })
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


export{
    getAllGasolineras
}