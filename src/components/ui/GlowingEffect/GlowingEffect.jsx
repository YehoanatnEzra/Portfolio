import React, { memo, useCallback, useEffect, useRef } from "react";
import { animate } from "motion";

/**
 * A lightweight glowing border effect that orbits toward the pointer.
 * Place it as the FIRST child inside any card with position: relative.
 */
export const GlowingEffect = memo(function GlowingEffect() {
  const ref = useRef(null);
  const last = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  // Internal constants
  const blur = 10;
  const inactiveZone = 0.6;
  const proximity = 8;
  const spread = 40;
  const borderWidth = 2;
  const movementDuration = 0.9;

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const { left, top, width, height } = el.getBoundingClientRect();

      // Handle mouse and touch
      const getXY = (ev) => {
        if (!ev) return last.current;
        if (typeof ev.clientX === "number") return { x: ev.clientX, y: ev.clientY };
        if (ev.touches?.[0]) return { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
        return last.current;
      };

      const { x: mx, y: my } = getXY(e);
      if (e) last.current = { x: mx, y: my };

      const cx = left + width / 2;
      const cy = top + height / 2;
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

      // Gradient focal point in %
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
  }, []);

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
      className="glowing-effect"
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
