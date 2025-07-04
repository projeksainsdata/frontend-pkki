import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import './App.css';
import Informasi from './pages/Informasi';
import InfografisPage from './pages/Infografis';
import Berita from './pages/berita/index';
import GuidePage from './pages/Haki';
import Alur from './pages/Alur';
import LombaSpesifikasiPaten from './pages/Lomba';
import FaqPage from './pages/FaqPage';
import Layanan from './pages/Layanan';
import DaftarHaki from './pages/DaftarHaki';
import TentangKami from './pages/Committee';

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/berita' element={<Berita />} />
          <Route path='/panduan' element={<GuidePage />} />
          <Route path='/alur' element={<Alur />} />
          <Route path='/lomba' element={<LombaSpesifikasiPaten />} />
          <Route path='/infografis' element={<InfografisPage />} />
          <Route path='/faqs' element={<FaqPage />} />
          <Route path='/layanan' element={<Layanan />} />
          <Route path='/haki' element={<DaftarHaki />} />
          <Route path='/tentang-kami' element={<TentangKami />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
