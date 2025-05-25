'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./glsl-canvas.module.scss";

type Props = {
  fragmentString: string;
  textures?: string;
  resolutionScale?: number;
  className?: string; // 傳入不同的 container 樣式
};

export default function GLSLCanvas({
  fragmentString,
  textures,
  resolutionScale = 0.25,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sandbox, setSandbox] = useState<any>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;

    // 初始化 shader 前先 resize
    // resizeCanvas(container, canvas, null, resolutionScale);
    setCanvasDisplaySize(container, canvas);
    setCanvasResolution(container, canvas, sandbox, resolutionScale);

    const loadShader = async (fragmentString: string) => {
      const { default: GlslCanvas } = await import('glslCanvas');
      const sandbox = new GlslCanvas(canvas);
      setSandbox(sandbox);
      sandbox.load(fragmentString);
    };
    loadShader(fragmentString);
  }, [fragmentString, resolutionScale]);

  useEffect(() => {
    if (!sandbox) return;

    if (textures) {
      textures.split(',').forEach((texture, index) => {
        sandbox.setUniform(`u_tex${index}`, `/assets/craft/${texture}`);
      });
    }
  }, [sandbox, textures])

  useEffect(() => {
    const container = containerRef.current;
    const canvas = sandbox?.canvas;
    if (!canvas || !container) return;

    const resize = () => {
      // 用 requestAnimationFrame 確保 layout 完成
      setCanvasDisplaySize(container, canvas);
      requestAnimationFrame(() => {
        setCanvasResolution(container, canvas, sandbox, resolutionScale);
      })
    };

    // 初始呼叫一次
    resize();

    // const observer = new window.ResizeObserver(resize);
    // observer.observe(container);

    // return () => {
    //   observer.disconnect();
    // };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [sandbox, resolutionScale]);


  function setCanvasDisplaySize(
    container: HTMLDivElement,
    canvas: HTMLCanvasElement
  ) {
    const rect = container.getBoundingClientRect();
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }

  function setCanvasResolution(
    container: HTMLDivElement,
    canvas: HTMLCanvasElement,
    sandbox: any,
    resolutionScale: number
  ) {
    const rect = container.getBoundingClientRect();
    const pixelWidth = Math.floor(rect.width * resolutionScale);
    const pixelHeight = Math.floor(rect.height * resolutionScale);
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
    // if (sandbox) {
    //   sandbox.setUniform("u_resolution", [pixelWidth, pixelHeight]);
    // }
  }

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        className={`glslCanvas ${styles.glsl_canvas}`}
      ></canvas>
    </div>
  );
}