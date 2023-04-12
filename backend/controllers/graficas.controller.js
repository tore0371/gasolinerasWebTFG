import * as ddbb from "../helpers/DBquery.js"

const getRotulos = async (req, res) => {
    try {
        const provincia = req.params.provincia;
        const data = await ddbb.getRotulos(provincia);
        res.send(data)
    } catch (err) {
        console.log(err);
    }
}

const getProvincias = async (req, res) => {
    try {
        const data = await ddbb.getProvincias();
        res.send(data);
    } catch (err) {
        console.log(err)
    }
}

const getPieData = async(req, res) => {
    const provincia = req.params.provincia;
    console.log(provincia)
    const dataGasolineras = await ddbb.getNumGasolinerasGraph(provincia);
    res.send(dataGasolineras)
}

const getBarData = async(req, res) => {
    try{
        const provincia = req.body.provincia;
        const rotulo = req.body.rotulosBar;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
         
        
        var startDataTypeDate = new Date(startDate);
        const fisrtMonthSQL = (parseInt(startDataTypeDate.getMonth()) +1)%12
        const firstDateSQL = startDataTypeDate.getFullYear() + "-" + fisrtMonthSQL + "-" + startDataTypeDate.getDate();
        
        var endDateTypeData = new Date(endDate);
        const lastMonthSQL = (parseInt(endDateTypeData.getMonth()) +1)%12

        const lastDateSQL = endDateTypeData.getFullYear() + "-" + lastMonthSQL + "-" + endDateTypeData.getDate();

        const data = await ddbb.getPricesBarGraph(provincia, rotulo, firstDateSQL, lastDateSQL)
        

        
        console.log(startDataTypeDate);
        res.send(data);
        
    }catch(error){
        console.log(error)
    }

    


}

export {
    getRotulos,
    getProvincias,
    getPieData,
    getBarData
}