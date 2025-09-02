import React, { useState } from "react";

export default function SearchBar({ onSearch, initialQuery = "" }) {
  const [text, setText] = useState(initialQuery);

  function submit(e) {
    e.preventDefault();
    onSearch(text.trim());
  }

  return (
    <form className="searchbar" onSubmit={submit}>
      <input
        aria-label="Search books"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search by title, author, ISBN, subject..."
      />
      <button type="submit">Search</button>
      <button
        type="button"
        className="btn-ghost"
        onClick={() => {
          setText("");
          onSearch("");
        }}
        title="Clear"
      >
        Clear
      </button>
    </form>
  );
}
