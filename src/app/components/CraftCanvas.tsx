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

      // 設置初始 uniform 值
      // sandbox.setUniform("u_scrollY", window.scrollY / ulElement.clientHeight);
      getThumbRegions().forEach(({ index, x, y, width, height }) => {
        sandbox.setUniform(`u_thumbnailRegion${index}`, x, y, width, height);
      });

      const handleMouseMove = (event: MouseEvent) => {
        const mouseX = event.clientX / ulElement.clientWidth;
        const mouseY = (event.clientY + window.scrollY) / ulElement.clientHeight;
        sandbox.setUniform("u_windowMouse", mouseX, mouseY);
        // console.log(mouseX, mouseY);
      };

      ulElement.addEventListener('mousemove', handleMouseMove);

      console.log(sandbox);

      const handleScroll = () => {
        // sandbox.setUniform("u_scrollY", window.scrollY / ulElement.clientHeight);
        getThumbRegions().forEach(({ index, x, y, width, height }) => {
          sandbox.setUniform(`u_thumbnailRegion${index}`, x, y, width, height);
        });
      };

      window.addEventListener('scroll', handleScroll);

      handleScroll();

      return () => {
        ulElement.removeEventListener('mousemove', handleMouseMove);
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
        width="1080"
        height="1080"
      ></canvas>
    </div>
  )
}