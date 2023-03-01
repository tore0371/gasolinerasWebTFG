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
  try{
    
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

  }catch(err){
    console.log(err)
  }


}


const getTablePreciosGasoleoPremium = async (req, res) => {}








export {
    getTablePreciosGasoleoA,
    getTablePreciosGasoleoB,
    getTablePreciosGasoleoPremium
    
}