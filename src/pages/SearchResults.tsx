import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store/store";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import { motion } from "framer-motion";
import { clearSearch } from "../store/moviesSlice";
import { useNavigate } from "react-router-dom";

const SearchResults: React.FC = () => {
  const { searchResults, loading, error } = useSelector(
    (state: RootState) => state.movies
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    dispatch(clearSearch());
    navigate("/");
  };

  if (loading) return <Spinner />;
  if (error)
    return (
      <motion.p
        className="text-red-500 text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {error}
      </motion.p>
    );

  return (
    <div className="pt-24 px-6 text-white min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Search Results
        </motion.h2>
        <button
          onClick={handleBack}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white"
        >
          ← Back to Home
        </button>
      </div>

      {searchResults.length === 0 ? (
        <motion.p
          className="text-gray-400 text-lg text-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          No results found.
        </motion.p>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {searchResults.map((movie) => (
            <motion.div
              key={movie.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                show: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchResults;
