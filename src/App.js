import "./styles.css";
import NavBarHeader from "./layout/NavBarHeader";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import AllNewsPage from "./pages/AllNewsPage";
import BookmarksPage from "./pages/BookmarksPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <div>
      <NavBarHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/news" element={<AllNewsPage />} /> */}
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/article/*" element={<ArticleDetailPage />} />
        <Route path="/search/*" element={<SearchPage />} />
      </Routes>
      <footer className="footer"></footer>
    </div>
  );
}
