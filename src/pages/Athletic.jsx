// src/pages/Athletic.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/** Reusable background carousel for full-bleed sections */
function BackgroundCarousel({
  images,               // [{ url, pos? }]
  interval = 5000,      // ms
  wrapperClass,         // e.g., "hero-slides" or "team-bg"
  slideClass,           // e.g., "hero-slide" or "frame"
  dotsClass = 'dots',   // default dots container class
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Respect user's reduced motion preference: no auto-advance
  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (reducedMotion || paused || images.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval, paused, reducedMotion]);

  function go(n) {
    setIndex((n + images.length) % images.length);
  }

  return (
    <>
      <div
        className={wrapperClass}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        {images.map((img, i) => (
          <div
            key={img.url + i}
            className={`${slideClass} ${i === index ? 'active' : ''}`}
            style={{
              backgroundImage: `url('${img.url}')`,
              ...(img.pos ? { backgroundPosition: img.pos } : {}),
            }}
            role="group"
            aria-label={`Slide ${i + 1} of ${images.length}`}
          />
        ))}
      </div>

      <div className={dotsClass} aria-label="Select slide">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </>
  );
}

export default function Athletic() {
  useEffect(() => { document.title = 'Athletics — Yehonatan Ezra'; }, []);
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.getAttribute('data-theme');
    html.setAttribute('data-theme', 'dark');
    return () => html.setAttribute('data-theme', prev || 'light');
  }, []);

  /* Add athletic-page class to body */
  useEffect(() => {
    document.body.classList.add("athletic-page");
    return () => document.body.classList.remove("athletic-page");
  }, []);

  const heroImages = [
    { url: `${import.meta.env.BASE_URL}photos/athletic/athletic3.jpg`, pos: 'center 20%' },
    { url: `${import.meta.env.BASE_URL}photos/athletic/athletic5.jpg` },
    { url: `${import.meta.env.BASE_URL}photos/athletic/athletic1.jpg` },
    { url: `${import.meta.env.BASE_URL}photos/athletic/athletic8.jpg` },
    { url: `${import.meta.env.BASE_URL}photos/athletic/athletic6.jpg`, pos: 'center 30%' },
    { url: `${import.meta.env.BASE_URL}photos/athletic/athletic7.jpg` },
  ];

  const teamImages = [
    { url: `${import.meta.env.BASE_URL}photos/athletic/Huji1.jpg`, pos: 'center 90%' },
    { url: `${import.meta.env.BASE_URL}photos/athletic/Huji2.jpg` },
    { url: `${import.meta.env.BASE_URL}photos/athletic/Huji4.jpg`, pos: 'top' },
  ];

  return (
    <div>
      <header>
        <div className="container nav">
          <Link className="brand" to="/" aria-label="Back to home">Back</Link>
          <nav className="nav-links">
            <a href="tel:0546473490" aria-label="Call Yehonatan">(+972) 054-647-3490</a>
            <span className="sep">•</span>
            <a href="mailto:yonzra12@gmail.com" aria-label="Email Yehonatan">yonzra12@gmail.com</a>
            <span className="sep">•</span>
            <a href="https://www.linkedin.com/in/yehonatanezra/" aria-label="LinkedIn">LinkedIn</a>
            <span className="sep">•</span>
            <a href="https://github.com/YehoanatnEzra/" aria-label="GitHub">Github</a>
          </nav>
        </div>
      </header>

      <main>
        {/* ===== HERO ===== */}
        <section className="hero-wrap" aria-label="Hero slideshow">
          <BackgroundCarousel
            images={heroImages}
            interval={5000}
            wrapperClass="hero-slides"
            slideClass="hero-slide"
            dotsClass="dots"
          />
          <div className="hero-overlay" aria-hidden="true" />

          <div className="hero-inner container">
            <div className="about">
              <h1 style={{ fontSize: 46, lineHeight: 1.1, marginBottom: 12 }}>Competitive runner</h1>
              <p style={{ fontSize: 18 }}>
                My journey as a competitive athlete began about four years ago, and since then I have competed in
                national and international events. <br />
                I represented UBC at the Canadian XC Championships 2024 as part of the winning team. <br />
                Also earned a bronze medal at the Israeli 5K Road Championships in 2025. <br />
                During last semester I also took part in a high-altitude training camp in Iten, Kenya.
              </p>
            </div>
          </div>
        </section>

        {/* ===== TEAM ===== */}
        <section className="team-section" aria-label="University team">
          <BackgroundCarousel
            images={teamImages}
            interval={6000}
            wrapperClass="team-bg"
            slideClass="frame"
            dotsClass="dots"
          />
          <div className="team-overlay" aria-hidden="true" />

          <div className="team-inner container">
            <div className="about">
              <h2 style={{ fontSize: 42, marginBottom: 12 }}>University Running Team</h2>
              <p style={{ fontSize: 18 }}>
                As a student and athlete, I was frustrated by the absence of an active running team at my university,
                so I took the initiative to revive it. <br />
                Today, I coach the team together with Elad Maman, building a strong group culture and guiding athletes
                through all aspects of performance. <br />
                Our philosophy combines academic discipline with professional training, focusing on both individual
                improvement and team achievements. <br />
                The squad competes in road and track races, and has collected several medals at the ASA Games. <br />
                <span style={{ fontWeight: 'bold', fontSize: 17, color: '#ffd700' }}>
                  Free participation for students
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
