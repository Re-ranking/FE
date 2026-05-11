import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CVupload from './pages/CVupload'; 
import SurveyPage from './pages/SurveyPage'; // ✅ 성향 입력 페이지 임포트
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ 기본 경로 → 로그인 */}
        <Route path="/" element={<Login />} />

        {/* ✅ 로그인 페이지 */}
        <Route path="/login" element={<Login />} />

        {/* ✅ 회원가입 페이지 */}
        <Route path="/register" element={<Register />} />

        {/* ✅ CV 업로드 페이지 */}
        <Route path="/CVupload" element={<CVupload />} /> 

        {/* ✅ 성향 입력 페이지 (추가됨) */}
        <Route path="/survey" element={<SurveyPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;