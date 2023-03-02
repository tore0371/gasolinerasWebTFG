import * as ddbb from "../helpers/DBquery.js"
import * as dateHelper from "../helpers/fechaHelper.js"

let globalDay = 0
const getTablePreciosGasoleoA = async (req, res) => {
  // tiene que devolver un array de arrays [[],[],[],[]]
  try {
    let lastFirstDate = dateHelper.getLastDate(globalDay)[0];
    let lastLastDate = dateHelper.getLastDate(globalDay)[1];

    const dataGasoleoACheaperDay = await ddbb.getTodayMinGasoilATodayPrice(lastFirstDate, lastLastDate)
    const dataGasoleoACheaperAll = await ddbb.getMinGasoilAPrice()
    const dataGasoleoAExpensiveDay = await ddbb.getTodayMaxGasoilATodayPrice(lastFirstDate, lastLastDate)
    const dataGasoleoAExpensive = await ddbb.getMaxGasoilAPrice()

    if (dataGasoleoACheaperDay[0] == undefined) {
      // Si no hay datos, hacemos una nueva consulta con el siguiente día
      globalDay++;
      return getTablePreciosGasoleoA(req, res);
    }

    //preparamos la fecha para mandarla al Front
    const year = lastFirstDate.slice(0, 4);
    const month = lastFirstDate.slice(4, 6);
    const day = lastFirstDate.slice(6, 8);

    lastFirstDate = `${day}-${month}-${year}`;
    globalDay = 0;
    dataGasoleoACheaperDay[0].fecha = lastFirstDate

    console.log(dataGasoleoACheaperAll)
    res.send([dataGasoleoACheaperDay, dataGasoleoACheaperAll, dataGasoleoAExpensiveDay, dataGasoleoAExpensive]);

  } catch (err) {
    console.log(err)
  }
}

const getTablePreciosGasoleoB = async (req, res) => {
  try {
    let lastFirstDate = dateHelper.getLastDate(globalDay)[0];
    let lastLastDate = dateHelper.getLastDate(globalDay)[1];

    const dataGasoleoBCheaperDay = await ddbb.getTodayMinGasoilBTodayPrice(lastFirstDate, lastLastDate)
    const dataGasoleoBCheaperAll = await ddbb.getMinGasoilBPrice()
    const dataGasoleoBExpensiveDay = await ddbb.getTodayMaxGasoilBTodayPrice(lastFirstDate, lastLastDate)
    const dataGasoleoBExpensive = await ddbb.getMaxGasoilBPrice()

    if (dataGasoleoBCheaperDay[0] == undefined) {
      // Si no hay datos, hacemos una nueva consulta con el siguiente día
      globalDay++;
      return getTablePreciosGasoleoB(req, res);
    }
    globalDay = 0;
    res.send([dataGasoleoBCheaperDay, dataGasoleoBCheaperAll, dataGasoleoBExpensiveDay, dataGasoleoBExpensive])

  } catch (err) {
    console.log(err)
  }


}


const getTablePreciosGasoleoPremium = async (req, res) => {
  try {
    let lastFirstDate = dateHelper.getLastDate(globalDay)[0];
    let lastLastDate = dateHelper.getLastDate(globalDay)[1];

    const dataGasoleoPremiumCheaperDay = await ddbb.getTodayMinGasoilPremiumTodayPrice(lastFirstDate, lastLastDate)
    const dataGasoleoPremiumCheaperAll = await ddbb.getMinGasoilPremiumPrice()
    const dataGasoleoPremiumExpensiveDay = await ddbb.getTodayMaxGasoilPremiumTodayPrice(lastFirstDate, lastLastDate)
    const dataGasoleoPremiumExpensive = await ddbb.getMaxGasoilPremiumPrice()

    if (dataGasoleoPremiumCheaperDay[0] == undefined) {
      // Si no hay datos, hacemos una nueva consulta con el siguiente día
      globalDay++;
      return getTablePreciosGasoleoPremium(req, res);
    }
    globalDay = 0;
    res.send([dataGasoleoPremiumCheaperDay, dataGasoleoPremiumCheaperAll, dataGasoleoPremiumExpensiveDay, dataGasoleoPremiumExpensive])
  } catch (err) {
    console.log(err)
  }
}

const getTablePreciosGasolina95 = async (req, res) => {
  try {
    let lastFirstDate = dateHelper.getLastDate(globalDay)[0];
    let lastLastDate = dateHelper.getLastDate(globalDay)[1];

    const dataGasolinaCheaperDay = await ddbb.getTodayMinGasolina95TodayPrice(lastFirstDate, lastLastDate);
    const dataGasolinaCheaper = await ddbb.getMinGasolina95Price()
    const dataGasolinaExpensiveDay = await ddbb.getTodayExpensiveGasolina95Price(lastFirstDate, lastLastDate);
    const dataGasolinaExpensive = await ddbb.getMaxGasolina95Price()

    if (dataGasolinaCheaperDay[0] == undefined) {
      // Si no hay datos, hacemos una nueva consulta con el siguiente día
      globalDay++;
      return getTablePreciosGasolina95(req, res);
    }
    res.send([dataGasolinaCheaperDay, dataGasolinaCheaper, dataGasolinaExpensiveDay, dataGasolinaExpensive])
  } catch (err) {
    console.log(err)
  }
}

const getTablePreciosGasolina98 = async (req, res) => {
  try {
    let lastFirstDate = dateHelper.getLastDate(globalDay)[0];
    let lastLastDate = dateHelper.getLastDate(globalDay)[1];

    const dataGasolinaCheaperDay = await ddbb.getTodayMinGasolina98TodayPrice(lastFirstDate, lastLastDate);
    const dataGasolinaCheaper = await ddbb.getMinGasolina98Price()
    const dataGasolinaExpensiveDay = await ddbb.getTodayExpensiveGasolina98Price(lastFirstDate, lastLastDate);
    const dataGasolinaExpensive = await ddbb.getMaxGasolina98Price()

    if (dataGasolinaCheaperDay[0] == undefined) {
      // Si no hay datos, hacemos una nueva consulta con el siguiente día
      globalDay++;
      return getTablePreciosGasolina95(req, res);
    }
    res.send([dataGasolinaCheaperDay, dataGasolinaCheaper, dataGasolinaExpensiveDay, dataGasolinaExpensive])
  } catch (err) {
    console.log(err)
  }
}


const getTableGasolineras = async (req, res) => {
  try {
    const dataGasolineras = await ddbb.getNumGasolineras()
    console.log(dataGasolineras)
    res.send(dataGasolineras)
  } catch (err) {
    console.log(err)
  }

}








export {
  getTablePreciosGasoleoA,
  getTablePreciosGasoleoB,
  getTablePreciosGasoleoPremium,
  getTablePreciosGasolina95,
  getTablePreciosGasolina98,
  getTableGasolineras
}