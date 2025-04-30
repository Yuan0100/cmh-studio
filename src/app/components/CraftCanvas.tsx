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
    if (!sandbox) return;

    const container = canvasContaienrRef.current;
    if (!container) return;
    const canvas = container.querySelector('canvas');
    if (!canvas) return;

    // Scale the canvas to the device pixel ratio
    const scale = window.devicePixelRatio;
    const canvasWidth = window.innerWidth > window.innerHeight ? window.innerHeight * 0.7 : window.innerWidth;
    const canvasHeight = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight * 0.7;

    const handleResize = () => {
      canvas.width = canvasWidth * scale;
      canvas.height = canvasHeight * scale;

      // Update the resolution uniform
      sandbox.setUniform("u_resolution", canvas.width, canvas.height);
    }

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
        className="glslCanvas"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      ></canvas>
    </div>
  )
}