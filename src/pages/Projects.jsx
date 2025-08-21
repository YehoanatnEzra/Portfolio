// src/pages/Projects.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

/** Projects data
 *  - Added `type: 'Hackathon'` category
 *  - Moved Cancer project into Hackathon and removed "Hackathon" from its language tags
 */
const PROJECTS = [
  {
    title: 'Secure VPN',
    type: 'Personal',
    tags: ['Python', 'Cybersecurity', 'Networking protocols'],
    description:
      'Engineered a secure VPN between client and server using Diffie-Hellman key exchange and AES-CBC encryption with HMAC authentication. The system mitigates man-in-the-middle, delay, and replay attacks.',
    code: 'https://github.com/YehoanatnEzra/Secure_VPN',
    img: '/photos/vpn.png',
    details: `Engineered a secure VPN system from scratch in Python, enabling fully encrypted communication over an unreliable transport layer (UDP).
The system guarantees forward secrecy using an ephemeral Diffie-Hellman ratcheting scheme, and protects against replay, delay, and man-in-the-middle attacks.
Each message includes a new public key, allowing both parties to evolve their shared secrets per message.
Reliability is enforced using a custom ACK protocol that ensures delivery, despite the unreliable medium.

Key Features:
- End-to-end encryption using AES-CBC with HMAC for authentication.
- Ephemeral Diffie–Hellman over ECC (P-256) with per-message key rotation.
- Nonce validation for freshness and replay protection.
- Minimal GUI client (Tkinter) + reliable server (socket API).
- Tested against MITM, replay, and packet drop scenarios.`
  },
  
  {
    title: 'Job Scanner',
    type: 'Personal',
    tags: ['Python', 'HTML'],
    description:
      'A job aggregation tool that pulls listings from multiple APIs, including a non-documented Airtable source (Goonzile). Parsed hidden URLs and dynamic headers from HTML and JavaScript to access raw data.',
    code: 'https://github.com/YehoanatnEzra/Job_Scanner',
    img: '/photos/hackaton.jpg',
    details: `Implemented the Job Scanner module - a job search engine that aggregates listings from multiple public APIs and a hidden Airtable source.
Designed the logic to query, normalize, and filter job data, including handling dynamic headers and hidden endpoints.

Key Features:
- Concurrent fetching from several APIs with caching for performance.
- Parsing and normalization of heterogeneous job listing formats.
- Robust keyword and location filtering with flexible search options.
- Data pipeline designed to be easily integrated into the platform.

This module was developed as part of a larger group project (InternSheep), an AI-powered resume tailoring platform that customizes user resumes based on job descriptions.`
  },
  {
    title: 'Cancer Attributes Prediction',
    type: 'Hackathon', // <- moved here
    tags: ['Python', 'ML', 'Data analysis'], // <- removed "Hackathon" from language tags
    description:
      'Built a machine learning pipeline on EHR data (~60K patients) to predict cancer risk, metastasis, and patient subtypes with a multi-model approach. (Hackathon project)',
    code: 'https://github.com/YehoanatnEzra/Cancer_Attributes_Prediction',
    img: '/photos/cancer.png',
    details: `Built a multi-task ML pipeline on structured EHR data from 60,000 cancer patients to predict metastasis sites, tumor area, and patient subtypes. (Hackathon project)

Key Features:
- Rich feature engineering from 70+ fields (cleaning, embeddings, categorical encoding).
- Models: logistic regression, random forest, gradient boosting with pruning.
- Dimensionality reduction: PCA, t-SNE.
- Clustering: k-means for patient subtype discovery.
- Emphasis on interpretability and clinical relevance through visualization.
- Modular, reusable code for classification, regression, and clustering.`
  },
  {
    title: 'User-Level Thread Library',
    type: 'Academic',
    tags: ['C++', 'OS'],
    description:
      'Implemented a user-level threading library in C++ with preemptive round-robin scheduling, custom thread control blocks (TCBs), and manual context switching via <code>sigsetjmp</code>/<code>siglongjmp</code>. Supports thread creation, initialization, sleep, blocking, resuming, and safe termination - all in user space without kernel involvement.',
    code: 'https://github.com/YehoanatnEzra/System_Level_Projects/tree/main/User-Level%20Thread%20Management%20Library',
    img: '/photos/threads.png',
    details: `Implemented a C++ user-level threading library with manual context switching, timer-based preemptive scheduling, and full lifecycle management.
Runs entirely in user space with no kernel dependencies.

Key Features:
- Round-robin scheduling using SIGVTALRM and setitimer.
- Context switching via sigsetjmp/siglongjmp, with manual SP/PC injection.
- Custom Thread Control Block (TCB) with independent stacks.
- Thread operations: spawn, sleep, block, resume, terminate.
- Signal masking for race-free context switches.
- Comprehensive stress tests simulating concurrent workloads.`
  },
  {
    title: 'Research - Evolution of Color Naming Systems',
    type: 'Academic',
    tags: ['Python', 'Reaserch'],
    description:
      'Simulated the evolution of human color naming systems using the Information Bottleneck framework and replicator dynamics.',
    code: 'https://github.com/YehoanatnEzra/Evolution_of_Color_Naming_Systems',
    img: '/photos/colors_project.png',
    details: `Reserch Project - Extended the Information Bottleneck framework of Zaslavsky et al. (2018) to simulate evolution of human color naming systems under different environments.

Key Features:
- Implemented replicator dynamics for language population adaptation.
- Tested coding strategies: random assignment, k-means clustering, real-world categories.
- Simulated environmental contexts: forest, urban, shore, sunset.
- Tracked dynamics of color category emergence and stabilization.
- Compared results with empirical linguistic data.`
  },
  {
    title: 'Collision Course Detection - 3D project',
    type: 'Academic',
    tags: ['Python', 'Computer Vision 3D'],
    description:
      'Built a computer vision system to detect collision courses from image sequences, combining perspective rectification, trajectory analysis, and geometric cross-ratio checks',
    code: 'https://github.com/YehoanatnEzra/Collision_Course_Detection',
    img: '/photos/computer_vision.png',
    details: `Developed a computer vision project for detecting whether two moving objects are on a collision course from a sequence of images captured by a fixed camera.

The system includes two complementary pipelines:

1. Full CV Pipeline with Rectification:
  - Perspective rectification to normalize camera viewpoint.
  - Manual object tracking across frames.
  - Geometric analysis of distance and angle trends.
  - Collision flagged when angle is consistent and distance decreases steadily.

2. Practical Pipeline (No Rectification):
  - Works directly on raw frames without camera calibration.
  - Linear fit of object trajectories with intersection & time-to-collision estimation.
  - Cross-ratio consistency check across four frames.
  - Outputs collision flag with visual indicator (“Collision Detected” in red or “No Collision” in green).

Key Features:
- Perspective correction and geometric modeling of trajectories.
- Time-to-collision estimation and trajectory intersection analysis.
- Robust cross-ratio validation for real-world camera settings.
- Visualized results on sample image sequences (ships, shoes, etc.).

This project demonstrates applied computer vision and geometry, integrating both theoretical and practical approaches for collision detection.`
  },
  {
    title: 'Needle WhatsApp Crawler',
    type: 'Academic',
    tags: ['Python', 'JavaScript', 'Data Science'],
    description: 'Data collection & analysis pipeline for WhatsApp groups.(still in progress...)',
    code: 'https://github.com/YehoanatnEzra/NeedleWhatsappCrawler',
    img: '/photos/whasapp.png',
    details: 'still in progress...'
  },
  {
    title: 'System Monitor',
    type: 'Personal',
    tags: ['Python', 'Bash', 'Automation'],
    description: 'Monitors CPU/memory/disk and auto-logs via a GitHub Actions (cron-like) workflow.',
    code: 'https://github.com/YehoanatnEzra/System_Monitor',
    img: '/photos/system_monitor.png',
    details: `Mini project for system monitoring with Python and Bash, integrated into GitHub Actions.

Key Features:
- Resource tracking: CPU, memory, disk via psutil.
- Logs to CSV for analysis.
- Color-coded terminal UI.
- Bash wrapper for easy execution.
- Automated cron-like execution using GitHub Actions every 5 minutes.`
  },
  {
    title: 'Nand2Tetris',
    type: 'Academic',
    tags: ['Python', 'HDL', 'assembler'],
    description:
      'Implemented a complete software-hardware system from logic gates to a working computer and compiler as part of the renowned Nand2Tetris course',
    code: 'https://github.com/YehoanatnEzra/Nand2Tetris',
    img: '/photos/nand2tetris.png',
    details: `Full computer system built from NAND gates to OS.

Key Features:
- Logic gates, ALU, CPU, memory modules using HDL.
- Assembler + VM translator.
- Compiler for a simple high-level language.
- Functional OS components.
- Rigorous testing with provided and custom test suites.`
  },
  {
    title: 'Multi-threaded MapReduce Framework',
    type: 'Academic',
    tags: ['C++', 'OS'],
    description:
      'Parallel Map & Reduce phases with work queues and synchronization; scales across threads.',
    code: 'https://github.com/YehoanatnEzra/System_Level_Projects/tree/main/Multi-threaded%20MapReduce%20framework',
    img: '/photos/mapreduce.png',
    details: `Developed a scalable MapReduce framework in C++ with concurrent execution of Map, Shuffle, and Reduce phases across CPU cores.
Optimized for high-throughput data processing.

Key Features:
- Parallel Map, Shuffle, and Reduce stages with mutexes, barriers, and condition variables.
- Custom shuffle algorithm to aggregate intermediate keys efficiently.
- Robust synchronization primitives to avoid race conditions.
- Integrated CI/CD with GitHub Actions for automated testing.
- Validated under heavy load with stress datasets.`
  },
  {
    title: 'OOP Course Projects',
    type: 'Academic',
    tags: ['Java'],
    description:
      'Tic-Tac-Toe tournament, BrickBreaker, ASCII art generator & 2D game - OOP & design patterns.',
    code: 'https://github.com/YehoanatnEzra/Oop-Huji',
    img: '/photos/oop.jpg',
    details: `Academic projects from HUJI’s OOP course demonstrating encapsulation, inheritance, polymorphism.

Key Projects:
- Tic Tac Toe (MVC, Swing GUI).
- Bricker (arcade-style game with power-ups and levels).
- ASCII Art generator (image → text).
- 2D tile-based adventure game (map engine, enemies, collectibles).`
  }
];

/** Filter chips data */
const LANGUAGE_TAGS = ['Python', 'C++', 'Java', 'Bash'];
const TYPE_TAGS = ['Academic', 'Personal', 'Hackathon'];

export default function Projects() {
  // Page title & theme handling
  useEffect(() => { document.title = 'Projects — Yehonatan Ezra'; }, []);
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.getAttribute('data-theme');
    html.setAttribute('data-theme', 'dark');
    return () => html.setAttribute('data-theme', prev || 'light');
  }, []);

  const [query, setQuery] = useState('');
  const [active, setActive] = useState(new Set(LANGUAGE_TAGS));
  const [types, setTypes] = useState(new Set(TYPE_TAGS)); // all selected by default
  const [selected, setSelected] = useState(null); // modal state

  /** Toggle language chip */
  function toggleTag(tag) {
    setActive(prev => {
      const s = new Set(prev);
      s.has(tag) ? s.delete(tag) : s.add(tag);
      return s;
    });
  }

  /** Toggle type chip */
  function toggleType(tag) {
    setTypes(prev => {
      const s = new Set(prev);
      s.has(tag) ? s.delete(tag) : s.add(tag);
      return s;
    });
  }

  /** Combined filtering: text + language tags + type tags */
  const filtered = useMemo(() => {
    const text = query.toLowerCase().trim();
    return PROJECTS.filter(p => {
      const txtOk = !text || (p.title + ' ' + p.description).toLowerCase().includes(text);
      const langOk = active.size === 0 || [...active].some(tag => p.tags.includes(tag));
      const typeOk = types.size === 0 || types.has(p.type);
      return txtOk && langOk && typeOk;
    });
  }, [query, active, types]);

  // Close modal on ESC
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setSelected(null); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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

      <main className="container">
        <h1>My personal and academic Projects</h1>
        <p className="muted">
          I have developed a range of projects, from academic work to personal initiatives, each showcasing my curiosity and technical skills.
        </p>

        <div className="toolbar">
          {/* Search */}
          <div className="search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <input
              type="search"
              placeholder="Search projects by name or description…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          {/* Language chips */}
          <div className="filters" aria-label="Language filters">
            {LANGUAGE_TAGS.map(t => (
              <button
                key={t}
                type="button"
                className={'chip chip--lang ' + (active.has(t) ? 'active' : '')}
                aria-pressed={active.has(t) ? 'true' : 'false'}
                onClick={() => toggleTag(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Type chips */}
          <div className="filters" aria-label="Type filters">
            {TYPE_TAGS.map(t => (
              <button
                key={t}
                type="button"
               className={
                          `chip chip--type ` +
                          (t === 'Academic' ? 'is-academic ' : t === 'Personal' ? 'is-personal ' : 'is-hackathon ') +
                          (types.has(t) ? 'active' : '')
                        }

                aria-pressed={types.has(t) ? 'true' : 'false'}
                onClick={() => toggleType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div id="grid" className="grid" aria-live="polite">
          {filtered.map(p => (
            <article className="card" key={p.title}>
              <div className={`thumb ${p.img ? '' : 'fallback'}`}>
                <img
                  src={p.img || 'https://picsum.photos/seed/placeholder/1200/800'}
                  alt={`Preview for ${p.title}`}
                  loading="lazy"
                />
              </div>

              <div className="content">
                {/* Language badge(s) */}
                <span className="badge">{p.tags.join(' • ')}</span>

                {/* Type badge - visually distinct, Hackathon highlighted */}
               <span
              className={
                'badge badge--type ' +
                (p.type === 'Academic' ? 'badge--academic' :
                p.type === 'Personal' ? 'badge--personal' :
                                        'badge--hackathon')
              }
              style={{ marginLeft: 8 }}
            >
              {p.type}
            </span>


                <h3>{p.title}</h3>
                {/* thread description includes <code> => render safely as HTML snippet */}
                <p dangerouslySetInnerHTML={{ __html: p.description }} />

                <div className="actions">
                  <a className="btn-secondary" href={p.code} target="_blank" rel="noopener noreferrer">Code</a>
                  <button className="btn" onClick={() => setSelected(p)}>More details</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty">No projects match your filters yet.</div>
        )}
      </main>

      <footer>© <span>{new Date().getFullYear()}</span> Yehonatan Ezra • Projects</footer>

      {/* Modal */}
      {selected && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
        >
          <div
            className="modal-content"
            style={{ background: 'var(--panel)', color: 'var(--text)', padding: 24, borderRadius: 12, maxWidth: 700, boxShadow: 'var(--shadow)', maxHeight: '80vh', overflow: 'auto' }}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close details"
              className="close"
              style={{ float: 'right', fontSize: 24, cursor: 'pointer', background: 'transparent', border: 'none', color: 'var(--text)' }}
            >
              &times;
            </button>
            <h2 id="modal-title" style={{ marginTop: 0 }}>{selected.title}</h2>
            <div style={{ whiteSpace: 'pre-line' }}>
              {selected.details || 'תיאור יתווסף בקרוב'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
