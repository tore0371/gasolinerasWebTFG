import * as ddbb from "../helpers/DBquery.js"



const getRotulos = async (req, res) => {
    try {
        const data = await ddbb.getRotulos();

        res.send(data)
    } catch (err) {
        console.log(err);
    }
}



export default getRotulos;