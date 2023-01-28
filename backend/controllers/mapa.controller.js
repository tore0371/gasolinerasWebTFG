import * as ddbb from "../helpers/DBquery.js"


var provincias = [
    ["CASTELLÓN / CASTELLÓ", "40.2413705852", "-0.146777086937"],
    ["GIRONA", "42.1280117119", "2.6735559327"],
    ["LLEIDA", "42.0439686698", "1.04798206104"],
    ["BADAJOZ", "38.7097707381", "-6.14158521981"],
    ["ASTURIAS", "43.292357861", "-5.99350932547"],
    ["VALLADOLID", "41.6341260695", "-4.84719141141"],
    ["BURGOS", "42.3687127267", "-3.58574245567"],
    ["CÓRDOBA", "37.9926944409", "-4.80926161095"],
    ["LEÓN", "42.6199552439", "-5.83988102629"], 
    ["GIPUZKOA", "43.1437759117", "-2.19417845709"],
    ["CÁDIZ", "36.5538729195", "-5.7604183752"],
    ["ALMERÍA", "37.1960852121", "-2.3448128003"],
    ["CORUÑA (A)", "43.1257958229", "-8.4642836868"], 
    ["MELILLA", "35.2908279949", "-2.95053552337"],
    ["SEVILLA", "37.4356699135", "-5.68277303032"],
    ["LUGO", "43.011764", "-7.44638404764"] , 	
    ["BIZKAIA", "43.2376797057", "-2.85260007926"] ,
    ["ZARAGOZA", "41.6203648019", "-1.06449678144"],
    ["SORIA", "41.6207742504", "-2.58874304739"],
    ["ALICANTE", "38.4786378049", "-0.568699068376"],
    ["CUENCA", "39.8960496846", "-2.19567153274"],
    ["VALENCIA / VALÈNCIA", "39.3702562375", "-0.800789615081"],
    ["MADRID", "40.4950873744", "-3.71704619215"],
    ["NAVARRA", "42.6672011509", "-1.64611414443"],
    ["RIOJA (LA)", "42.2748706958", "-2.5170441194"],
    ["ZAMORA", "41.7271743961", "-5.98053925522"],
    ["ALBACETE", "38.8254086192", "-1.98037326935"],
    ["PALENCIA", "42.3718338546", "-4.53585717538"],
    ["MÁLAGA", "36.8138591651", "-4.72586195603"],
    ["MURCIA", "38.0023681653", "-1.48575629332"],
    ["CÁCERES", "39.7118899607", "-6.16082194997"],
    ["SALAMANCA", "40.8049892162", "-6.06541224773"],
    ["ÁVILA", "40.5710367492", "-4.94553505619"],
    ["PALMAS (LAS)", "28.0624928216", "-15.6509933624"],
    ["GUADALAJARA", "40.8134495654", "-2.62368878371"],
    ["GRANADA", "37.3125169672", "-3.26788107732"],
    ["BARCELONA", "41.7310008895", "1.98405401772"],
    ["CIUDAD REAL", "38.9256128254", "-3.82809764894"],
    ["BALEARS (ILLES)", "39.5751889864", "2.91229172079"],
    ["SEGOVIA", "41.1710254065", "-4.05415057783"],
    ["CANTABRIA", "43.1975220484", "-4.03002122038"],
    ["HUELVA", "37.5771794021", "-6.82930221031"],
    ["CEUTA", "35.8934069863", "-5.34342403891"],
    ["TOLEDO", "39.7937341614", "-4.14815562595"],
    ["TERUEL", "40.3612619615", "-1.115532258446"],
    ["OURENSE", "42.1964503002", "-7.59259790937"],
    ["TARRAGONA", "41.0876143957", "0.818127863314"],
    ["JAÉN", "38.0165122783", "-3.44169215171"],
    ["ARABA/ÁLAVA", "42.8351264353", "-2.72060346921"],
    ["SANTA CRUZ DE TENERIFE", "28.3125567678", "-16.517856743"],
    ["PONTEVEDRA", "42.435764706", "-8.46106294738"],
    ["HUESCA", "42.2030557371", "-0.0728865943582"]]


const getTodayData = async (req, res) => {
    console.log("Controlador --> mapa.controller.js")
    try {
        // Creamos las fechas para filtrar en MSSQL
        let DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000

        const date = new Date();
        let todayMonth = date.getMonth() + 1
        // fecha de hoy
        let strMonth = (todayMonth < 10) ? "0" + todayMonth.toString() : todayMonth.toString()
        let strDay = (date.getDate() < 10) ? "0" + date.getDate().toString() : date.getDate().toString()
        let strYear = date.getFullYear().toString()
        let todayDate = strYear + strMonth + strDay

        // fecha de mañana
        let tomorrow = new Date(date.getTime() + DAY_IN_MILISECONDS)
        let tomorrowMonth = tomorrow.getMonth() + 1
        let tomorrowStrDay = (tomorrow.getDate() < 10) ? "0" + tomorrow.getDate().toString() : tomorrow.getDate().toString()
        let tomorrowStrMonth = (tomorrowMonth < 10) ? "0" + tomorrowMonth.toString() : tomorrowMonth.toString()
        let tomorrowStrYear = tomorrow.getFullYear().toString()
        let tomorrowDate = tomorrowStrYear + tomorrowStrMonth + tomorrowStrDay

        console.log("Fecha hoy --> " + todayDate)
        console.log("Fecha manana --> " + tomorrowDate)

        const data = await ddbb.getTodayData(todayDate, tomorrowDate)

        res.send(data)
    } catch (err) {
        res.status(500)
    }
}

const getTodayMeanDataPerProvince = async (req, res) => {
    console.log("hola he llegado a esta zona de aqui a ver quie pasa")
    var results = []



    for (var i = 0; i < 52; i++) {        
        const data = await ddbb.getMeanProvinceValues(provincias[i]) 
        results.push(data)
    }

    // provincias.forEach(async provincia => {
    //     v
    // });

    res.send(results)
}

export {
    getTodayData,
    getTodayMeanDataPerProvince
}

