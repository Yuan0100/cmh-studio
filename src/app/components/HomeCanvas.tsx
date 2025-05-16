'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./home-canvas.module.scss"

type Props = {
  fragmentString: string;
  textures?: string;
}

export default function HomeCanvas({ fragmentString, textures }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContaienrRef = useRef<HTMLDivElement>(null);
  const [sandbox, setSandbox] = useState<any>(null);

  // Load the shader when the component mounts
  useEffect(() => {
    const container = canvasContaienrRef.current;
    const canvas = canvasRef.current;

    if (!canvas || !container) return;

    const loadShader = async (fragmentString: string) => {

      const { default: GlslCanvas } = await import('glslCanvas');
      const sandbox = new GlslCanvas(canvas);
      setSandbox(sandbox);

      sandbox.load(fragmentString);
    }

    loadShader(fragmentString);
  }, [])

  // Handle window resize and set canvas size
  useEffect(() => {
    if (!sandbox) return;
    const canvas = sandbox.canvas;

    const resolutionScale = 0.25;

    const handleResize = () => {
      const scale = window.devicePixelRatio * resolutionScale;
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerWidth > 768 ? window.innerHeight * 0.7 : window.innerWidth;
      canvas.width = Math.floor(canvasWidth * scale);
      canvas.height = Math.floor(canvasHeight * scale);

      sandbox.setUniform("u_resolution", canvas.width, canvas.height);
    };

    // Initial setup
    handleResize();
    if (textures) {
      textures.split(',').forEach((texture, index) => {
        sandbox.setUniform(`u_tex${index}`, `/assets/craft/${texture}`);
      });
    }
    // Add event listeners
    window.addEventListener('resize', handleResize);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [sandbox, textures])

  return (
    <div ref={canvasContaienrRef} className={styles.container}>
      <canvas
        ref={canvasRef}
        className={`glslCanvas ${styles.glsl_canvas}`}
      ></canvas>
    </div>
  )
}