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
        WHERE DATA_GASOLINERAS.FECHA >= '" + todayDate + "' AND DATA_GASOLINERAS.FECHA <'" + tomorrowDate + "'"
    );
    return gasolinerasData
}

const getMeanProvinceValues = async function (provincia) {
    //results = [[procincia, latitud, longitud, gasoleoA, gasoleoPremium, gasoleoB, gasolina95, gasolina98 ]]
    var gasolinerasData = await sequelize.query(
        "select AVG(dat.PRECIO_GASOLEO_A) as gasoleoA, AVG(dat.PRECIO_GASOLEO_PREMIUM) as gasoleoPremium, AVG(dat.PRECIO_GASOLEO_B) as gasoleoB, AVG(dat.PRECIO_GASOLINA_95_E5) as gasolina95_E5, AVG(dat.PRECIO_GASOLINA_98_E5) as gasolina98_E5\
            from GASOLINERAS gas, DATA_GASOLINERAS dat \
            where gas.PROVINCIA = '" + provincia[0] + "' and gas.ID_GASOLINERA = dat.ID_GASOLINERA"
    );
    var gasoleoA = gasolinerasData[0][0]["gasoleoA"] != null ? gasolinerasData[0][0]["gasoleoA"] : 0
    var gasoleoPremium = gasolinerasData[0][0]["gasoleoPremium"] != null ? gasolinerasData[0][0]["gasoleoPremium"] : 0
    var gasoleoB = gasolinerasData[0][0]["gasoleoB"] != null ? gasolinerasData[0][0]["gasoleoB"] : 0
    var gasolina95 = gasolinerasData[0][0]["gasolina95_E5"] != null ? gasolinerasData[0][0]["gasolina95_E5"] : 0
    var gasolina98 = gasolinerasData[0][0]["gasolina98_E5"] != null ? gasolinerasData[0][0]["gasolina98_E5"] : 0

    return([provincia[0], provincia[1], provincia[2], gasoleoA, gasoleoPremium, gasoleoB, gasolina95, gasolina98])
}


const getTodayDataTableDDBB = async function (todayDate, tomorrowDate){
    console.log("hola")
    var gasolinerasData = await sequelize.query(
        "select gas.PROVINCIA as provincia, gas.MUNICIPIO as municipio, gas.LOCALIDAD as localidad, gas.DIRECCION as direccion, gas.CP as cp, gas.ROTULO as rotulo, dat.PRECIO_GASOLEO_A as gasoleoA, dat.PRECIO_GASOLEO_B as gasoleoB, dat.PRECIO_GASOLEO_PREMIUM as gasoleoPremium, dat.PRECIO_GASOLINA_95_E5 as gasolina95e5, dat.PRECIO_GASOLINA_98_E5 as gasolina98e5\
        from GASOLINERAS gas, DATA_GASOLINERAS dat\
        WHERE dat.FECHA >= '" + todayDate + "' AND dat.FECHA <'" + tomorrowDate + "' and gas.ID_GASOLINERA = dat.ID_GASOLINERA"
    );
    return gasolinerasData[0]
} 


const getTodayMinGasoilATodayPrice = async function(todayDate, tomorrowDate){
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 MIN(dat.PRECIO_GASOLEO_A) AS gasoleoA,\
                 dat.PRECIO_GASOLEO_B AS gasoleoB,\
                 dat.PRECIO_GASOLEO_PREMIUM AS gasoleoPremium,\
                 dat.PRECIO_GASOLINA_95_E5 AS gasolina95e5,\
                 dat.PRECIO_GASOLINA_98_E5 AS gasolina98e5,\
                 dat.FECHA as fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE FECHA >= '20230217' AND FECHA < '20230218' AND dat.PRECIO_GASOLEO_A IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_95_E5, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasoleoA ASC"
    )
    return data[0]
    


}


export {
    getAllGasolineras,
    getTodayData,
    getMeanProvinceValues,
    getTodayDataTableDDBB,
    getTodayMinGasoilATodayPrice

}