import axios from 'axios';

const getRotulos = async () => {
  try {
    const response = await axios.get('http://localhost:3002/graficas/getRotulos');
    const rotulosArray = [];
    for (let i = 0; i<  response.data.length; i++){
        rotulosArray.push(response.data[i]["ROTULO"])
    }
    return rotulosArray;
  } catch (error) {
    console.error(error);
  }
};
export default getRotulos;
