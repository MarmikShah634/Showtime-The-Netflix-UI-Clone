# Showtime - The Netflix UI Clone 🎬

A **Netflix-style UI** built with **React**, **TypeScript**, **Redux Toolkit**, **TailwindCSS**, and **Framer Motion**.  
This project is a **frontend-only clone** of Netflix, designed to explore dynamic UIs, state management, and API integration using real movie data from TMDb.

---

## Features ✨

- 🌟 Browse movies by category: Popular, Top Rated, Upcoming, Now Playing
- ⭐ Add or remove movies from **My List** using an interactive star button
- 🔎 Search movies seamlessly
- 💫 Trending movies carousel with smooth animations
- 🎨 Fully responsive, clean, and animated UI
- 🔒 Login page with protected routes
- 🚀 Quick navigation to movie details

---

## Tech Stack 🛠️

- **Frontend:** React, TypeScript, TailwindCSS, Framer Motion, React Router  
- **State Management:** Redux Toolkit  
- **API:** [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)  
- **Other:** React Slick (Carousel), Lucide React (Icons)

---

## Installation & Setup ⚡

1. Clone the repository:  
```bash
git clone https://github.com/your-username/showtime-netflix-ui.git
cd showtime-netflix-ui
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root and add your TMDb API key:
```bash
VITE_TMDB_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser


## Folder Structure 📂

```
src/
├─ assets/
├─ components/
│  ├─ Header.tsx
│  ├─ Hero.tsx
│  ├─ MovieCard.tsx
│  ├─ MovieRow.tsx
│  ├─ ProtectedRoute.tsx
│  └─ Spinner.tsx
├─ pages/
│  ├─ Home.tsx
│  ├─ Login.tsx
│  ├─ MovieDetail.tsx
│  ├─ MyList.tsx
│  └─ SearchResults.tsx
├─ store/
│  ├─ authSlice.ts
│  ├─ moviesSlice.ts
│  ├─ store.ts
│  └─ hooks.ts
├─ App.tsx
├─ main.tsx
└─ index.css
```