import * as ddbb from "../helpers/DBquery.js"
import * as dateHelper from "../helpers/fechaHelper.js"

let globalDay = 0
const getTablePrecios = async (req, res) => {
    // tiene que devolver un array de arrays [[],[],[],[]]
    try {
        let lastFirstDate = dateHelper.getLastDate(globalDay)[0];
        let lastLastDate = dateHelper.getLastDate(globalDay)[1];

        const data = await ddbb.getTodayMinGasoilATodayPrice(lastFirstDate, lastLastDate)
      if (data[0] == undefined) {
        // Si no hay datos, hacemos una nueva consulta con el siguiente día
        globalDay++;
        return getTodayDataTable(req, res);
      }
  
      //preparamos la fecha para mandarla al Front
      const year = lastFirstDate.slice(0, 4);
      const month = lastFirstDate.slice(4, 6);
      const day = lastFirstDate.slice(6, 8);
  
      lastFirstDate = `${day}-${month}-${year}`;
      globalDay = 0;
      console.log(data)
      res.send(data);

    } catch (err) {
        console.log(err)
    }

}


export {
    getTablePrecios
}