import { useEffect, useRef } from "react";

const NoChatSelected = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Background stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2,
      alpha: Math.random(),
      speed: 0.003 + Math.random() * 0.003,
    }));

    // Rockets
    const rockets = [];

    const draw = () => {
      // Dark background
      ctx.fillStyle = "#030712"; // bg-gray-950
      ctx.fillRect(0, 0, w, h);

      // Stars
      stars.forEach((star) => {
        star.alpha += star.speed * (Math.random() > 0.5 ? 1 : -1);
        if (star.alpha <= 0) star.alpha = 0;
        if (star.alpha >= 1) star.alpha = 1;

        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Rockets
      rockets.forEach((r, i) => {
        r.y -= r.vy; // move upward
        r.trail += 1;

        // Draw rocket trail
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x, r.y + r.trail * 0.5);
        ctx.stroke();

        // Draw rocket body
        ctx.globalAlpha = 1;
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(r.x, r.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // If rocket goes off screen, remove it
        if (r.y < -20) {
          rockets.splice(i, 1);
        }
      });

      // Occasionally launch a new rocket from random X positions
      if (Math.random() < 0.02) {
        rockets.push({
          x: Math.random() * w,
          y: h + 10, // start below the screen
          vy: 2 + Math.random() * 1.5, // speed upward
          trail: 0,
        });
      }

      requestAnimationFrame(draw);
    };

    draw();

    // Resize handler
    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center relative overflow-hidden bg-base-100/50">
      {/* Canvas background with rockets */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>

      {/* Foreground content */}
      <div className="relative z-10 max-w-md text-center space-y-6 p-16">
        {/* Animated Icons */}
        <div className="flex justify-center gap-3 mb-4 text-3xl animate-bounce">
          <span>✧˖°.</span>
          <span>✧˖°.</span>
          <span>✧˖°.</span>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-white">Welcome to Comet.</h2>
        <p className="text-base-content/60">
          Chats that blaze like shooting stars. Pick someone to connect with!
        </p>

        {/* Typing animation effect */}
        <p className="text-xs text-base-content/40 font-mono animate-pulse">
          𓇼 Waiting for your first spark… 𓇼
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
