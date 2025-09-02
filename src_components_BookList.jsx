import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books, loading, error, numFound, page, pageSize, onPageChange }) {
  const totalPages = Math.ceil(numFound / pageSize) || 1;

  return (
    <section className="results">
      {loading && <div className="info">Loading…</div>}
      {error && <div className="error">Error: {error}</div>}
      {!loading && !error && (
        <>
          <div className="summary">
            <strong>{numFound.toLocaleString()}</strong> results
          </div>

          {books.length === 0 ? (
            <div className="empty">No results. Try a different query.</div>
          ) : (
            <div className="grid">
              {books.map((b) => (
                <BookCard key={`${b.key}`} doc={b} />
              ))}
            </div>
          )}

          <div className="pagination">
            <button onClick={() => onPageChange(1)} disabled={page <= 1}>
              « First
            </button>
            <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
              ← Prev
            </button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
              Next →
            </button>
            <button onClick={() => onPageChange(totalPages)} disabled={page >= totalPages}>
              Last »
            </button>
          </div>
        </>
      )}
    </section>
  );
}
