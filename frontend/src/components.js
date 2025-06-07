import React, { useState, useEffect, useRef } from 'react';
import { Search, Play, Info, Plus, ChevronDown, Bell, User, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL, TMDB_BACKDROP_BASE_URL } from './App';

// Header Component
export const Header = ({ searchQuery, setSearchQuery, onSearch, isSearching }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-gradient-to-b from-black/50 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <h1 className="text-red-600 text-2xl md:text-3xl font-bold tracking-tight">
            NETFLIX
          </h1>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-6 text-sm">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">TV Shows</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Movies</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">New & Popular</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">My List</a>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <div className="flex items-center bg-black/50 border border-gray-600 rounded px-3 py-1">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search titles..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-transparent text-white placeholder-gray-400 outline-none w-48"
              />
            </div>
          </div>

          {/* Notifications */}
          <Bell className="w-5 h-5 text-white hover:text-gray-300 cursor-pointer" />

          {/* Profile */}
          <div className="relative">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <ChevronDown className="w-4 h-4 text-white" />
            </div>
            
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 border border-gray-600 rounded shadow-lg">
                <div className="p-2">
                  <div className="px-3 py-2 hover:bg-gray-700 cursor-pointer rounded text-sm">Profile 1</div>
                  <div className="px-3 py-2 hover:bg-gray-700 cursor-pointer rounded text-sm">Profile 2</div>
                  <hr className="border-gray-600 my-2" />
                  <div className="px-3 py-2 hover:bg-gray-700 cursor-pointer rounded text-sm">Account</div>
                  <div className="px-3 py-2 hover:bg-gray-700 cursor-pointer rounded text-sm">Sign out</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Component
export const Hero = ({ onVideoPlay }) => {
  const [heroContent, setHeroContent] = useState(null);
  const [heroVideo, setHeroVideo] = useState(null);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();
        const featured = data.results[0];
        setHeroContent(featured);
        
        // Fetch video for hero content
        const videoResponse = await fetch(
          `${TMDB_BASE_URL}/movie/${featured.id}/videos?api_key=${TMDB_API_KEY}`
        );
        const videoData = await videoResponse.json();
        const trailer = videoData.results.find(video => 
          video.type === 'Trailer' && video.site === 'YouTube'
        );
        setHeroVideo(trailer);
      } catch (error) {
        console.error('Error fetching hero content:', error);
      }
    };

    fetchHeroContent();
  }, []);

  if (!heroContent) return null;

  return (
    <div className="relative h-screen flex items-center justify-start">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${TMDB_BACKDROP_BASE_URL}${heroContent.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-16 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          {heroContent.title || heroContent.name}
        </h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-200">
          {heroContent.overview}
        </p>
        
        <div className="flex space-x-4">
          <button 
            onClick={() => onVideoPlay({ ...heroContent, video: heroVideo })}
            className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Play</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-500/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-500/50 transition-colors">
            <Info className="w-5 h-5" />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Movie Card Component
export const MovieCard = ({ movie, onVideoPlay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [video, setVideo] = useState(null);

  const handleMouseEnter = async () => {
    setIsHovered(true);
    
    // Fetch video when hovered
    try {
      const mediaType = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');
      const videoResponse = await fetch(
        `${TMDB_BASE_URL}/${mediaType}/${movie.id}/videos?api_key=${TMDB_API_KEY}`
      );
      const videoData = await videoResponse.json();
      const trailer = videoData.results.find(video => 
        video.type === 'Trailer' && video.site === 'YouTube'
      );
      setVideo(trailer);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  const title = movie.title || movie.name;
  const imageUrl = movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null;

  return (
    <div 
      className="relative flex-shrink-0 w-48 cursor-pointer transition-transform duration-300 hover:scale-110"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-72 object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-72 bg-gray-700 rounded-md flex items-center justify-center">
            <span className="text-gray-400 text-center p-4">{title}</span>
          </div>
        )}
        
        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/80 rounded-md flex flex-col justify-end p-4 transition-opacity duration-300">
            <h3 className="font-semibold text-white mb-2 text-sm leading-tight">{title}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-500 font-semibold text-xs">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
              <span className="text-gray-400 text-xs">
                {movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4)}
              </span>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => onVideoPlay({ ...movie, video })}
                className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
              >
                <Play className="w-3 h-3 text-black fill-current" />
              </button>
              <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                <Plus className="w-3 h-3 text-white" />
              </button>
              <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors ml-auto">
                <ChevronDown className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Content Row Component
export const ContentRow = ({ title, movies, onVideoPlay }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 960; // 5 movies worth
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [movies]);

  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 px-4 md:px-16">
        {title}
      </h2>
      
      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
        
        {/* Movies Container */}
        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 md:px-16 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onVideoPlay={onVideoPlay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Content Rows Component
export const ContentRows = ({ onVideoPlay }) => {
  const [contentData, setContentData] = useState({
    trending: [],
    popular: [],
    topRated: [],
    actionMovies: [],
    comedyMovies: [],
    horrorMovies: [],
    tvShows: []
  });

  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        const [
          trendingRes,
          popularRes,
          topRatedRes,
          actionRes,
          comedyRes,
          horrorRes,
          tvShowsRes
        ] = await Promise.all([
          fetch(`${TMDB_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`),
          fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`),
          fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`),
          fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28`),
          fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35`),
          fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27`),
          fetch(`${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`)
        ]);

        const [
          trending,
          popular,
          topRated,
          action,
          comedy,
          horror,
          tvShows
        ] = await Promise.all([
          trendingRes.json(),
          popularRes.json(),
          topRatedRes.json(),
          actionRes.json(),
          comedyRes.json(),
          horrorRes.json(),
          tvShowsRes.json()
        ]);

        setContentData({
          trending: trending.results || [],
          popular: popular.results || [],
          topRated: topRated.results || [],
          actionMovies: action.results || [],
          comedyMovies: comedy.results || [],
          horrorMovies: horror.results || [],
          tvShows: tvShows.results || []
        });
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchAllContent();
  }, []);

  return (
    <div className="pb-16">
      <ContentRow title="Trending Now" movies={contentData.trending} onVideoPlay={onVideoPlay} />
      <ContentRow title="Popular Movies" movies={contentData.popular} onVideoPlay={onVideoPlay} />
      <ContentRow title="Top Rated" movies={contentData.topRated} onVideoPlay={onVideoPlay} />
      <ContentRow title="Action Movies" movies={contentData.actionMovies} onVideoPlay={onVideoPlay} />
      <ContentRow title="Comedy Movies" movies={contentData.comedyMovies} onVideoPlay={onVideoPlay} />
      <ContentRow title="Horror Movies" movies={contentData.horrorMovies} onVideoPlay={onVideoPlay} />
      <ContentRow title="TV Shows" movies={contentData.tvShows} onVideoPlay={onVideoPlay} />
    </div>
  );
};

// Search Results Component
export const SearchResults = ({ results, query, onVideoPlay }) => {
  return (
    <div className="pt-24 px-4 md:px-16 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">
        Search results for "{query}"
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {results.map((item) => (
          <MovieCard 
            key={item.id} 
            movie={item} 
            onVideoPlay={onVideoPlay}
          />
        ))}
      </div>
      
      {results.length === 0 && (
        <div className="text-center text-gray-400 mt-16">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
};

// Video Modal Component
export const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  const youtubeUrl = video.video?.key 
    ? `https://www.youtube.com/embed/${video.video.key}?autoplay=1&rel=0`
    : null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="bg-black rounded-lg overflow-hidden">
          {youtubeUrl ? (
            <iframe
              src={youtubeUrl}
              title={video.title || video.name}
              className="w-full h-96 md:h-96"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-96 md:h-96 bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No trailer available</p>
                <p className="text-white font-semibold mt-2">{video.title || video.name}</p>
              </div>
            </div>
          )}
          
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              {video.title || video.name}
            </h3>
            <p className="text-gray-300 mb-4">{video.overview}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>★ {video.vote_average?.toFixed(1)}</span>
              <span>{video.release_date?.slice(0, 4) || video.first_air_date?.slice(0, 4)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};