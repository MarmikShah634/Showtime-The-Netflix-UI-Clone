import React, { useState } from "react";
import { logout } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { searchMovies, clearSearch } from "../store/moviesSlice";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);

    if (query.trim() === "") {
      dispatch(clearSearch());
      return;
    }

    dispatch(searchMovies(query));
    navigate(`/search?query=${query}`);
  };

  return (
    <header className="fixed top-0 w-full flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent z-50">
      <h1
        className="text-red-600 text-3xl font-extrabold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Netflix
      </h1>

      {user && (
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search"
            className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
          />

          <button
            onClick={() => {
              setSearch("");
              navigate("/my-list");
            }}
            className="ml-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:from-red-500 hover:to-red-700 transition transform"
          >
            My List
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition-all shadow-md"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
