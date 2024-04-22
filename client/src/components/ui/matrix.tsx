import { FC, useEffect, useRef, useState } from "react";

const Matrix: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [letters, setLetters] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState<number>(10);
  const [columns, setColumns] = useState<number>(0);
  const [drops, setDrops] = useState<number[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        setCtx(context);
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        let letter = "$€£¥₹₽₿฿₡₱₩₮₦₴₲₫";
        setLetters(letter.split(""));
        setColumns(canvasRef.current.width / fontSize);
        computeDrops();
      }
    }
  }, [ctx]);

  function handleResize() {
    updateCanvasSize();
    setColumns(canvasRef.current!.width / fontSize);
    computeDrops();
  }

  function updateCanvasSize() {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }
  function computeDrops() {
    const newDrops = [];
    for (let i = 0; i < columns; i++) {
      newDrops.push(1);
    }
    setDrops(newDrops);
  }

  function draw() {
    if (!ctx || !canvasRef.current) return;
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    ctx.fillStyle = "rgba(0, 0, 0, .1)";
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillStyle = "#0ea5e9";
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      drops[i]++;
      if (drops[i] * fontSize > height && Math.random() > 0.95) {
        drops[i] = 0;
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(draw, 80);
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [draw]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Matrix;
