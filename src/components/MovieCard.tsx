import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToMyList, removeFromMyList } from "../store/moviesSlice";
import { useNavigate } from "react-router-dom";
import { type RootState } from "../store/store";

interface Movie {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
}

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myList = useSelector((state: RootState) => state.movies.myList);

  if (!movie) return null;

  const isInList = myList.some((m) => m.id === movie.id);

  const toggleMyList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInList) {
      dispatch(removeFromMyList(movie.id));
    } else {
      dispatch(addToMyList(movie));
    }
  };

  return (
    <motion.div
      key={movie.id}
      className="relative cursor-pointer min-w-[150px]"
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name || "Movie"}
        className="rounded-lg shadow-lg"
      />

      <button
        onClick={toggleMyList}
        className="absolute top-2 right-2 text-2xl text-yellow-400 drop-shadow-lg z-20"
      >
        {isInList ? "★" : "☆"}
      </button>

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-center p-2 rounded-lg pointer-events-none"
      >
        <p className="pointer-events-auto">{movie.title || movie.name}</p>
      </motion.div>
    </motion.div>
  );
};

export default MovieCard;
