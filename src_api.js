// Simple Open Library client helpers

const BASE = "https://openlibrary.org";

export async function searchBooks(q, page = 1, limit = 20, filter = "all") {
  const offset = (page - 1) * limit;
  const params = new URLSearchParams({
    q: q,
    limit: String(limit),
    offset: String(offset)
  });

  // filter logic: add 'has_fulltext=true' for ebooks (Open Library uses 'has_fulltext' param)
  if (filter === "ebooks") params.set("has_fulltext", "true");

  // If filter === 'text' we could try to exclude fulltext ebooks, but API doesn't provide a
  // neat exclude param — keep simple: send query with no has_fulltext for 'text'.

  const url = `${BASE}/search.json?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`OpenLibrary API error: ${res.status}`);
  }
  const data = await res.json();
  return data;
}

export function coverUrlFromDoc(doc, size = "M") {
  // prefer cover_i; fallback to ISBN if available
  if (doc.cover_i) {
    return `https://covers.openlibrary.org/b/id/${doc.cover_i}-${size}.jpg`;
  }
  if (doc.isbn && doc.isbn.length) {
    return `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-${size}.jpg`;
  }
  // placeholder (data URI or external small placeholder)
  return `https://via.placeholder.com/128x190?text=No+Cover`;
}
