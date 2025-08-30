import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToMyList, removeFromMyList } from "../store/moviesSlice";
import type { RootState } from "../store/store";
import Spinner from "../components/Spinner";

const API_KEY = `${import.meta.env.VITE_TMDB_API_KEY}`;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/original";

const MovieDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const myList = useSelector((state: RootState) => state.movies.myList);
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const isInList = myList.some((m) => m.id === movie?.id);

  const toggleMyList = () => {
    if (!movie) return;
    if (isInList) {
      dispatch(removeFromMyList(movie.id));
    } else {
      dispatch(addToMyList(movie));
    }
  };

  if (loading || !movie)
    return (
      <div className="pt-24 flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className="bg-black min-h-screen text-white p-6 pt-24">
      <motion.img
        src={`${IMG_BASE}${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full max-h-[70vh] object-cover rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-4xl font-extrabold mb-3">{movie.title}</h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          {movie.overview}
        </p>
        <p className="mb-2">
          <span className="font-bold">Release Date:</span> {movie.release_date}
        </p>
        <p className="mb-6">
          <span className="font-bold">Rating:</span>{" "}
          {movie.vote_average?.toFixed(1)} ⭐
        </p>

        <motion.button
          onClick={toggleMyList}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-colors font-semibold shadow-lg flex items-center gap-2"
        >
          <span className="text-2xl">{isInList ? "★" : "☆"}</span>
          {isInList ? "In My List" : "Add to My List"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default MovieDetail;
