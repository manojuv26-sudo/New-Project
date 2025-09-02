import React from "react";
import { coverUrlFromDoc } from "../api";

export default function BookCard({ doc }) {
  const title = doc.title || "Untitled";
  const authors = doc.author_name ? doc.author_name.join(", ") : "Unknown author";
  const year = doc.first_publish_year || doc.publish_year?.[0] || "—";
  const cover = coverUrlFromDoc(doc, "M");
  const subjects = doc.subject ? doc.subject.slice(0, 4) : [];

  return (
    <article className="card">
      <img className="cover" src={cover} alt={`Cover of ${title}`} loading="lazy" />
      <div className="meta">
        <h3 className="title">{title}</h3>
        <div className="authors">{authors}</div>
        <div className="year">First: {year}</div>
        {subjects.length > 0 && (
          <div className="subjects">
            {subjects.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
        )}
        <a
          className="openlink"
          href={`https://openlibrary.org${doc.key}`}
          target="_blank"
          rel="noreferrer"
        >
          View on OpenLibrary
        </a>
      </div>
    </article>
  );
}
