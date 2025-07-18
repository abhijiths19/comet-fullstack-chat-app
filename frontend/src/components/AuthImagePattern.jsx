import { useEffect, useRef } from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2,
      alpha: Math.random(),
      speed: 0.003 + Math.random() * 0.003,
    }));

    const shootingStars = [];

    const draw = () => {
      // match your left side color
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, w, h);

      // Draw stars
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

      // Draw and update shooting stars
      shootingStars.forEach((s, i) => {
        s.x += s.vx;
        s.y += s.vy;
        s.length += 1; 
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1.5;
      
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - s.length * s.vx * 0.1,
          s.y - s.length * s.vy * 0.1
        );
        ctx.stroke();
        if (s.x > w || s.y > h) shootingStars.splice(i, 1);
      });

      // Occasionally spawn a new shooting star
      if (Math.random() < 0.01) {
        shootingStars.push({
          x: Math.random() * w,
          y: 0,
          vx: 4 + Math.random() * 4,
          vy: 4 + Math.random() * 4, 
          length: 10,
        });
      }

      requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>

      <div className="relative z-10 max-w-md text-center text-white p-12">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
