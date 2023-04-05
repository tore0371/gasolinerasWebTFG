import * as ddbb from "../helpers/DBquery.js"



const getRotulos = async (req, res) => {
    try {
        const provincia = req.params.provincia;
        console.log(req.body)
        console.log("*******************")
        console.log(provincia)
        console.log("*******************")

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

export {
    getRotulos,
    getProvincias
}