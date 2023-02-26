




const getLastDate = function (day) {
    let lastFirstDate = ""; //20230226
    let lastLastDate = ""; //20230227
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


    // restamos el dia a la fecha de todayDate
    let fechaObj = new Date(todayDate.slice(0, 4), todayDate.slice(4, 6) - 1, todayDate.slice(6)); // convierte la cadena en un objeto Date
    fechaObj.setDate(fechaObj.getDate() - day); // resta un día a la fecha
    let fechaAnterior = fechaObj.getFullYear().toString() + (fechaObj.getMonth() + 1).toString().padStart(2, '0') + fechaObj.getDate().toString().padStart(2, '0'); // convierte el objeto Date en una cadena en formato "YYYYMMDD"

    

    fechaObj = new Date(tomorrowDate.slice(0, 4), tomorrowDate.slice(4, 6) - 1, tomorrowDate.slice(6)); // convierte la cadena en un objeto Date
    fechaObj.setDate(fechaObj.getDate() - day); // resta un día a la fecha
    let fechaAnteriorTomorrow = fechaObj.getFullYear().toString() + (fechaObj.getMonth() + 1).toString().padStart(2, '0') + fechaObj.getDate().toString().padStart(2, '0'); // convierte el objeto Date en una cadena en formato "YYYYMMDD"

    

    console.log("Fecha hoy --> " + todayDate)
    console.log("Fecha manana --> " + tomorrowDate)


    return ([fechaAnterior, fechaAnteriorTomorrow])
}




export {
    getLastDate
}