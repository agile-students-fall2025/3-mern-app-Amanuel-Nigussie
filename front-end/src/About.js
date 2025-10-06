import React, { useEffect, useState } from "react";
import "./About.css";

export default function About() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const API = process.env.REACT_APP_API_URL || "http://localhost:5002";
    fetch(`${API}/api/about`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then(setData)
      .catch(setErr);
  }, []);

  if (err) return <main className="about">Failed to load About.</main>;
  if (!data) return <main className="about">Loading…</main>;

  return (
    <main className="about">
      <h1>{data.title}</h1>
      <div className="sub">{data.name}</div>
      <img src={data.image} alt={data.name} />
      {Array.isArray(data.paragraphs) && data.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
    </main>
  );
}
