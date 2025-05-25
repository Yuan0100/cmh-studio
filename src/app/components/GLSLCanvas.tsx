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
  resolutionScale = 0.75,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sandbox, setSandbox] = useState<any>(null);

  // useEffect(() => {
  //   // 設定較低 devicePixelRatio 改善效能
  //   window.devicePixelRatio = 0.75;
  // }, [])

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;

    // 初始化 shader 前先 resize
    setCanvasDisplaySize(container, canvas);
    setCanvasResolution(container, canvas, resolutionScale);

    const loadShader = async (fragmentString: string) => {
      const { default: GlslCanvas } = await import('glslCanvas');
      const sandbox = new GlslCanvas(canvas);
      setSandbox(sandbox);
      sandbox.load(fragmentString);
    };
    loadShader(fragmentString);
  }, [fragmentString]);

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
      setCanvasDisplaySize(container, canvas);
      requestAnimationFrame(() => {
        setCanvasResolution(container, canvas, resolutionScale);
      });
    };

    // 初始呼叫一次
    resize();

    const observer = new window.ResizeObserver(resize);
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [sandbox])

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
    resolutionScale: number
  ) {
    const rect = container.getBoundingClientRect();
    const pixelWidth = Math.floor(rect.width * resolutionScale);
    const pixelHeight = Math.floor(rect.height * resolutionScale);
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
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