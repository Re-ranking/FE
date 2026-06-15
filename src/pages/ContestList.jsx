import React, { useState, useEffect } from 'react';
import './ContestList.css';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ContestCard from '../components/ContestCard';
import { getContestList, searchContests, getContestsByCategory, getContestsByTarget } from '../api/contestAPI'; // API 연결
import poster01 from '../assets/images/contest-poster-01.png'; 
import poster02 from '../assets/images/contest-poster-02.png'; 
import poster03 from '../assets/images/contest-poster-03.png'; 
import poster04 from '../assets/images/contest-poster-04.png'; 
import poster05 from '../assets/images/contest-poster-05.png'; 
import poster06 from '../assets/images/contest-poster-06.png';

function ContestList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  // 더미 데이터 유지 (디자인 작업용 - 백엔드 연동 시 [] 로 변경)
  const [contests, setContests] = useState([
    {
      title: "제 6회 K-디지털 트레이닝 해커톤",
      tags: ["기획/아이디어", "논문/리포트", "웹/모바일/IT", "게임/소프트웨어"],
      target: "대학생",
      posterImg: poster01
    },
    {
      title: "제7회 공군 창의·혁신 아이디어 공모 해커톤",
      tags: ["과학/공학", "게임/소프트웨어", "기획/아이디어"],
      target: "대학생/일반인",
      posterImg: poster02
    },
    {
      title: "CYBER SECURITY 융합 보안 경진대회",
      tags: ["웹/모바일/IT", "과학/공학", "대외활동/서포터즈"],
      target: "대학원생/직장인",
      posterImg: poster03
    },
    {
      title: "Us:Code 융복합 챌린지 in 의성",
      tags: ["웹/모바일/IT", "기획/아이디어", "대외활동/서포터즈", "게임/소프트웨어", "과학/공학"],
      target: "청년/대학생",
      posterImg: poster04
    },
    {
      title: "국방 소프트웨어 및 AI 매치업 공모전",
      tags: ["게임/소프트웨어", "과학/공학"],
      target: "구직자/대학생",
      posterImg: poster05
    },
    {
      title: "제3회 KISIA 정보보호 청년 인재 서포터즈",
      tags: ["대외활동/서포터즈", "웹/모바일/IT", "기획/아이디어"],
      target: "대학생",
      posterImg: poster06
    }
  ]);

  // 검색/필터 핸들러 - Swagger 확인 후 주석 해제
  const handleSearch = (filter, keyword) => {
    setSelectedFilter(filter);
    setSearchTerm(keyword);

    // 백엔드 연동 시 아래 주석 해제 + 더미 데이터 useState 초기값 [] 로 변경
    // const fetchFiltered = async () => {
    //   setLoading(true);
    //   try {
    //     let data;
    //     if (!keyword) {
    //       data = await getContestList();
    //     } else if (filter === 'All') {
    //       data = await searchContests(keyword);
    //     } else if (filter === '분야') {
    //       data = await getContestsByCategory(keyword);
    //     } else if (filter === '대상') {
    //       data = await getContestsByTarget(keyword);
    //     }
    //     setContests(data);
    //   } catch (err) {
    //     console.error('공모전 검색 오류:', err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchFiltered();
  };

  // 초기 목록 로드 - Swagger 확인 후 주석 해제
  useEffect(() => {
    // const fetchContests = async () => {
    //   setLoading(true);
    //   try {
    //     const data = await getContestList();
    //     setContests(data);
    //   } catch (err) {
    //     console.error('공모전 데이터를 가져오는 중 오류가 발생했습니다:', err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchContests();
  }, []);

  // 더미 데이터용 프론트 필터링 (백엔드 연동 후 제거)
  const filteredContests = contests.filter((contest) => {
    const keyword = searchTerm.toLowerCase().trim();
    if (!keyword) return true;

    if (selectedFilter === 'All') {
      return contest.title.toLowerCase().includes(keyword);
    } else if (selectedFilter === '분야') {
      return contest.tags.some(tag => tag.toLowerCase().includes(keyword));
    } else if (selectedFilter === '대상') {
      return contest.target.toLowerCase().includes(keyword);
    }
    return true;
  });

  return (
    <div className="contest-list-page">
      <Navbar />
      
      <main className="contest-list-content">
        <SearchBar onSearch={handleSearch} />

        <div className="contest-list-header">
          <h2 className="contest-list-title">공모전 목록</h2>
          <span className="contest-list-count">총 {filteredContests.length}개</span>
        </div>

        {loading ? (
          <div className="no-result">불러오는 중...</div>
        ) : (
          <div className="contest-grid">
            {filteredContests.length > 0 ? (
              filteredContests.map((contest, index) => (
                <ContestCard key={index} contest={contest} id={index} />
              ))
            ) : (
              <div className="no-result">검색 결과가 없습니다.</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default ContestList;