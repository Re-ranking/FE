import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CVupload from './pages/CVupload';
import MainPage from './pages/MainPage';
import TeamRecommendation from './pages/TeamRecommendation'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/CVupload" element={<CVupload />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/Teamrecommend" element={<TeamRecommendation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;