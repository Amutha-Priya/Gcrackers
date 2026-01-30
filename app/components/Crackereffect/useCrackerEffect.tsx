"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const useCrackerEffect = () => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;   // prevent duplicate run
    hasRun.current = true;

    let times = 0;

    const interval = setInterval(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.3 },
        colors: ["#ff9800", "#ff5722", "#ffd54f"],
      });

      times++;

      // stop after 10 bursts
      if (times === 10) {
        clearInterval(interval);
      }
    }, 5000); // every 0.4 second

  }, []);
};

export default useCrackerEffect;
