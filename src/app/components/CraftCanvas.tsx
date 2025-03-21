'use client';

import { useEffect, useRef } from "react";
import styles from "./craft-canvas.module.scss"

type Props = {
  fragmentString: string;
}

export default function CraftCanvas({ fragmentString }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadShader = async (fragmentString: string) => {

      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ulElement = document.getElementById('craft-list')
      if (!ulElement) return;

      const getThumbRegions = () => {
        const thumbAreas = ulElement.querySelectorAll('.thumb_area');
        const canvasRect = canvas.getBoundingClientRect();
        const thumbRegions = Array.from(thumbAreas).map((area, index) => {
          const rect = area.getBoundingClientRect();
          return {
            index,
            x: (rect.left - canvasRect.left) / canvasRect.width,
            y: (rect.top - canvasRect.top) / canvasRect.height,
            width: rect.width / canvasRect.width,
            height: rect.height / canvasRect.height,
          };
        });
        return thumbRegions;
      }

      // 延遲導入 glslCanvas
      const { default: GlslCanvas } = await import('glslCanvas');
      const sandbox = new GlslCanvas(canvas);

      // 加載著色器代碼
      sandbox.load(fragmentString);

      // Function to resize the canvas and update uniforms
      const handleResize = () => {
        // Resize the canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Update the resolution uniform
        sandbox.setUniform("u_resolution", canvas.width, canvas.height);

        // Recalculate and update thumbRegions
        const thumbRegions = getThumbRegions();
        thumbRegions.forEach(({ index, x, y, width, height }) => {
          sandbox.setUniform(`u_thumbnailRegion${index}`, x, y, width, height);
        });
      };

      // Initial setup
      handleResize();

      // 設置初始 uniform 值
      // sandbox.setUniform("u_scrollY", window.scrollY / ulElement.clientHeight);
      // getThumbRegions().forEach(({ index, x, y, width, height }) => {
      //   sandbox.setUniform(`u_thumbnailRegion${index}`, x, y, width, height);
      // });

      const handleMouseMove = (event: MouseEvent) => {
        const mouseX = event.clientX / ulElement.clientWidth;
        const mouseY = (event.clientY + window.scrollY) / ulElement.clientHeight;
        sandbox.setUniform("u_windowMouse", mouseX, mouseY);
        // console.log(mouseX, mouseY);
      };

      // Scroll handler
      const handleScroll = () => {
        const thumbRegions = getThumbRegions();
        thumbRegions.forEach(({ index, x, y, width, height }) => {
          sandbox.setUniform(`u_thumbnailRegion${index}`, x, y, width, height);
        });
      };

      console.log(sandbox);

      ulElement.addEventListener('mousemove', handleMouseMove);


      // Add event listeners
      ulElement.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);

      // handleScroll();

      return () => {
        ulElement.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
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