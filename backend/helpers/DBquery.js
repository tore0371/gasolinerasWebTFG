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

    return ([provincia[0], provincia[1], provincia[2], gasoleoA, gasoleoPremium, gasoleoB, gasolina95, gasolina98])
}


const getTodayDataTableDDBB = async function (todayDate, tomorrowDate) {
    console.log("hola")
    var gasolinerasData = await sequelize.query(
        "select gas.PROVINCIA as provincia, gas.MUNICIPIO as municipio, gas.LOCALIDAD as localidad, gas.DIRECCION as direccion, gas.CP as cp, gas.ROTULO as rotulo, dat.PRECIO_GASOLEO_A as gasoleoA, dat.PRECIO_GASOLEO_B as gasoleoB, dat.PRECIO_GASOLEO_PREMIUM as gasoleoPremium, dat.PRECIO_GASOLINA_95_E5 as gasolina95e5, dat.PRECIO_GASOLINA_98_E5 as gasolina98e5\
        from GASOLINERAS gas, DATA_GASOLINERAS dat\
        WHERE dat.FECHA >= '" + todayDate + "' AND dat.FECHA <'" + tomorrowDate + "' and gas.ID_GASOLINERA = dat.ID_GASOLINERA"
    );
    return gasolinerasData[0]
}


const getTodayMinGasoilATodayPrice = async function (todayDate, tomorrowDate) {
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
          WHERE FECHA >= '" + todayDate + "' AND FECHA < '" + tomorrowDate + "' AND dat.PRECIO_GASOLEO_A IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_95_E5, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasoleoA ASC"
    )
    return data[0]
}

const getTodayMaxGasoilATodayPrice = async function (todayDate, tomorrowDate) {
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
          WHERE FECHA >= '" + todayDate + "' AND FECHA < '" + tomorrowDate + "' AND dat.PRECIO_GASOLEO_A IS NOT NULL\
          GROUP BY gas. PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_95_E5, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasoleoA DESC"
    )
    return data[0]
}


const getMinGasoilAPrice = async function () {
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
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE dat.PRECIO_GASOLEO_A IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_95_E5, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasoleoA ASC"
    )
    return data[0]
}

const getMaxGasoilAPrice = async function () {
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
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE dat.PRECIO_GASOLEO_A IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_95_E5, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasoleoA DESC"
    )
    return data[0]
}


const getTodayMinGasoilBTodayPrice = async function (todayDate, tomorrowDate) {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 MIN(dat.PRECIO_GASOLEO_B) AS gasoleoB,\
                 dat.PRECIO_GASOLEO_PREMIUM AS gasoleoPremium,\
                 dat.PRECIO_GASOLINA_95_E5 AS gasolina95e5,\
                 dat.PRECIO_GASOLINA_98_E5 AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE FECHA >= '" + todayDate + "' AND FECHA < '" + tomorrowDate + "' AND dat.PRECIO_GASOLEO_B IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_95_E5, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasoleoB ASC"
    )
    return data[0]
}

const getMinGasoilBPrice = async function () {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 MIN(dat.PRECIO_GASOLEO_B) AS gasoleoB,\
                 dat.PRECIO_GASOLEO_PREMIUM AS gasoleoPremium,\
                 dat.PRECIO_GASOLINA_95_E5 AS gasolina95e5,\
                 dat.PRECIO_GASOLINA_98_E5 AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE dat.PRECIO_GASOLEO_B IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_95_E5, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasoleoB ASC"
    )
    return data[0]
}

const getTodayMaxGasoilBTodayPrice = async function (todayDate, tomorrowDate) {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 MIN(dat.PRECIO_GASOLEO_B) AS gasoleoB,\
                 dat.PRECIO_GASOLEO_PREMIUM AS gasoleoPremium,\
                 dat.PRECIO_GASOLINA_95_E5 AS gasolina95e5,\
                 dat.PRECIO_GASOLINA_98_E5 AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE FECHA >= '" + todayDate + "' AND FECHA < '" + tomorrowDate + "' AND dat.PRECIO_GASOLEO_B IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_95_E5, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasoleoB desc"
    )
    return data[0]
}


const getMaxGasoilBPrice = async function () {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 MIN(dat.PRECIO_GASOLEO_B) AS gasoleoB,\
                 dat.PRECIO_GASOLEO_PREMIUM AS gasoleoPremium,\
                 dat.PRECIO_GASOLINA_95_E5 AS gasolina95e5,\
                 dat.PRECIO_GASOLINA_98_E5 AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE dat.PRECIO_GASOLEO_B IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_95_E5, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasoleoB DESC"
    )
    return data[0]
}

const getTodayMinGasoilPremiumTodayPrice = async function (todayDate, tomorrowDate) {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 dat.PRECIO_GASOLEO_B AS gasoleoB,\
                 MIN(dat.PRECIO_GASOLEO_PREMIUM) AS gasoleoPremium,\
                 dat.PRECIO_GASOLINA_95_E5 AS gasolina95e5,\
                 dat.PRECIO_GASOLINA_98_E5 AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE FECHA >= '" + todayDate + "' AND FECHA < '" + tomorrowDate + "' AND dat.PRECIO_GASOLEO_PREMIUM IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLINA_95_E5, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasoleoPremium ASC"
    )
    return data[0]
}

const getMinGasoilPremiumPrice = async function () {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 dat.PRECIO_GASOLEO_B AS gasoleoB,\
                 MIN(dat.PRECIO_GASOLEO_PREMIUM) AS gasoleoPremium,\
                 dat.PRECIO_GASOLINA_95_E5 AS gasolina95e5,\
                 dat.PRECIO_GASOLINA_98_E5 AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE dat.PRECIO_GASOLEO_PREMIUM IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLINA_95_E5, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasoleoPremium ASC"
    )
    return data[0]
}


const getTodayMaxGasoilPremiumTodayPrice = async function (todayDate, tomorrowDate) {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 dat.PRECIO_GASOLEO_B AS gasoleoB,\
                 MIN(dat.PRECIO_GASOLEO_PREMIUM) AS gasoleoPremium,\
                 dat.PRECIO_GASOLINA_95_E5 AS gasolina95e5,\
                 dat.PRECIO_GASOLINA_98_E5 AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE FECHA >= '" + todayDate + "' AND FECHA < '" + tomorrowDate + "' AND dat.PRECIO_GASOLEO_PREMIUM IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLINA_95_E5, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasoleoPremium desc"
    )
    return data[0]
}


const getMaxGasoilPremiumPrice = async function () {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 dat.PRECIO_GASOLEO_B AS gasoleoB,\
                 MIN(dat.PRECIO_GASOLEO_PREMIUM) AS gasoleoPremium,\
                 dat.PRECIO_GASOLINA_95_E5 AS gasolina95e5,\
                 dat.PRECIO_GASOLINA_98_E5 AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE dat.PRECIO_GASOLEO_PREMIUM IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLINA_95_E5, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasoleoPremium desc"
    )
    return data[0]
}

const getTodayMinGasolina95TodayPrice = async function (todayDate, tomorrowDate) {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 dat.PRECIO_GASOLEO_B AS gasoleoB,\
                 dat.PRECIO_GASOLEO_PREMIUM AS gasoleoPremium,\
                 MIN(dat.PRECIO_GASOLINA_95_E5) AS gasolina95e5,\
                 dat.PRECIO_GASOLINA_98_E5 AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE FECHA >= '" + todayDate + "' AND FECHA < '" + tomorrowDate + "' AND dat.PRECIO_GASOLINA_95_E5 IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasolina95e5 ASC"
    )
    return data[0]
}
const getMinGasolina95Price = async function () {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 dat.PRECIO_GASOLEO_B AS gasoleoB,\
                 dat.PRECIO_GASOLEO_PREMIUM AS gasoleoPremium,\
                 MIN(dat.PRECIO_GASOLINA_95_E5) AS gasolina95e5,\
                 dat.PRECIO_GASOLINA_98_E5 AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE dat.PRECIO_GASOLINA_95_E5 IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasolina95e5 ASC"
    )
    return data[0]
}

const getTodayExpensiveGasolina95Price = async function (todayDate, tomorrowDate) {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 dat.PRECIO_GASOLEO_B AS gasoleoB,\
                 dat.PRECIO_GASOLEO_PREMIUM AS gasoleoPremium,\
                 MIN(dat.PRECIO_GASOLINA_95_E5) AS gasolina95e5,\
                 dat.PRECIO_GASOLINA_98_E5 AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE FECHA >= '" + todayDate + "' AND FECHA < '" + tomorrowDate + "' AND dat.PRECIO_GASOLINA_95_E5 IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasolina95e5 desc"
    )
    return data[0]
}


const getMaxGasolina95Price = async function () {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 dat.PRECIO_GASOLEO_B AS gasoleoB,\
                 dat.PRECIO_GASOLEO_PREMIUM AS gasoleoPremium,\
                 MIN(dat.PRECIO_GASOLINA_95_E5) AS gasolina95e5,\
                 dat.PRECIO_GASOLINA_98_E5 AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE dat.PRECIO_GASOLINA_95_E5 IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_98_E5, dat.FECHA\
        ) t\
        ORDER BY gasolina95e5 desc"
    )
    return data[0]
}



const getTodayMinGasolina98TodayPrice = async function (todayDate, tomorrowDate) {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 dat.PRECIO_GASOLEO_B AS gasoleoB,\
                 dat.PRECIO_GASOLEO_PREMIUM AS gasoleoPremium,\
                 dat.PRECIO_GASOLINA_95_E5 AS gasolina95e5,\
                 MIN(dat.PRECIO_GASOLINA_98_E5) AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE FECHA >= '" + todayDate + "' AND FECHA < '" + tomorrowDate + "' AND dat.PRECIO_GASOLINA_98_E5 IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_95_E5, dat.FECHA\
        ) t\
        ORDER BY gasolina98e5 ASC"
    )
    return data[0]
}


const getMinGasolina98Price = async function () {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 dat.PRECIO_GASOLEO_B AS gasoleoB,\
                 dat.PRECIO_GASOLEO_PREMIUM AS gasoleoPremium,\
                 dat.PRECIO_GASOLINA_95_E5 AS gasolina95e5,\
                 MIN(dat.PRECIO_GASOLINA_98_E5) AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE dat.PRECIO_GASOLINA_98_E5 IS NOT NULL\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_95_E5, dat.FECHA\
        ) t\
        ORDER BY gasolina98e5 ASC"
    )
    return data[0]
}

const getTodayExpensiveGasolina98Price = async function (todayDate, tomorrowDate) {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 dat.PRECIO_GASOLEO_B AS gasoleoB,\
                 dat.PRECIO_GASOLEO_PREMIUM AS gasoleoPremium,\
                 dat.PRECIO_GASOLINA_95_E5 AS gasolina95e5,\
                 MIN(dat.PRECIO_GASOLINA_98_E5) AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE FECHA >= '" + todayDate + "' AND FECHA < '" + tomorrowDate + "' AND (dat.PRECIO_GASOLINA_98_E5 IS NOT NULL) and (dat.PRECIO_GASOLINA_98_E5 <> 2.999)\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_95_E5, dat.FECHA\
        ) t\
        ORDER BY gasolina98e5 DESC"
    )
    return data[0]
}

const getMaxGasolina98Price = async function () {
    var data = await sequelize.query(
        "SELECT TOP 1 *\
        FROM (\
          SELECT gas.PROVINCIA AS provincia,\
                 gas.MUNICIPIO AS municipio,\
                 gas.LOCALIDAD AS localidad,\
                 gas.DIRECCION AS direccion,\
                 gas.CP AS cp,\
                 gas.ROTULO AS rotulo,\
                 dat.PRECIO_GASOLEO_A AS gasoleoA,\
                 dat.PRECIO_GASOLEO_B AS gasoleoB,\
                 dat.PRECIO_GASOLEO_PREMIUM AS gasoleoPremium,\
                 dat.PRECIO_GASOLINA_95_E5 AS gasolina95e5,\
                 MIN(dat.PRECIO_GASOLINA_98_E5) AS gasolina98e5,\
                 CONVERT(varchar(10), dat.FECHA, 105) AS fecha\
          FROM GASOLINERAS gas\
          JOIN DATA_GASOLINERAS dat ON gas.ID_GASOLINERA = dat.ID_GASOLINERA\
          WHERE (dat.PRECIO_GASOLINA_98_E5 IS NOT NULL) and (dat.PRECIO_GASOLINA_98_E5 <> 2.999)\
          GROUP BY gas.PROVINCIA, gas.MUNICIPIO, gas.LOCALIDAD, gas.DIRECCION, gas.CP, gas.ROTULO, dat.PRECIO_GASOLEO_A, dat.PRECIO_GASOLEO_B, dat.PRECIO_GASOLEO_PREMIUM, dat.PRECIO_GASOLINA_95_E5, dat.FECHA\
        ) t\
        ORDER BY gasolina98e5 DESC"
    )
    return data[0]
}


const getNumGasolineras = async function () {
    var data = await sequelize.query(
        "SELECT TOP 10 ROTULO, COUNT(*) AS NUMERO_DE_GASOLINERAS\
            FROM GASOLINERAS\
            GROUP BY ROTULO\
            ORDER BY COUNT(*) DESC;"
    )
    return data[0]
}

// devuelve todos los diferentes rotulos que de los que se disponen en 
// la base de datos
const getRotulos = async function (provincia) {
    var data = await sequelize.query(
        "SELECT distinct ROTULO from gasolineras\
        where PROVINCIA LIKE '%" + provincia + "%'"
    )
    return data[0]
}


const getProvincias = async function () {
    var data = await sequelize.query(
        "select distinct provincia from gasolineras"
    )
    return data[0];
}


const getNumGasolinerasGraph = async function (provincia) {
    var data = await sequelize.query(
        "SELECT TOP 5 ROTULO, COUNT(*) AS NUMERO_DE_GASOLINERAS\
            FROM GASOLINERAS\
            where PROVINCIA LIKE '%" + provincia + "%'\
            GROUP BY ROTULO\
            ORDER BY COUNT(*) DESC;"
    )
    return data[0]
}


const getPricesBarGraph = async function (provincia, rotulo, firstDateSQL, lastDateSQL) {
    var data = await sequelize.query(
        "SELECT \
        CASE DATENAME(MONTH, FECHA)\
            WHEN 'January' THEN 'Enero'\
            WHEN 'February' THEN 'Febrero'\
            WHEN 'March' THEN 'Marzo' \
            WHEN 'April' THEN 'Abril' \
            WHEN 'May' THEN 'Mayo' \
            WHEN 'June' THEN 'Junio' \
            WHEN 'July' THEN 'Julio' \
            WHEN 'August' THEN 'Agosto' \
            WHEN 'September' THEN 'Septiembre' \
            WHEN 'October' THEN 'Octubre' \
            WHEN 'November' THEN 'Noviembre' \
            WHEN 'December' THEN 'Diciembre' \
        END + ' ' + CAST(YEAR(FECHA) AS VARCHAR(4)) AS MES_Y_ANIO, \
        ROUND(AVG(PRECIO_GASOLINA_95_E5), 2) AS PRECIO_MEDIO_GASOLINA95_E5,\
        ROUND(AVG(PRECIO_GASOLINA_98_E5), 2) AS PRECIO_MEDIO_GASOLINA98_E5, \
        ROUND(AVG(PRECIO_GASOLEO_A), 2) AS PRECIO_GASOLEO_A, \
        ROUND(AVG(PRECIO_GASOLEO_B), 2) AS PRECIO_GASOLEO_B, \
        ROUND(AVG(PRECIO_GASOLEO_PREMIUM), 2) AS PRECIO_GASOLEO_PREMIUM \
    FROM \
        GASOLINERAS \
        INNER JOIN DATA_GASOLINERAS ON GASOLINERAS.ID_GASOLINERA = DATA_GASOLINERAS.ID_GASOLINERA \
    WHERE \
        GASOLINERAS.PROVINCIA LIKE '%" + provincia + "%' AND \
        GASOLINERAS.ROTULO LIKE '%" + rotulo + "%' AND \
        FECHA >= '" + firstDateSQL + "' AND \
        FECHA <= '" + lastDateSQL + "' \
    GROUP BY \
        DATENAME(MONTH, FECHA), YEAR(FECHA) \
    ORDER BY MES_Y_ANIO asc\
    "
    )
    return data[0]
}


const getPricesLineGraph = async function (provincia, rotulo, firstDateSQL, lastDateSQL) {
    var data = await sequelize.query(
        "SELECT \
        CONVERT(VARCHAR(10), FECHA, 111) AS FECHA_FORMATO,\
        ROUND(AVG(PRECIO_GASOLINA_95_E5), 2) AS PRECIO_MEDIO_GASOLINA95_E5,\
        ROUND(AVG(PRECIO_GASOLINA_98_E5), 2) AS PRECIO_MEDIO_GASOLINA98_E5,\
        ROUND(AVG(PRECIO_GASOLEO_A), 2) AS PRECIO_GASOLEO_A,\
        ROUND(AVG(PRECIO_GASOLEO_B), 2) AS PRECIO_GASOLEO_B,\
        ROUND(AVG(PRECIO_GASOLEO_PREMIUM), 2) AS PRECIO_GASOLEO_PREMIUM\
    FROM \
        GASOLINERAS\
        INNER JOIN DATA_GASOLINERAS ON GASOLINERAS.ID_GASOLINERA = DATA_GASOLINERAS.ID_GASOLINERA\
    WHERE  \
        GASOLINERAS.PROVINCIA LIKE '%" + provincia + "%' AND \
        GASOLINERAS.ROTULO LIKE '%" + rotulo + "%' AND \
        FECHA >= '" + firstDateSQL + "' AND \
        FECHA <= '" + lastDateSQL + "' \
    GROUP BY CONVERT(VARCHAR(10), FECHA, 111)\
    ORDER BY CONVERT(VARCHAR(10), FECHA, 111) ASC"
    )
    return data[0]
}




export {
    getAllGasolineras,
    getTodayData,
    getMeanProvinceValues,
    getTodayDataTableDDBB,
    getTodayMinGasoilATodayPrice,
    getTodayMaxGasoilATodayPrice,
    getMinGasoilAPrice,
    getMaxGasoilAPrice,
    getTodayMinGasoilBTodayPrice,
    getMinGasoilBPrice,
    getTodayMaxGasoilBTodayPrice,
    getMaxGasoilBPrice,
    getTodayMinGasoilPremiumTodayPrice,
    getMinGasoilPremiumPrice,
    getTodayMaxGasoilPremiumTodayPrice,
    getMaxGasoilPremiumPrice,
    getTodayMinGasolina95TodayPrice,
    getMinGasolina95Price,
    getTodayExpensiveGasolina95Price,
    getMaxGasolina95Price,
    getTodayMinGasolina98TodayPrice,
    getMinGasolina98Price,
    getTodayExpensiveGasolina98Price,
    getMaxGasolina98Price,
    getNumGasolineras,
    getRotulos,
    getProvincias,
    getNumGasolinerasGraph,
    getPricesBarGraph,
    getPricesLineGraph
}