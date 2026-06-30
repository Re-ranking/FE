import React, { useState, useEffect } from 'react';
import './ContestList.css';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ContestCard from '../components/ContestCard';
import { getContestList, searchContests, getContestsByCategory, getContestsByTarget, normalizeContestListItem } from '../api/contestAPI';

function ContestList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  const [contests, setContests] = useState([]);

  const handleSearch = (filter, keyword) => {
    setSelectedFilter(filter);
    setSearchTerm(keyword);

    const fetchFiltered = async () => {
      setLoading(true);
      try {
        let raw;
        if (!keyword) {
          raw = await getContestList();
        } else if (filter === 'All') {
          raw = await searchContests(keyword);
        } else if (filter === '분야') {
          raw = await getContestsByCategory(keyword);
        } else if (filter === '대상') {
          raw = await getContestsByTarget(keyword);
        }
        setContests((raw || []).map(normalizeContestListItem));
      } catch (err) {
        console.error('공모전 검색 오류:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiltered();
  };

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      try {
        const raw = await getContestList();
        setContests((raw || []).map(normalizeContestListItem));
      } catch (err) {
        console.error('공모전 데이터를 가져오는 중 오류가 발생했습니다:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  const filteredContests = contests.filter((contest) => {
    const keyword = searchTerm.toLowerCase().trim();
    if (!keyword) return true;

    if (selectedFilter === 'All') {
      return contest.title.toLowerCase().includes(keyword);
    } else if (selectedFilter === '분야') {
      return contest.category?.toLowerCase().includes(keyword);
    } else if (selectedFilter === '대상') {
      return contest.target?.toLowerCase().includes(keyword);
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
              filteredContests.map((contest) => (
                <ContestCard key={contest.id} contest={contest} id={contest.id} />
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