"use client";

import { useEffect, useState } from "react";

const WORD = "THE GENESIS";
const TAGLINE = "Women-led band 💛 The Beginning ✨";

const REST_START = 550;
const STAGGER = 45;
const EXIT_AT = 2950;
const REMOVE_AT = 3350;

// Plays once per full page load: the root layout mounts it fresh on every
// hard load/refresh and stays mounted across client-side route changes.
export default function SplashIntro() {
  const [phase, setPhase] = useState<"playing" | "exiting" | "done">(
    "playing"
  );

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => setPhase("exiting"), EXIT_AT);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = prevOverflow;
    }, REMOVE_AT);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (phase === "done") return null;

  const letters = WORD.split("");

  return (
    <div
      aria-hidden="true"
      className={`splash-overlay${phase === "exiting" ? " splash-exiting" : ""}`}
    >
      <div className="splash-grid" />
      <div className="splash-glow" />
      <div className="splash-content">
        <div className="splash-word">
          {letters.map((ch, i) =>
            i === 0 ? (
              // Ring sits beside the letter, not inside it, so it isn't
              // hidden by the letter's own fade/blur-in
              <span key={i} className="splash-first">
                <span className="splash-ring" />
                <span className="splash-letter splash-letter-first">{ch}</span>
              </span>
            ) : (
              <span
                key={i}
                className="splash-letter splash-letter-rest"
                style={{ animationDelay: `${REST_START + (i - 1) * STAGGER}ms` }}
              >
                {ch === " " ? " " : ch}
              </span>
            )
          )}
          <span className="splash-shine-clip">
            <span className="splash-shine" />
          </span>
        </div>
        <p className="splash-tagline">{TAGLINE}</p>
      </div>
    </div>
  );
}
