import * as ddbb from "../helpers/DBquery.js"
import * as dateHelper from "../helpers/fechaHelper.js"

let dia = 0

const getTodayDataTable = async (req, res) => {

    try {
        // Creamos las fechas para filtrar en MSSQL
        let lastFirstDate = dateHelper.getLastDate(dia)[0]
        let lastLastDate = dateHelper.getLastDate(dia)[1]

        const data = await ddbb.getTodayDataTable(lastFirstDate, lastLastDate)
        console.log(data)
        dia++
        if (data[0] == undefined) {
            getTodayDataTable(req, res)
        }
        res.send(data)
    } catch (err) {
        res.status(500)
    }
}


export {
    getTodayDataTable
}