import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

interface MovieRowProps {
  title: string;
  movies: any[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      rowRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>

      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full"
      >
        <ChevronLeft size={28} className="text-white" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full"
      >
        <ChevronRight size={28} className="text-white" />
      </button>

      <motion.div
        ref={rowRef}
        className="flex gap-4 overflow-x-hidden overflow-y-hidden scrollbar-hide scroll-smooth"
      >
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </motion.div>
    </div>
  );
};

export default MovieRow;
