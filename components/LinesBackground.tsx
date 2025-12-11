import React, { useEffect, useRef } from 'react';

interface LinesBackgroundProps {
  className?: string;
  /** Opacidad extra para el canvas */
  canvasOpacity?: number;
}

const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI / 2;

function random(min?: number | number[], max?: number) {
  if (arguments.length === 0) return Math.random();
  if (Array.isArray(min)) {
    return min[Math.floor(Math.random() * min.length)];
  }
  if (typeof min === 'undefined') min = 1;
  if (typeof max === 'undefined') {
    max = (min as number) || 1;
    min = 0;
  }
  return (min as number) + Math.random() * (max - (min as number));
}

const LinesBackground: React.FC<LinesBackgroundProps> = ({
  className = '',
  canvasOpacity = 1,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rawContext = canvas.getContext('2d');
    if (!rawContext) return;
    const ctx: CanvasRenderingContext2D = rawContext;

    const scale = window.devicePixelRatio || 1;
    let lines: Line[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let gradient: CanvasGradient | null = null;
    let animationId: number | null = null;

    // control de FPS
    let lastTime = 0;
    const TARGET_FPS = 30;
    const FRAME_DURATION = 1000 / TARGET_FPS;
    const MAX_LINES = 80; // tope soft de líneas vivas

    class Line {
      x: number;
      y: number;
      path: { x: number; y: number; isAnchor: boolean }[];
      pathLength: number;
      angle: number;
      speed: number;
      target: { x: number; y: number };
      thickness: number;
      maxLength: number;
      hasShadow: boolean;
      decay: number;
      alpha: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.path = [];
        this.pathLength = 0;
        this.angle = 0;
        this.speed = random(1, 4);
        this.target = { x: x + 0.1, y: y + 0.1 };
        this.thickness = Math.round(random(0.5, 3));
        this.maxLength = Math.round(random(100, 350));
        this.hasShadow = this.thickness > 2;
        this.decay = random(0.0075, 0.05);
        this.alpha = 1;
      }

      step() {
        if (this.pathLength >= this.maxLength) {
          this.alpha -= this.decay;
          return;
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        let isAnchor = false;
        const target = this.target;
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.speed) {
          isAnchor = true;
          this.x = target.x;
          this.y = target.y;
          this.steer();
        }

        this.path.push({
          x: this.x,
          y: this.y,
          isAnchor,
        });

        this.pathLength++;
      }

      draw() {
        if (!gradient) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        ctx.strokeStyle = gradient;

        // color suave para el punto inicial
        ctx.fillStyle = '#f97316';

        ctx.beginPath();

        if (this.hasShadow) {
          ctx.shadowOffsetX = 10;
          ctx.shadowOffsetY = 20;
          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(0,0,0,0.25)';
        }

        this.path.forEach((point, i) => {
          ctx[i === 0 ? 'moveTo' : 'lineTo'](point.x, point.y);
        });

        ctx.stroke();

        // círculo en el origen
        if (this.path[0]) {
          ctx.beginPath();
          ctx.arc(this.path[0].x, this.path[0].y, 4, 0, TWO_PI);
          ctx.fill();
          ctx.stroke();
        }

        ctx.restore();
      }

      steer() {
        const distance = random(50, 200);
        const angle = random([-HALF_PI, 0, HALF_PI, -Math.PI]) as number;

        // solo anchors para ahorrar memoria
        this.path = this.path.filter((p) => p.isAnchor === true);

        this.target.x = this.x + Math.cos(angle) * distance;
        this.target.y = this.y + Math.sin(angle) * distance;
        this.angle = angle;
      }
    }

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * scale;
      canvas.height = height * scale;

      // reset transform para no acumular escalados
      ctx.setTransform(scale, 0, 0, scale, 0, 0);

      gradient = ctx.createLinearGradient(width * 0.2, 0, width * 0.8, 0);
      // tonos naranjas
      gradient.addColorStop(0, '#f97316'); // naranja principal
      gradient.addColorStop(1, '#fb923c'); // naranja más suave
    };

    const handleResize = () => {
      window.requestAnimationFrame(resize);
    };

    const draw = (time: number) => {
      // limitar FPS
      if (time - lastTime < FRAME_DURATION) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // avanzar / filtrar líneas
      lines = lines.filter((line) => {
        line.step();
        return line.alpha > 0.01;
      });

      // pintar líneas
      lines.forEach((line) => line.draw());

      // spawn de nuevas líneas (menos frecuentes + límite)
      if (lines.length < MAX_LINES && frame % 16 === 0) {
        const x = width * 0.5 + random(-150, 150);
        const y = height * 0.5 + random(-100, 100);
        lines.push(new Line(x, y));
      }

      frame++;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', handleResize);
    animationId = requestAnimationFrame(draw);

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', opacity: canvasOpacity }}
      />
    </div>
  );
};

export default LinesBackground;
