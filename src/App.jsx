import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CVupload from './pages/CVupload';
import MainPage from './pages/MainPage';
import TeamRecommendation from './pages/TeamRecommendation';  
import ContestList from './pages/ContestList';   
import ContestDetail from './pages/ContestDetail';
import ContestRecommend from './pages/ContestRecommend'; 
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
        
        {/* 🌟 2. 내비게이션 바 링크와 매칭되는 공모전 추천 페이지 라우터 등록 */}
        <Route path="/contest-recommend" element={<ContestRecommend />} />
        
        <Route path="/contests" element={<ContestList />} />
        {/* 동적라우팅 */}
        <Route path="/contests/:id" element={<ContestDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;