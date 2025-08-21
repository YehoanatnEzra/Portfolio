// src/pages/Projects.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlowingEffect } from '../components/ui/GlowingEffect';
import { LampHeader, LampTitle } from '../components/ui/LampHeader';

/**
 * Projects page
 * ----------------------------------------------------
 * Displays a filterable gallery of project cards with:
 *  - Language / technology filters (multi-select)
 *  - Type filters (Academic, Personal, Hackathon)
 *  - Animated lamp header + glow effect
 *  - Modal for extended project details
 *
 * NOTE: Only formatting & documentation improvements applied.
 *       Business logic and data are unchanged intentionally.
 */

/**
 * @typedef {Object} Project
 * @property {string} title
 * @property {string} type         One of TYPE_TAGS
 * @property {string[]} tags       Technologies / categories
 * @property {string} description  Short blurb shown on the card
 * @property {string} code         Repository / source link
 * @property {string} img          Image URL (optional)
 * @property {string} details      Long-form markdown / text for modal
 */

/** @type {Project[]} */
const PROJECTS = [
  {
    title: 'Secure VPN',
    type: 'Personal',
    tags: ['Python', 'Cybersecurity', 'Networking'],
    description: 'Engineered a secure VPN between client and server using Diffie-Hellman key exchange and AES-CBC encryption with HMAC authentication. The system mitigates man-in-the-middle, delay, and replay attacks.',
    code: 'https://github.com/YehoanatnEzra/Secure_VPN',
    img: `${import.meta.env.BASE_URL}photos/projects/vpn.png`,
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
    description: 'A job aggregation tool that pulls listings from multiple APIs, including a non-documented Airtable source. Parsed hidden URLs and dynamic headers from HTML and JavaScript to access raw data.',
    code: 'https://github.com/YehoanatnEzra/Job_Scanner',
    img: `${import.meta.env.BASE_URL}photos/projects/hackaton.jpg`,
    details:`Implemented the Job Scanner module - a job search engine that aggregates listings from multiple public APIs and a hidden Airtable source.

            Designed the logic to query, normalize, and filter job data, including handling dynamic headers and hidden endpoints.

            Key Features:
            - Concurrent fetching from several APIs with caching for performance.
            - Parsing and normalization of heterogeneous job listing formats.
            - Robust keyword and location filtering with flexible search options.
            - Data pipeline designed to be easily integrated into the platform.

            This module was developed as part of a larger group project (InternSheep), an AI-powered resume tailoring platform that customizes user resumes based on job descriptions.`
  },
  {
    title: 'Portfolio Website',
    type: 'Personal',
    tags: ['React', 'JavaScript', 'CSS'],
    description: 'Personal portfolio website showcasing projects, athletic achievements, and professional experience built with React.',
    code: 'https://github.com/YehoanatnEzra/Portfolio',
    img: `${import.meta.env.BASE_URL}photos/projects/portfolio_web.jpg`,
    details:`A modern, responsive portfolio website built from scratch to showcase my work and achievements.

            Key Features:
            - Responsive design optimized for desktop and mobile
            - Interactive project showcase with filtering system
            - Athletic achievements and running statistics
            - Professional resume integration
            - Background carousel with custom navigation
            - Smooth animations and transitions
            - Modern UI with gradient styling and glass effects

            Technical Implementation:
            - Built with React and modern JavaScript
            - Modular CSS architecture for maintainability
            - Custom components and reusable UI elements
            - Responsive design with mobile-first approach
            - Performance optimized with image preloading

            This portfolio demonstrates proficiency in:
            - Frontend development with React
            - Responsive web design principles
            - Modern CSS techniques and animations
            - User experience and interface design
            - Performance optimization strategies`
  },
  {
    title: 'Cancer Attributes Prediction',
    type: 'Hackathon', // moved here
    tags: ['Python', 'ML', 'Data analysis'],
    description: 'Built a machine learning pipeline on EHR data (~60K patients) to predict cancer risk, metastasis, and patient subtypes with a multi-model approach. (Hackathon project)',
    code: 'https://github.com/YehoanatnEzra/Cancer_Attributes_Prediction',
    img: `${import.meta.env.BASE_URL}photos/projects/cancer.png`,
    details:`Group project (Hackathon).
            We developed a multi-task ML pipeline on a large, anonymized real-world EHR dataset (~60K cancer patient records) provided by the Hebrew University. The dataset’s real-world scale (already de-identified) enabled us to test ideas beyond small public toy datasets.

            The system predicts metastasis sites, tumor area, and patient subtypes through complementary models and advanced feature engineering.

            Key Features:
            - Feature engineering from clinical fields (cleaning, embeddings, categorical encoding, imputation).
            - Supervised models: Logistic Regression, Random Forest, Gradient Boosting with pruning & early stopping.
            - Dimensionality reduction: PCA, t-SNE for visualization and exploration.
            - Clustering: k-means for patient subtype discovery.
            - Strong emphasis on interpretability and clinical relevance via visualizations.
            - Modular, reusable codebase supporting classification, regression, and clustering tasks.`
  },
  {
    title: 'User-Level Thread Library',
    type: 'Academic',
    tags: ['C++', 'OS'],
    description: 'Implemented a user-level threading library in C++ with preemptive round-robin scheduling, custom thread control blocks (TCBs), and manual context switching via <code>sigsetjmp</code>/<code>siglongjmp</code>. Supports thread creation, initialization, sleep, blocking, resuming, and safe termination - all in user space without kernel involvement.',
    code: 'https://github.com/YehoanatnEzra/System_Level_Projects/tree/main/User-Level%20Thread%20Management%20Library',
    img: `${import.meta.env.BASE_URL}photos/projects/threads.png`,
    details:`Implemented a C++ user-level threading library with manual context switching, timer-based preemptive scheduling, and full lifecycle management.
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
    description: 'Simulated the evolution of human color naming systems using the Information Bottleneck framework and replicator dynamics.',
    code: 'https://github.com/YehoanatnEzra/Evolution_of_Color_Naming_Systems',
    img: `${import.meta.env.BASE_URL}photos/projects/colors_project.png`,
      details:`Research Project - Extended the Information Bottleneck (Zaslavsky et al., 2018) to study how human-like color lexicons emerge and adapt to their environment. Our pipeline couples evolutionary simulations with human data to map the accuracy–complexity trade-off in color naming.

              Key Features:
              - Evolutionary dynamics: replicator (optional mutator) over generations to track category emergence and stabilization.
              - Encoder strategies: Random baseline vs. Soft-KMeans with temperature control to trace IB frontiers.
              - Environments: uniform, beach, forest, urban, and sunset-showing how context shifts optimal boundaries.
              - Human benchmark: 50 participants labeling 330 CIELAB chips across 11 basic terms; used for validation and confusion analysis.
              - Systematic sweeps: lexicon sizes and temperature grids, plots summarize fitness and agreement with human labels.`
},
  {
    title: 'Collision Course Detection - 3D project',
    type: 'Academic',
    tags: ['Python', 'Computer Vision 3D'],
    description: 'Built a computer vision system to detect collision courses from image sequences, combining perspective rectification, trajectory analysis, and geometric cross-ratio checks',
    code: 'https://github.com/YehoanatnEzra/Collision_Course_Detection',
    img: `${import.meta.env.BASE_URL}photos/projects/computer_vision.png`,
    details:`Developed a computer vision project for detecting whether two moving objects are on a collision course from a sequence of images captured by a fixed camera.

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
    img: `${import.meta.env.BASE_URL}photos/projects/whasapp.png`,
    details: 'still in progress...'
  },
  {
    title: 'System Monitor',
    type: 'Personal',
    tags: ['Python', 'Bash', 'Automation'],
    description: 'Monitors CPU/memory/disk and auto-logs via a GitHub Actions (cron-like) workflow.',
    code: 'https://github.com/YehoanatnEzra/System_Monitor',
    img: `${import.meta.env.BASE_URL}photos/projects/system_monitor.png`,
    details:`Mini project for system monitoring with Python and Bash, integrated into GitHub Actions.

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
    description: 'Implemented a complete software-hardware system from logic gates to a working computer and compiler as part of the renowned Nand2Tetris course',
    code: 'https://github.com/YehoanatnEzra/Nand2Tetris',
    img: `${import.meta.env.BASE_URL}photos/projects/nand2tetris.png`,
    details:`Full computer system built from NAND gates to OS.

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
    description: 'Parallel Map & Reduce phases with work queues and synchronization,scales across threads.',
    code: 'https://github.com/YehoanatnEzra/System_Level_Projects/tree/main/Multi-threaded%20MapReduce%20framework',
    img: `${import.meta.env.BASE_URL}photos/projects/mapreduce.png`,
    details:`Developed a scalable MapReduce framework in C++ with concurrent execution of Map, Shuffle, and Reduce phases across CPU cores.

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
    description: 'Four Java projects: Tic-Tac-Toe Tournament, BrickBreaker, ASCII Art Generator, and a 2D Adventure Game - demonstrating OOP principles and design patterns.',
     code: 'https://github.com/YehoanatnEzra/Oop-Huji',
    img: `${import.meta.env.BASE_URL}photos/projects/oop.jpg`,
    details: `Academic projects written in Java as part of HUJI's OOP course, illustrating encapsulation, inheritance, polymorphism, and classic design patterns.

      Key Projects:
      - Tic-Tac-Toe Tournament: Modular implementation with MVC architecture and Strategy pattern for different AI players.
      - BrickBreaker: Arcade-style game with power-ups and dynamic levels, built on DanoGameLab 1.1.0.
      - ASCII Art Generator: Image-to-text converter with adjustable resolution, custom character sets, and multiple output formats.
      - 2D Adventure Game: Tile-based world with interactive objects, using Observer and Factory Method patterns for dynamic behavior.

      This repository highlights:
      - Solid Java programming and clean OOP design
      - Application of design patterns in real projects
      - Hands-on experience with GUI/game libraries (DanoGameLab)`

  }
];

/** Filter chips data */
const LANGUAGE_TAGS = ['Python', 'C', 'C++', 'Java', 'React'];
const TYPE_TAGS = ['Academic', 'Personal', 'Hackathon'];

export default function Projects() {
  // Title & theme (dark forced for this page)
  useEffect(() => { document.title = 'Projects — Yehonatan Ezra'; }, []);
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.getAttribute('data-theme');
    html.setAttribute('data-theme', 'dark');
    return () => html.setAttribute('data-theme', prev || 'light');
  }, []);

  // Add page-scoped body class (styling hook)
  useEffect(() => {
    document.body.classList.add('projects-page');
    return () => document.body.classList.remove('projects-page');
  }, []);

  const [active, setActive] = useState(new Set(LANGUAGE_TAGS));      // Selected language tags
  const [types, setTypes] = useState(new Set(TYPE_TAGS));            // Selected type tags
  const [selected, setSelected] = useState(null);                    // Active project 

  /** Toggle a language/technology chip */
  function toggleTag(tag) {
    setActive(prev => {
      const s = new Set(prev);
      s.has(tag) ? s.delete(tag) : s.add(tag);
      return s;
    });
  }

  /** Toggle a type chip (Academic / Personal / Hackathon) */
  function toggleType(tag) {
    setTypes(prev => {
      const s = new Set(prev);
      s.has(tag) ? s.delete(tag) : s.add(tag);
      return s;
    });
  }

  /** Combined filtering predicate (memoized) */
  const filtered = useMemo(() => {
    return PROJECTS.filter(p => {
      const langOk = active.size === 0 || [...active].some(tag => p.tags.includes(tag));
      const typeOk = types.size === 0 || types.has(p.type);
      return langOk && typeOk;
    });
  }, [active, types]);

  // Close modal on ESC key
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setSelected(null); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div>
      <header>
        <div className="container nav">
          <div className="brand-group">
            <Link className="brand" to="/" aria-label="Back to home">Home</Link>
            <Link className="brand" to="/athletic" aria-label="Go to Athletic page">Athletic</Link>
            <Link className="brand" to="/resume" aria-label="Go to Resume page">Resume</Link>
          </div>
          <nav className="nav-links">
            <a href="tel:0546473490" aria-label="Call Yehonatan">054-647-3490</a>
            <span className="sep">•</span>
            <a href="mailto:yonzra12@gmail.com" aria-label="Email Yehonatan">yonzra12@gmail.com</a>
            <span className="sep">•</span>
            <a href="https://www.linkedin.com/in/yehonatanezra/" aria-label="LinkedIn">LinkedIn</a>
            <span className="sep">•</span>
            <a href="https://github.com/YehoanatnEzra/" aria-label="GitHub">Github</a>
          </nav>
        </div>
      </header>

      {/* Lamp Effect Header */}
      <LampHeader>
        <LampTitle>
          My Projects
        </LampTitle>
        <p className="lamp-subtitle">
          I have developed a range of projects, from academic work to personal initiatives, 
          each showcasing my <span className="highlight">curiosity</span> and <span className="highlight">technical skills</span>.
        </p>
      </LampHeader>

      <main className="container">
        <div className="toolbar">
          <div className="filters-container">
            <div className="filter-section">
              <div className="filters filters--primary" aria-label="Project type filters">
                {TYPE_TAGS.map(t => {
                  const base = 'chip chip--type chip--primary ';
                  const variant = t === 'Academic' ? 'is-academic ' : t === 'Personal' ? 'is-personal ' : 'is-hackathon ';
                  const state = types.has(t) ? 'active' : '';
                  return (
                    <button
                      key={t}
                      type="button"
                      className={base + variant + state}
                      aria-pressed={types.has(t) ? 'true' : 'false'}
                      onClick={() => toggleType(t)}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="filter-section">
              <div className="filters filters--secondary" aria-label="Technology filters">
                {LANGUAGE_TAGS.map(t => {
                  const selected = active.has(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      className={'chip chip--lang chip--secondary ' + (selected ? 'active' : '')}
                      aria-pressed={selected ? 'true' : 'false'}
                      onClick={() => toggleTag(t)}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div id="grid" className="grid" aria-live="polite">
          {filtered.map(p => (
            <article className="card glow-card" key={p.title}>
              <GlowingEffect />
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
                {/* Description with inline 'See more details' action */}
                <p className="description">
                  <span dangerouslySetInnerHTML={{ __html: p.description }} />{' '}
                  <button
                    className="text-link inline-details"
                    onClick={() => setSelected(p)}
                    aria-label={`See more details about ${p.title}`}
                  >See more details</button>
                </p>

                <div className="actions">
                  <a className="btn-secondary" href={p.code} target="_blank" rel="noopener noreferrer">Code</a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty">No projects match your filters yet.</div>
        )}
      </main>

      

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
