import * as ddbb from "../helpers/DBquery.js"


const getTablePrecios = async (req, res) =>{
    console.log("hola")
    // tiene que devolver un array de arrays [[],[],[],[]]


    const data = await ddbb.getHighlightedPriceData()


    res.send(data)
}


export{
    getTablePrecios
}