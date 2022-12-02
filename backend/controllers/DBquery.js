import data_gasolieras from '../models/data_gasolineras.model.js'
import gasolineras from '../models/gasolineras.model.js'


const getAllGasolineras = async function(){
    console.log("db")
    var gasolinerasData = await gasolineras.findAll({

    })
    return gasolinerasData
}


export{
    getAllGasolineras
}