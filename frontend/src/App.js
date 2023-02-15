import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio"
import Graficas from "./pages/graficas";
import Mapa from "./pages/mapa"
import Previsiones from "./pages/previsiones";
import Actual from "./pages/actual";
import Resaltados from "./pages/resaltados";


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />}/>
        <Route path="/inicio" element={<Inicio />}/>
        <Route path="/graficas" element={<Graficas />}/>
        <Route path="/mapa" element={<Mapa />}/>
        <Route path="/previsiones" element={<Previsiones/>}/>
        <Route path="/actual" element={<Actual/>}/>
        <Route path="/resaltados" element={<Resaltados/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
