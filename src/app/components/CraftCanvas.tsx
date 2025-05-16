'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./craft-canvas.module.scss"

type Props = {
  fragmentString: string;
  textures?: string;
}

export default function CraftCanvas({ fragmentString, textures }: Props) {
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
    const container = canvasContaienrRef.current;
    const canvas = sandbox?.canvas;
    if (!canvas || !container) return;

    const resolutionScale = 1;

    const handleResize = () => {
      const scale = window.devicePixelRatio * resolutionScale;
      const canvasWidth = container.getBoundingClientRect().width - container.clientLeft * 2;
      const canvasHeight = container.getBoundingClientRect().height - container.clientTop * 2;
      canvas.width = Math.floor(canvasWidth * scale);
      canvas.height = Math.floor(canvasHeight * scale);
      // console.log(container.getBoundingClientRect().width, container.getBoundingClientRect().height);

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