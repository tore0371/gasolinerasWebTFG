import * as ddbb from "./DBquery.js"



const getAllDaylyDAta = async(req, res) => {
    try {
        const data = await ddbb.getAllGasolineras()
        console.log(data)
        res.send(data)

    }catch(err){
        res.status(500)
    }
}



export {
    getAllDaylyDAta
}