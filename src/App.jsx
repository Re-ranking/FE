import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CVupload from './pages/CVupload';
import MainPage from './pages/MainPage';     // 메인 페이지 (새로 만듦)
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/CVupload" element={<CVupload />} />
        
        {/* ✅ 디자인 확인을 위해 추가한 경로 */}
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;