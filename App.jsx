import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './Inicio';
// import Actividades from './Actividades'; // Esto lo descomentarás cuando crees el otro archivo

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        {/* <Route path="/actividades" element={<Actividades />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;