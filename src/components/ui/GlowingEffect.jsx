// src/components/ui/GlowingEffect.jsx
import React, { memo, useCallback, useEffect, useRef } from "react";
import { animate } from "motion";

/**
 * Lightweight border glow that orbits toward the pointer.
 * Drop it as the FIRST child inside any card with position:relative.
 */
export const GlowingEffect = memo(function GlowingEffect({
  // strong, visible defaults
  blur = 10,
  inactiveZone = 0.6,
  proximity = 8,
  spread = 40,
  borderWidth = 2,
  movementDuration = 0.9,
  className = "",
}) {
  const ref = useRef(null);
  const last = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const { left, top, width, height } = el.getBoundingClientRect();

      // support mouse + touch
      const getXY = (ev) => {
        if (!ev) return { x: last.current.x, y: last.current.y };
        if (typeof ev.clientX === "number") return { x: ev.clientX, y: ev.clientY };
        if (ev.touches && ev.touches[0]) return { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
        return { x: last.current.x, y: last.current.y };
      };

      const { x: mx, y: my } = getXY(e);
      if (e) last.current = { x: mx, y: my };

      const cx = left + width * 0.5;
      const cy = top + height * 0.5;
      const dist = Math.hypot(mx - cx, my - cy);
      const inactiveR = 0.5 * Math.min(width, height) * inactiveZone;

      if (dist < inactiveR) {
        el.style.setProperty("--ge-active", "0");
        return;
      }

      const inside =
        mx > left - proximity &&
        mx < left + width + proximity &&
        my > top - proximity &&
        my < top + height + proximity;

      el.style.setProperty("--ge-active", inside ? "1" : "0");

      // gradient focal point in %
      const gx = Math.max(0, Math.min(100, ((mx - left) / width) * 100));
      const gy = Math.max(0, Math.min(100, ((my - top) / height) * 100));
      el.style.setProperty("--ge-gx", `${gx}%`);
      el.style.setProperty("--ge-gy", `${gy}%`);

      if (!inside) return;

      const current = parseFloat(el.style.getPropertyValue("--ge-start")) || 0;
      const target = (180 * Math.atan2(my - cy, mx - cx)) / Math.PI + 90;
      const diff = ((target - current + 180) % 360) - 180;

      animate(current, current + diff, {
        duration: movementDuration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => el.style.setProperty("--ge-start", String(v)),
      });
    });
  }, [inactiveZone, proximity, movementDuration]);

  useEffect(() => {
    const onScroll = () => handleMove();
    const onPointer = (ev) => handleMove(ev);
    const onTouch = (ev) => handleMove(ev);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.addEventListener("pointermove", onPointer, { passive: true });
    document.body.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("pointermove", onPointer);
      document.body.removeEventListener("touchmove", onTouch);
    };
  }, [handleMove]);

  return (
    <div
      ref={ref}
      className={`glowing-effect ${className}`}
      style={{
        "--ge-blur": `${blur}px`,
        "--ge-spread": spread,
        "--ge-start": "0",
        "--ge-active": "0",
        "--ge-border": `${borderWidth}px`,
        "--ge-times": "5",
        "--ge-gx": "50%",
        "--ge-gy": "50%",
      }}
    />
  );
});
