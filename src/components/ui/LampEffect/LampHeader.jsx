import React, { useRef, useEffect } from "react";
import { animate } from "motion";

/**
 * Utility: run animation on an element if it exists
 */
function runAnimation(el, keyframes, options) {
  if (el) {
    animate(el, keyframes, options);
  }
}

export function LampHeader({ children, className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || !containerRef.current) return;

        const leftBeam = containerRef.current.querySelector(".lamp-beam-left");
        const rightBeam = containerRef.current.querySelector(".lamp-beam-right");
        const spotlight = containerRef.current.querySelector(".lamp-spotlight");
        const title = containerRef.current.querySelector(".lamp-title");
        const subtitle = containerRef.current.querySelector(".lamp-subtitle");

        // Animate beams
        [leftBeam, rightBeam].forEach((beam) =>
          runAnimation(
            beam,
            { opacity: [0.5, 1], width: ["15rem", "30rem"] },
            { duration: 0.8, delay: 0.3, ease: "easeInOut" }
          )
        );

        // Animate spotlight
        runAnimation(
          spotlight,
          { width: ["8rem", "16rem"] },
          { duration: 0.8, delay: 0.3, ease: "easeInOut" }
        );

        // Animate title
        runAnimation(
          title,
          { opacity: [0.5, 1], y: [100, 0] },
          { duration: 0.8, delay: 0.3, ease: "easeInOut" }
        );

        // Animate subtitle
        runAnimation(
          subtitle,
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.8, delay: 0.6, ease: "easeInOut" }
        );
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`lamp-container ${className}`}>
      <div className="lamp-effect">
        {/* Beams */}
        <div className="lamp-beam lamp-beam-left">
          <div className="lamp-mask lamp-mask-bottom" />
          <div className="lamp-mask lamp-mask-left" />
        </div>
        <div className="lamp-beam lamp-beam-right">
          <div className="lamp-mask lamp-mask-bottom" />
          <div className="lamp-mask lamp-mask-right" />
        </div>

        {/* Static elements */}
        <div className="lamp-light-source" />
        <div className="lamp-backdrop" />
        <div className="lamp-glow" />

        {/* Spotlight */}
        <div className="lamp-spotlight" />
      </div>

      {/* Content */}
      <div className="lamp-content">{children}</div>
    </div>
  );
}

export function LampTitle({ children, className = "" }) {
  return (
    <h1 className={`lamp-title ${className}`} style={{ opacity: 0.5, transform: "translateY(100px)" }}>
      {children}
    </h1>
  );
}
