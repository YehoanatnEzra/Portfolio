// src/components/ui/LampHeader.jsx
import React, { useRef, useEffect } from 'react';
import { animate } from 'motion';

export function LampHeader({ children, className = "" }) {
  const leftBeamRef = useRef(null);
  const rightBeamRef = useRef(null);
  const titleRef = useRef(null);
  const spotlightRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate beam expansion
          if (leftBeamRef.current) {
            animate(leftBeamRef.current, 
              { opacity: [0.5, 1], width: ["15rem", "30rem"] },
              { duration: 0.8, delay: 0.3, ease: "easeInOut" }
            );
          }
          if (rightBeamRef.current) {
            animate(rightBeamRef.current,
              { opacity: [0.5, 1], width: ["15rem", "30rem"] },
              { duration: 0.8, delay: 0.3, ease: "easeInOut" }
            );
          }
          
          // Animate spotlight
          if (spotlightRef.current) {
            animate(spotlightRef.current,
              { width: ["8rem", "16rem"] },
              { duration: 0.8, delay: 0.3, ease: "easeInOut" }
            );
          }
          
          // Animate title
          if (titleRef.current) {
            animate(titleRef.current,
              { opacity: [0.5, 1], y: [100, 0] },
              { duration: 0.8, delay: 0.3, ease: "easeInOut" }
            );
          }
          
          // Animate subtitle if it exists
          if (containerRef.current) {
            const subtitle = containerRef.current.querySelector('.lamp-subtitle');
            if (subtitle) {
              animate(subtitle,
                { opacity: [0, 1], y: [20, 0] },
                { duration: 0.8, delay: 0.6, ease: "easeInOut" }
              );
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    const elements = [leftBeamRef.current, rightBeamRef.current, titleRef.current].filter(Boolean);
    elements.forEach(el => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`lamp-container ${className}`}>
      <div className="lamp-effect">
        {/* Left conic gradient beam */}
        <div
          ref={leftBeamRef}
          className="lamp-beam lamp-beam-left"
          style={{ opacity: 0.5, width: "15rem" }}
        >
          <div className="lamp-mask lamp-mask-bottom" />
          <div className="lamp-mask lamp-mask-left" />
        </div>

        {/* Right conic gradient beam */}
        <div
          ref={rightBeamRef}
          className="lamp-beam lamp-beam-right"
          style={{ opacity: 0.5, width: "15rem" }}
        >
          <div className="lamp-mask lamp-mask-bottom" />
          <div className="lamp-mask lamp-mask-right" />
        </div>

        {/* Central light source */}
        <div className="lamp-light-source" />
        <div className="lamp-backdrop" />
        <div className="lamp-glow" />

        {/* Animated spotlight width */}
        <div
          ref={spotlightRef}
          className="lamp-spotlight"
          style={{ width: "8rem" }}
        />
      </div>

      {/* Content */}
      <div className="lamp-content">
        {children}
      </div>
    </div>
  );
}

export function LampTitle({ children, className = "" }) {
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && titleRef.current) {
          animate(titleRef.current,
            { opacity: [0.5, 1], y: [100, 0] },
            { duration: 0.8, delay: 0.3, ease: "easeInOut" }
          );
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <h1
      ref={titleRef}
      className={`lamp-title ${className}`}
      style={{ opacity: 0.5, transform: "translateY(100px)" }}
    >
      {children}
    </h1>
  );
}
