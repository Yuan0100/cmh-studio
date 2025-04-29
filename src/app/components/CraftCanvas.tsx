'use client';

import { useEffect, useRef } from "react";
import styles from "./craft-canvas.module.scss"

type Props = {
  fragmentString: string;
  textures: string | undefined;
}

export default function CraftCanvas({ fragmentString, textures }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadShader = async (fragmentString: string) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // 延遲導入 glslCanvas
      const { default: GlslCanvas } = await import('glslCanvas');
      const sandbox = new GlslCanvas(canvas);

      // 加載著色器代碼
      sandbox.load(fragmentString);

      // Function to resize the canvas and update uniforms
      const handleResize = () => {
        // Update the resolution uniform
        sandbox.setUniform("u_resolution", canvas.width, canvas.height);
      };

      // const handleMouseMove = (event: MouseEvent) => {
      //   const mouseX = event.clientX / canvas.width;
      //   const mouseY = event.clientY / canvas.height;
      //   sandbox.setUniform("u_mouse", mouseX, mouseY);
      //   console.log(mouseX, mouseY);
      // };

      // Initial setup
      handleResize();
      if (textures) {
        textures.split(',').forEach((texture, index) => {
          sandbox.setUniform(`u_tex${index}`, `/assets/craft/${texture}`);
        });
      }

      console.log(sandbox);

      // Add event listeners
      window.addEventListener('resize', handleResize);
      // canvas.addEventListener('mousemove', handleMouseMove);

      // handleScroll();

      return () => {
        window.removeEventListener('resize', handleResize);
        // canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };

    loadShader(fragmentString);
  }, [fragmentString])

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className="glslCanvas"
        style={{ width: '100%', height: '100%' }}
      ></canvas>
    </div>
  )
}