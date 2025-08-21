// src/pages/Resume.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Resume() {
  useEffect(() => { document.title = "Resume — Yehonatan Ezra"; }, []);
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.getAttribute("data-theme");
    html.setAttribute("data-theme", "dark");
    return () => html.setAttribute("data-theme", prev || "light");
  }, []);

  return (
    <div className="resume-page">
      <header className="resume-header">
        <div className="container nav">
          <Link className="brand" to="/" aria-label="Back to home">← Back</Link>
          <nav className="nav-links">
            <a className="btn-secondary" href="/Yehonatan_Ezra.pdf" target="_blank" rel="noopener">
              Open PDF in new tab
            </a>
            <a className="btn" href="/Yehonatan_Ezra.pdf" download>
              Download PDF
            </a>
          </nav>
        </div>
      </header>

      <main className="resume-main">
        <section className="container">
          {/* “Paper” look with the resume text verbatim */}
          <article className="resume-paper" aria-label="Resume content">
            <header className="resume-top">
              <h1>Yehonatan Ezra</h1>
              <p>Jerusalem, Israel 9061200 • +972-54-637-4390</p>
              <p>
                <a href="mailto:yonzra12@gmail.com">yonzra12@gmail.com</a> • Portfolio •{" "}
                <a href="https://linkedin.com/in/yehonatanezra" target="_blank" rel="noopener">linkedin.com/in/yehonatanezra</a> •{" "}
                <a href="https://github.com/YehoanatnEzra" target="_blank" rel="noopener">github.com/YehoanatnEzra</a>
              </p>
            </header>

            <section className="resume-section">
              <h2>Summary</h2>
              <p>
                Computer Science student at Hebrew University of Jerusalem with strong coding skills in C/C++, Python, Java.
                Creative and motivated with problem-solving, interpersonal skills. Independent collaborator committed to
                inventing solutions under pressure. Former IDF Navy deputy commander, where I led a 12-person team in high-pressure
                situations. Currently combining my academic ambitions with competitive athletics as a long-distance runner.
              </p>
            </section>

            <section className="resume-section">
              <h2>Education</h2>
              <ul>
                <li>
                  <strong>B.Sc. in Computer Science, Hebrew University of Jerusalem</strong> — Expected 2026<br />
                  GPA: 88. Key Courses: Discrete Math (100), Nand to Tetris (94), Data Structures (95), Databases (91),
                  Algorithms(88), Control and Learning (89), Cybersecurity (pass). Machine Learning &amp; Data Science &amp; Computer Vision 3D (in progress).
                </li>
                <li>
                  <strong>University of British Columbia</strong> — Semester abroad as Hebrew University representative. 09/2024–01/2025
                </li>
              </ul>
            </section>

            <section className="resume-section">
              <h2>Technical Skills</h2>
              <ul>
                <li><strong>Languages:</strong> Python, C/C++, Bash, Java, JavaScript, SQL.</li>
                <li><strong>Infrastructure &amp; Tooling:</strong> Linux, Git, Docker, CI/CD, Cloud, LLMs.</li>
                <li><strong>Cybersecurity &amp; Networking:</strong> AES, CBC, CTR, ECC, DH, RSA, IPsec, SSH, TCP/UDP.</li>
                <li><strong>OS:</strong> User-level threads, Synchronization primitives (mutex, semaphore, barrier), Signals, Virtual Memory.</li>
                <li><strong>ML &amp; Data:</strong> scikit-learn, Pandas, NumPy, ML pipelines for classification, regression, clustering.</li>
              </ul>
            </section>

            <section className="resume-section">
              <h2>Projects</h2>

              <h3>Secure VPN - Encrypted Messaging System (Python, Cryptography) — <a href="https://github.com/YehoanatnEzra/Secure_VPN" target="_blank" rel="noopener">GitHub</a></h3>
              <ul>
                <li>Engineered a secure VPN protocol over UDP from scratch, ensuring confidentiality, integrity, and authentication.</li>
                <li>Architected the protocol using Diffie-Hellman ratcheting for forward secrecy and per-message key rotation.</li>
                <li>Implemented AES-CBC + HMAC-SHA256 with replay protection and freshness validation.</li>
                <li>Developed a reliable transport layer with a custom ACK mechanism to overcome packet loss and delays.</li>
                <li>Built GUI client/server with MITM proxy to test replay, delay, drop, and tampering resilience.</li>
              </ul>

              <h3>Job Scanner - Resume Tailoring Module (Python, Flask, APIs) — <a href="https://github.com/YehoanatnEzra/Job_Scanner" target="_blank" rel="noopener">GitHub</a></h3>
              <ul>
                <li>Designed and implemented the Job Scanner module that aggregates job postings from five public APIs.</li>
                <li>Reverse-engineered a hidden Airtable APIs to access raw listings.</li>
                <li>Built a multithreaded aggregation engine with caching for high-performance querying.</li>
                <li>Integrated as part of a broader platform that tailors resumes to job descriptions using LLMs.</li>
              </ul>

              <h3>User-Level Thread Library (C++, Linux, Signals) — <a href="https://github.com/YehoanatnEzra/System_Level_Computing_Projects/tree/main/User-Level%20Thread%20Management%20Library" target="_blank" rel="noopener">GitHub</a></h3>
              <ul>
                <li>Implemented a user-level threading library with preemptive round-robin scheduling using SIGVTALRM.</li>
                <li>Built custom TCBs, independent stacks, and context switching via sigsetjmp/siglongjmp.</li>
                <li>Added support for thread creation, sleep, blocking, resuming, and safe termination with race-free signal masking.</li>
              </ul>
            </section>

            <section className="resume-section">
              <h2>Professional Experience</h2>
              <p><strong>Cyber Education Center, Instructor</strong> — 06/2025–Present</p>
              <ul>
                <li>Provided mentorship to high school students in computer science and cybersecurity fundamentals.</li>
              </ul>
              <p><strong>Private Tutor for Calculus, Hebrew University of Jerusalem</strong> — 10/2021–02/2022</p>
              <p>Provided one-on-one tutoring in infinitesimal calculus for Hebrew University students.</p>
              <p><strong>Deputy Commander of Shaldag-class Warship, IDF - Israel Navy</strong> — 02/2017–11/2019</p>
              <ul>
                <li>Led a 12-person team in high-risk maritime operations, maintaining critical systems under pressure.</li>
                <li>Completed the Commanders’ Course, focusing on leadership and tactical decision-making.</li>
              </ul>
            </section>

            <section className="resume-section">
              <h2>Extracurricular</h2>
              <p><strong>Athlete, Competitive runner</strong> — 09/2022–Present</p>
              <ul>
                <li>Represented UBC XC Team - 1st Place, 2024 Canadian XC Championship.</li>
                <li>Competing in Israel National Championships (1,500m–10k).</li>
              </ul>
              <p><strong>Hebrew University Running Team</strong> — 09/2024–Present</p>
              <ul>
                <li>Founded and coached the university’s long-distance running team, mentoring student athletes.</li>
              </ul>
            </section>

            <section className="resume-section">
              <h2>Volunteer</h2>
              <ul>
                <li><strong>Etgarim</strong> — Supported athletes with disabilities in adaptive sports, honing teamwork skills. 01/2020–09/2021</li>
                <li><strong>Scouts</strong> — Guided youth with special needs, organized camps &amp; skill workshops. 09/2014–07/2016</li>
              </ul>
            </section>

            {/* (Optional) Links footnote to mirror PDF footer */}
            <footer className="resume-foot">
              <p>
                <a href="mailto:yonzra12@gmail.com">yonzra12@gmail.com</a> •{" "}
                <a href="https://yehoanatnezra.github.io/Portfolio/" target="_blank" rel="noopener">https://yehoanatnezra.github.io/Portfolio/</a> •{" "}
                <a href="https://linkedin.com/in/yehonatanezra" target="_blank" rel="noopener">linkedin.com/in/yehonatanezra</a> •{" "}
                <a href="https://github.com/YehoanatnEzra" target="_blank" rel="noopener">github.com/YehoanatnEzra</a>
              </p>
            </footer>
          </article>
        </section>
      </main>

      <footer className="resume-footer">
        © <span>{new Date().getFullYear()}</span> Yehonatan Ezra • Resume
      </footer>
    </div>
  );
}
