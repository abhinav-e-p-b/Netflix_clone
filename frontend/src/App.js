import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Hero, ContentRows, SearchResults, VideoModal } from './components';

// TMDB API Configuration
const TMDB_API_KEY = 'c8dea14dc917687ac631a52620e4f7ad';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Search functionality
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  // Video modal handlers
  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  const Home = () => (
    <div className="min-h-screen bg-black text-white">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        isSearching={isSearching}
      />
      
      {isSearching && searchQuery ? (
        <SearchResults 
          results={searchResults}
          query={searchQuery}
          onVideoPlay={openVideoModal}
        />
      ) : (
        <>
          <Hero onVideoPlay={openVideoModal} />
          <ContentRows onVideoPlay={openVideoModal} />
        </>
      )}
      
      {isVideoModalOpen && (
        <VideoModal 
          video={selectedVideo}
          onClose={closeVideoModal}
        />
      )}
    </div>
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL, TMDB_BACKDROP_BASE_URL };
export default App;