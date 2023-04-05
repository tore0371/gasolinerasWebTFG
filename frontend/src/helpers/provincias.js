import axios from 'axios'

const getProvincias = async () =>{
  try{  
    const response = await axios.get(' http://localhost:3002/graficas/getProvincias');
    const provinciasArray = [];
    for (let i = 0; i < response.data.length; i++) {
      if(response.data[i]["provincia"].includes("/")){
        if(response.data[i]["provincia"].includes("ARABA")){
          provinciasArray.push(response.data[i]["provincia"].split("/")[1]);
        }else{
          provinciasArray.push(response.data[i]["provincia"].split("/")[0]);
        }
      }else provinciasArray.push(response.data[i]["provincia"])
    }
    return provinciasArray;
  }catch (err) {
    console.log(err)
  }
}

export default getProvincias;