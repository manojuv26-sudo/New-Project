import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import { searchBooks } from "./api";

export default function App() {
  const [query, setQuery] = useState("react");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [numFound, setNumFound] = useState(0);
  const [filter, setFilter] = useState("all"); // all | text | ebooks

  const pageSize = 20;

  const doSearch = useCallback(
    async (q, p = 1, f = filter) => {
      if (!q || q.trim().length === 0) {
        setBooks([]);
        setNumFound(0);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await searchBooks(q, p, pageSize, f);
        setBooks(data.docs);
        setNumFound(data.numFound || 0);
      } catch (err) {
        console.error(err);
        setError(err.message || "Search failed");
      } finally {
        setLoading(false);
      }
    },
    [filter]
  );

  useEffect(() => {
    doSearch(query, page, filter);
  }, [doSearch, query, page, filter]);

  function onSearch(q) {
    setQuery(q);
    setPage(1);
  }

  function goToPage(p) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Book Finder</h1>
        <p className="subtitle">Search the Open Library catalog — titles, authors, years, covers.</p>
      </header>

      <main className="main">
        <SearchBar onSearch={onSearch} initialQuery={query} />
        <div className="controls">
          <label>
            Filter:
            <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }}>
              <option value="all">All</option>
              <option value="text">Text (print)</option>
              <option value="ebooks">Ebooks only</option>
            </select>
          </label>
        </div>

        <BookList
          books={books}
          loading={loading}
          error={error}
          numFound={numFound}
          page={page}
          pageSize={pageSize}
          onPageChange={goToPage}
        />
      </main>

      <footer className="footer">
        <small>Uses Open Library API · Covers from covers.openlibrary.org</small>
      </footer>
    </div>
  );
}
