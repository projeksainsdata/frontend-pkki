import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import './App.css';
import FaqPage from './pages/FaqPage';
import Committee from './pages/Committee';
import Schedule from './pages/Schedule';
import InfografisPage from './pages/Infografis';

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='/infografis' element={<InfografisPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
