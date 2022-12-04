import * as ddbb from "../helpers/DBquery.js"



const getAllDaylyDAta = async(req, res) => {
    try {
        const data = await ddbb.getAllGasolineras()
        console.log(req.body.municipio)
        res.send(data)

    }catch(err){
        res.status(500)
    }
}



export {
    getAllDaylyDAta
}