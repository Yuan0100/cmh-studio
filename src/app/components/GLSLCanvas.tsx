'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./glsl-canvas.module.scss";

type Props = {
  fragmentString: string;
  textures?: string;
  pixelRatio?: number;
  className?: string; // 傳入不同的 container 樣式
  canvasClassName?: string; // 傳入不同的 canvas 樣式
};

export default function GLSLCanvas({
  fragmentString,
  textures,
  pixelRatio = 0.75,
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
    setCanvasResolution(container, canvas, pixelRatio);

    const loadShader = async (fragmentString: string) => {
      const { default: GlslCanvas } = await import('glslCanvas');
      const sandbox = new GlslCanvas(canvas, { pixelRatio });
      setSandbox(sandbox);
      sandbox.load(fragmentString);
      sandbox.resize();
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

    const rsize = () => {
      setCanvasDisplaySize(container, canvas);
      sandbox.resize();
    }

    window.addEventListener('resize', rsize);
    return () => {
      window.removeEventListener('resize', rsize);
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
    pixelRatio: number
  ) {
    const rect = container.getBoundingClientRect();
    const pixelWidth = Math.floor(rect.width * pixelRatio);
    const pixelHeight = Math.floor(rect.height * pixelRatio);
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