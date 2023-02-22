import * as ddbb from "../helpers/DBquery.js"

const getTodayDataTable = async (req, res) =>{
    
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

        const data = await ddbb.getTodayDataTable(todayDate, tomorrowDate)

        res.send(data)
    } catch (err) {
        res.status(500)
    }
} 


export{
    getTodayDataTable
}