import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import MovieRow from "../components/MovieRow";
import Spinner from "../components/Spinner";
import { fetchMovies } from "../store/moviesSlice";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_KEY = `${import.meta.env.VITE_TMDB_API_KEY}`;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/original";

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/80 rounded-full"
  >
    <ChevronRight size={32} className="text-white" />
  </button>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/80 rounded-full"
  >
    <ChevronLeft size={32} className="text-white" />
  </button>
);

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { moviesByCategory, loading, error } = useSelector(
    (state: RootState) => state.movies
  );
  const [bannerMovies, setBannerMovies] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchMovies("popular"));
    dispatch(fetchMovies("top_rated"));
    dispatch(fetchMovies("upcoming"));
    dispatch(fetchMovies("now_playing"));

    const fetchBanner = async () => {
      const res = await fetch(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
      );
      const data = await res.json();
      setBannerMovies(data.results.slice(0, 6));
    };
    fetchBanner();
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error)
    return <p className="text-red-500 text-center mt-10 text-lg">{error}</p>;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <motion.div
      className="pt-24 px-0 md:px-6 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {bannerMovies.length > 0 && (
        <div className="relative w-full h-[70vh] overflow-hidden">
          <Slider {...sliderSettings} className="h-full">
            {bannerMovies.map((movie) => (
              <div key={movie.id} className="relative w-full h-[70vh]">
                <img
                  src={`${IMG_BASE}${movie.backdrop_path}`}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="relative z-10 p-10 max-w-3xl h-full flex flex-col justify-center">
                  <h1 className="text-5xl font-extrabold mb-4 text-gray-300">
                    {movie.title}
                  </h1>
                  <p className="text-gray-300 text-lg line-clamp-3 mb-6">
                    {movie.overview}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-colors font-semibold shadow-lg w-fit text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      data-icon="PlayStandard"
                      aria-hidden="true"
                      className="mr-2"
                    >
                      <path
                        d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="text-lg">Watch Now</span>
                  </motion.button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Movie Rows */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
          },
        }}
        className="space-y-10 px-6"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <MovieRow title="🔥 Popular" movies={moviesByCategory["popular"]} />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <MovieRow
            title="⭐ Top Rated"
            movies={moviesByCategory["top_rated"]}
          />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <MovieRow title="🎬 Upcoming" movies={moviesByCategory["upcoming"]} />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <MovieRow
            title="📺 Now Playing"
            movies={moviesByCategory["now_playing"]}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
