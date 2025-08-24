import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GlowingEffect } from "../../components/ui/GlowingEffect/GlowingEffect";


export default function Home() {
  // Page title + force light theme
  useEffect(() => {
    document.title = "Yehonatan Ezra — Portfolio";
  }, []);
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.getAttribute("data-theme");
    html.setAttribute("data-theme", "light");
    return () => html.setAttribute("data-theme", prev || "light");
  }, []);

  // Page flag for CSS
  useEffect(() => {
    document.body.classList.add("home-page");
    return () => document.body.classList.remove("home-page");
  }, []);

  // Background images
  const desktopImages = useMemo(
    () => [
      `${import.meta.env.BASE_URL}photos/backgrounds/background1.jpg`,
      `${import.meta.env.BASE_URL}photos/backgrounds/background2.jpg`,
      `${import.meta.env.BASE_URL}photos/backgrounds/background3.jpg`,
      `${import.meta.env.BASE_URL}photos/backgrounds/background4.jpg`,
    ],
    []
  );

  const mobileImages = useMemo(
    () => [
      `${import.meta.env.BASE_URL}photos/backgrounds/mobile_background1.jpg`,
      `${import.meta.env.BASE_URL}photos/backgrounds/mobile_background2.jpg`,
      `${import.meta.env.BASE_URL}photos/backgrounds/mobile_background3.jpg`,
      `${import.meta.env.BASE_URL}photos/backgrounds/mobile_background4.jpg`,
    ],
    []
  );

  // One-time mobile check (no need to react to resize for this use-case)
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia
      ? window.matchMedia("(max-width: 768px)").matches
      : window.innerWidth <= 768;
  }, []);

  const images = isMobile ? mobileImages : desktopImages;

  const [bgIndex, setBgIndex] = useState(0);
  const [bgIsPortraitMobile, setBgIsPortraitMobile] = useState(false);
  const [currentBg, setCurrentBg] = useState("");
  const [prevBg, setPrevBg] = useState(null); // for crossfade

  // Preload
  useEffect(() => {
    [...desktopImages, ...mobileImages].forEach((src) => {
      const i = new Image();
      i.src = src;
    });
  }, [desktopImages, mobileImages]);

  // Choose + measure background
  useEffect(() => {
    const src = images[bgIndex];
    setPrevBg((curr) => (currentBg && currentBg !== src ? currentBg : null));
    setCurrentBg(src);

    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const isPortrait = img.naturalHeight > img.naturalWidth;
      setBgIsPortraitMobile(isPortrait && isMobile);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [bgIndex, images, isMobile, currentBg]);

  // Skills carousel
  const skillsRef = useRef(null);
  const scrollByAmount = 420;
  const scrollLeft = () =>
    skillsRef.current?.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  const scrollRight = () =>
    skillsRef.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" });

  // Click glow (CSS-first; adds a short-lived overlay for non-bg/scroll buttons)
  const createClickGlow = (e) => {
    const button = e.currentTarget;
    button.classList.add("click-burst");
    setTimeout(() => button.classList.remove("click-burst"), 800);

    if (button.classList.contains("bg-btn") || button.classList.contains("scroll-btn")) {
      return; // keep those shapes crisp
    }

    const existing = button.querySelector(".click-glow");
    if (existing) existing.remove();

    const glow = document.createElement("div");
    glow.className = "click-glow";
    glow.style.cssText = `
      position:absolute; inset:-4px; border-radius:inherit; pointer-events:none; z-index:-1;
      background:radial-gradient(circle at 50% 50%, rgba(6,182,212,0.8), rgba(139,92,246,0.6) 40%, transparent 70%);
      animation: clickGlowBurst 0.8s ease-out forwards; box-shadow:0 0 20px rgba(6,182,212,0.5);
    `;
    button.style.position = "relative";
    button.style.overflow = "visible";
    button.appendChild(glow);
    setTimeout(() => glow.remove(), 800);
  };

  return (
    <div>
      {/* Background underlay */}
      <div
        className="home-bg-underlay"
        style={{ backgroundImage: currentBg ? `url('${currentBg}')` : undefined }}
        aria-hidden="true"
      />
      {/* Current background layer */}
      <div
        key={currentBg || "bg"}
        className={`home-bg-layer current${bgIsPortraitMobile ? " portrait-mobile" : ""}`}
        style={{ backgroundImage: currentBg ? `url('${currentBg}')` : undefined }}
        aria-hidden="true"
      />
      {/* Previous background fading out */}
      {prevBg && (
        <div
          className="home-bg-layer bg-fade-prev"
          style={{ backgroundImage: `url('${prevBg}')` }}
          aria-hidden="true"
        />
      )}

      {/* Background cycle control (top-right) */}
      <button
        className="bg-btn bg-cycle"
        aria-label="Change background photo"
        onClick={(e) => {
          if (e.shiftKey) setBgIndex((i) => (i - 1 + images.length) % images.length);
          else setBgIndex((i) => (i + 1) % images.length);
          createClickGlow(e);
        }}
        title="Click: next photo | Shift+Click: previous photo"
      >
        ›
      </button>

      {/* Header */}
      <header>
        <div className="container nav">
          <div className="container topbar">
            <div className="bar">
              <Link className="brand" to="/athletic" aria-label="Go to Athletics">
                Athletics
              </Link>
              <Link className="brand" to="/projects" aria-label="Go to Projects">
                Projects
              </Link>
              <Link className="brand" to="/resume" aria-label="Go to Resume">
                Resume
              </Link>
            </div>

            <nav className="nav-contacts">
              <a href="tel:0546473490" aria-label="Call Yehonatan">
                054-647-3490
              </a>
              <span className="sep">•</span>
              <a href="mailto:yonzra12@gmail.com" aria-label="Email Yehonatan">
                yonzra12@gmail.com
              </a>
              <span className="sep">•</span>
              <a href="https://www.linkedin.com/in/yehonatanezra/" target="_blank" rel="noopener">
                LinkedIn
              </a>
              <span className="sep">•</span>
              <a href="https://github.com/YehoanatnEzra" target="_blank" rel="noopener">
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Photo credit */}
      <div className="bg-credit">
        These photos were taken during my exchange semester at UBC, while hiking in the Rockies.
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="inner">
          <div className="headline">
            <div className="headline-title">
              <img
                src={`${import.meta.env.BASE_URL}photos/profile/profil.jpg`}
                alt="Profile"
                loading="eager"
              />
              <h1>Hi, I'm Yehonatan</h1>
            </div>

            <p className="tagline">
              <strong>CS student</strong> • <strong>Software Engineer</strong> • <strong>Athlete</strong>
            </p>

            <div id="about" className="about">
              <h2>About me</h2>
              <p>
                Computer Science student at the Hebrew University of Jerusalem and Cybersecurity Instructor in the
                Mamriot program, with a strong passion for both technology and athletics. Before my studies, I served
                as Deputy Commander of a Shaldag-class Warship in the Israeli Navy, where I gained leadership and
                operational experience under pressure.
              </p>
              <p>
                I have a strong foundation in software engineering and I love building products end-to-end. This year,
                I completed a semester at the University of British Columbia (UBC) in Vancouver, Canada, as part of a
                student exchange program.
              </p>
              <p>
                In addition to my studies, I am a competitive long-distance &amp; XC runner and coach. I revived the
                Hebrew University's running team and continue to lead it today. As an athlete, I placed third in the
                5k road Israeli National Championships 2025 and was part of the team that won the Canadian Cross
                Country National Championship.
              </p>
              <p>
                • Experienced with Python, C, C++, Java, Bash and more.<br />• Particularly interested in low-level
                systems, Cybersecurity, AI, and ML.
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
            {/* Athletic Journey */}
            <div className="qcard glow-card">
              <GlowingEffect />
              <div className="card-inner">
                <h3 className="h3-reset">My Athletic Journey</h3>
                <div className="row-between">
                  <p className="para-reset flex-1" title="My journey as a long distance runner and coach.">My journey as a long distance runner and coach.</p>
                  <div className="btn-group">
                    <Link to="/athletic" className="pill pill--ghost" aria-label="Explore Athletics" onClick={createClickGlow}>
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="qcard glow-card">
              <GlowingEffect />
              <div className="card-inner">
                <h3 className="h3-reset">Explore my projects</h3>
                <div className="row-between">
                  <p className="para-reset flex-1" title="A collection of personal and academic projects.">A collection of personal and academic projects.</p>
                  <div className="btn-group">
                    <Link to="/projects" className="pill pill--ghost" aria-label="Explore Projects" onClick={createClickGlow}>
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume */}
            <div className="qcard glow-card">
              <GlowingEffect />
              <div className="card-inner">
                <h3 className="h3-reset">My Resume</h3>
                <div className="row-between">
                  <p className="para-reset flex-1" title="Click to view my resume:">Click to view my resume:</p>
                  <div className="btn-group">
                    <Link to="/resume" className="pill pill--ghost" aria-label="Open résumé page" onClick={createClickGlow}>
                      Open
                    </Link>
                    <a
                      href="/Yehonatan_Ezra.pdf"
                      download
                      className="pill pill--white"
                      aria-label="Download PDF résumé"
                      onClick={createClickGlow}
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
            <button
              className="scroll-btn left"
              aria-label="Scroll left"
              onClick={(e) => {
                scrollLeft();
                createClickGlow(e);
              }}
            >
              ‹
            </button>

            <div className="skill-track" ref={skillsRef}>
              <article className="skill-card glow-card">
                <GlowingEffect />
                <h3>Languages</h3>
                <ul>
                  <li>Python</li>
                  <li>C/C++</li>
                  <li>Java</li>
                  <li>Bash</li>
                  <li>SQL</li>
                  <li>HTML, CSS, JavaScript</li>
                </ul>
              </article>

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

            <button
              className="scroll-btn right"
              aria-label="Scroll right"
              onClick={(e) => {
                scrollRight();
                createClickGlow(e);
              }}
            >
              ›
            </button>
          </div>
        </section>
      </main>

      <footer>
        Written by Yehonatan Ezra • Built with JavaScript, React, and CSS
      </footer>
    </div>
  );
}
