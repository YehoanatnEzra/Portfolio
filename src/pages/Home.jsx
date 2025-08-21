// src/pages/Home.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlowingEffect } from '../components/ui/GlowingEffect';

export default function Home() {
  // Page title + force light theme
  useEffect(() => { document.title = 'Yehonatan Ezra — Portfolio'; }, []);
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.getAttribute('data-theme');
    html.setAttribute('data-theme', 'light');
    return () => html.setAttribute('data-theme', prev || 'light');
  }, []);

  const isCoarsePointer = useMemo(
    () => typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(pointer: coarse)").matches
      : false,
    []
  );

  /* Add body overlay class only on Home */
  useEffect(() => {
    document.body.classList.add("home-has-bg", "home-page");
    return () => document.body.classList.remove("home-has-bg", "home-page");
  }, []);

  /** Background carousel (body background) */
  const images = useMemo(() => ([
    '/photos/background1.jpg',
    '/photos/background2.jpg',
    '/photos/background3.jpg',
    '/photos/background4.jpg',
  ]), []);
  const [bgIndex, setBgIndex] = useState(0);
  const prevBodyBg = useRef('');

  // Preload images
  useEffect(() => {
    images.forEach(src => { const i = new Image(); i.src = src; });
  }, [images]);

  // Apply selected background
  useEffect(() => {
    const body = document.body;
    if (!prevBodyBg.current) prevBodyBg.current = body.style.background;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const bg = `url('${images[bgIndex]}') center top / cover no-repeat${isIOS ? '' : ' fixed'}`;
    body.style.background = bg;
    return () => { body.style.background = prevBodyBg.current; };
  }, [bgIndex, images]);

  /** Skills carousel (horizontal scroll) */
  const skillsRef = useRef(null);
  const scrollByAmount = 420; // px per click
  const scrollLeft = () => skillsRef.current?.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
  const scrollRight = () => skillsRef.current?.scrollBy({ left: scrollByAmount, behavior: 'smooth' });

  /** Create temporary glow effect on button click */
  const createClickGlow = (e) => {
    const button = e.currentTarget;
    
    // Method 1: CSS class approach (more reliable)
    button.classList.add('click-burst');
    setTimeout(() => button.classList.remove('click-burst'), 800);
    
    // Debug: temporary background change to confirm it's working
    const originalBg = button.style.background;
    button.style.background = 'rgba(6,182,212,0.8)';
    setTimeout(() => {
      button.style.background = originalBg;
    }, 200);
    
    // Method 2: DOM element approach (backup)
    const existingGlow = button.querySelector('.click-glow');
    if (existingGlow) existingGlow.remove();
    
    const glow = document.createElement('div');
    glow.className = 'click-glow';
    glow.style.cssText = `
      position: absolute; inset: -4px; border-radius: inherit; pointer-events: none; z-index: -1;
      background: radial-gradient(circle at 50% 50%, rgba(6,182,212,0.8), rgba(139,92,246,0.6) 40%, transparent 70%);
      animation: clickGlowBurst 0.8s ease-out forwards;
      box-shadow: 0 0 20px rgba(6,182,212,0.5);
    `;
    button.style.position = 'relative';
    button.style.overflow = 'visible';
    button.appendChild(glow);
    
    setTimeout(() => glow.remove(), 800);
  };

  /** Shared inline styles (keep cards aligned & symmetric) */
  const cardInner = { display: 'flex', flexDirection: 'column', gap: 8, height: '100%' };
  const h3Style = { margin: 0 }; // same top for all cards
  const rowBetween = {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: 12, flexWrap: 'wrap'
  };
  const btnGroup = { display: 'flex', gap: 10, flexShrink: 0 };

  const pillBase = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '10px 14px', borderRadius: 12, fontWeight: 700,
    border: '1px solid rgba(255,255,255,.35)',
    backdropFilter: 'blur(8px)', textDecoration: 'none',
    boxShadow: '0 2px 10px rgba(0,0,0,.25)', cursor: 'pointer'
  };
  const pillAccent = {
    ...pillBase,
    background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
    color: '#fff', border: '1px solid transparent'
  };
  const pillWhite = {
    ...pillBase,
    background: '#ffffff', color: '#0b1324', border: '1px solid rgba(0,0,0,.08)'
  };
  const pillGhost = {
    ...pillBase,
    background: 'rgba(0,0,0,.28)', color: '#fff'
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="container nav">
          <div className="container topbar">
            <div className="bar">
              <Link className="brand" to="/athletic" aria-label="Go to Athletics">Athletics</Link>
              <Link className="brand" to="/projects" aria-label="Go to Projects">Projects</Link>
             <Link className="brand" to="/resume" aria-label="Go to Resume">Resume</Link>

            </div>

            <nav className="nav-contacts">
              <span className="contact-inline"> </span>
                <a href="tel:0546473490" aria-label="Call Yehonatan">054-647-3490</a>
                <span className="sep">•</span>
                <a href="mailto:yonzra12@gmail.com" aria-label="Email Yehonatan">yonzra12@gmail.com</a>
             
              <span className="sep">•</span>
              <a href="https://www.linkedin.com/in/yehonatanezra/" target="_blank" rel="noopener">LinkedIn</a>
              
              <span className="sep">•</span>
              
              <a href="https://github.com/YehoanatnEzra" target="_blank" rel="noopener">GitHub</a>
              
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        {/* Background controls */}
        <button className="bg-btn left" aria-label="Previous background"
          onClick={(e) => { setBgIndex(i => (i - 1 + images.length) % images.length); createClickGlow(e); }}>‹</button>
        <button className="bg-btn right" aria-label="Next background"
          onClick={(e) => { setBgIndex(i => (i + 1) % images.length); createClickGlow(e); }}>›</button>

        <div className="bg-credit">
          These photos were taken during my exchange semester at UBC, while hiking in the Rockies.
        </div>

        <div className="inner">
          <div className="headline">
            <div className="headline-title">
              <img src="/photos/profil.jpg" alt="Profile" />
              <h1>Hi, I'm Yehonatan</h1>
            </div>

            <p className="tagline">
              <strong>CS student</strong> • <strong>Software Engineer</strong> • <strong>Athlete</strong>
            </p>

            <div id="about" className="about">
              <h2>About me</h2>
              <p>
                I'm a Computer Science student at the Hebrew University of Jerusalem with a strong passion for both
                technology and athletics. Before my studies, I served as Deputy Commander of a Shaldag-class Warship
                in the Israeli Navy, where I gained leadership and operational experience under pressure.
              </p>
              <p>
                I have a strong foundation in software engineering and I love building products end-to-end. This year,
                I completed a semester at the University of British Columbia (UBC) in Vancouver, Canada, as part of a
                student exchange program.
              </p>
              <p>
                In addition to my studies, I am a competitive long-distance &amp; XC runner and coach. I revived the
                Hebrew University’s running team and continue to lead it today. As an athlete, I placed third in the
                5k road Israeli National Championships 2025 and was part of the team that won the Canadian Cross Country
                National Championship.
              </p>
              <p>
                • Experienced with Python, C, C++, Java, Bash and more.<br />
                • Particularly interested in low-level systems, cybersecurity, AI, and ML.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="container">
        {/* Quick Links */}
        <section id="quick" aria-label="Quick links">
          <div className="quick">
            {/* Athletic Journey — symmetric layout */}
            <div className="qcard glow-card">
              <GlowingEffect />
              <div style={cardInner}>
                <h3 style={h3Style}>My Athletic Journey</h3>
                <div style={rowBetween}>
                  <p style={{ margin: 0, flex: 1 }}>
                    My journey as a long distance runner and coach.
                  </p>
                  <div style={btnGroup}>
                    <Link to="/athletic" style={pillGhost} aria-label="Explore Athletics">
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects — symmetric layout */}
            <div className="qcard glow-card">
              <GlowingEffect />
              <div style={cardInner}>
                <h3 style={h3Style}>Explore my projects</h3>
                <div style={rowBetween}>
                  <p style={{ margin: 0, flex: 1 }}>
                    A collection of personal and academic projects.
                  </p>
                  <div style={btnGroup}>
                    <Link to="/projects" style={pillGhost} aria-label="Explore Projects">
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Résumé — same structure: h3, then text+buttons in one row */}
            <div className="qcard glow-card">
              <GlowingEffect />
              <div style={cardInner}>
                <h3 style={h3Style}>My Resume</h3>
                <div style={rowBetween}>
                  <p style={{ margin: 0, flex: 1}}>
                    Click to view my resume:
                  </p>
                  <div style={btnGroup}>
                    <Link
                      to="/resume"
                      style={pillGhost}
                      aria-label="Open résumé page"
                    >
                      Open
                    </Link>
                    <a
                      href="/Yehonatan_Ezra.pdf"
                      download
                     
                      style={pillWhite}
                      aria-label="Download PDF résumé"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" aria-label="Technical Skills">
          <h2 className="section-title">Technical Skills</h2>
          <div className="scroll-wrap">
            <button className="scroll-btn left" aria-label="Scroll left" 
              onClick={(e) => { scrollLeft(); createClickGlow(e); }}>‹</button>
            <div className="skill-track" ref={skillsRef}>
              {/* Languages */}
              <article className="skill-card glow-card">
                <GlowingEffect />
                <h3>Languages</h3>
                <ul>
                  <li>Python</li>
                  <li>C/C++</li>
                  <li>Java</li>
                  <li>Bash</li>
                  <li>SQL</li>
                  <li>HTML, CSS, JavaScript (basic)</li>
                </ul>
              </article>

              {/* CS Fundamentals */}
              <article className="skill-card glow-card">
                <GlowingEffect />
                <h3>CS Fundamentals</h3>
                <ul>
                  <li>Data structures, algorithms</li>
                  <li>Operating systems, concurrency</li>
                  <li>OOP & design principles</li>
                  <li>Databases & SQL, basic cryptography</li>
                </ul>
              </article>

              {/* Network & Cybersecurity */}
              <article className="skill-card glow-card">
                <GlowingEffect />
                <h3>Network & Cybersecurity</h3>
                <ul>
                  <li>AES-128/256, ChaCha20, RSA, ECC</li>
                  <li>CBC, CTR, (avoid ECB)</li>
                  <li>DH/ECDH, RSA key transport</li>
                  <li>TLS, HTTPS, SSH, IPsec</li>
                  <li>TCP, UDP</li>
                </ul>
              </article>

              {/* Machine Learning */}
              <article className="skill-card glow-card">
                <GlowingEffect />
                <h3>Machine Learning</h3>
                <ul>
                  <li>scikit-learn, NumPy, pandas, matplotlib</li>
                  <li>Random Forest, AdaBoost, SVM, KNN, Logistic Regression</li>
                  <li>PCA, DBSCAN</li>
                  <li>Data preprocessing & experiment design</li>
                </ul>
              </article>

              {/* Operating Systems */}
              <article className="skill-card glow-card">
                <GlowingEffect />
                <h3>Operating Systems</h3>
                <ul>
                  <li>Threads, Processes, Scheduling</li>
                  <li>Mutexes, Semaphores, Condition Variables</li>
                  <li>Kernel vs User Space, System Calls</li>
                  <li>Virtual Memory, Paging</li>
                  <li>Pipes, Sockets, Shared Memory, Signals</li>
                </ul>
              </article>
            </div>
            <button className="scroll-btn right" aria-label="Scroll right" 
              onClick={(e) => { scrollRight(); createClickGlow(e); }}>›</button>
          </div>
        </section>
      </main>

      <footer>© <span>{new Date().getFullYear()}</span> Yehonatan Ezra • Portfolio</footer>
    </div>
  );
}
