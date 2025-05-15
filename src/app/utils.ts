import fs from 'fs';
import path from 'path';
import { resolveLygiaAsync } from '@/lib/lygia';

export type WorkShaderType = {
  src: string;
  fragmentString?: string;
  textures?: string;
}

export const WORK_SHADERS: WorkShaderType[] = [
  {
    src: 'works/12_QuadtreeMonaLisa.frag',
    fragmentString: '',
    textures: 'data/MonaLisa.jpg, data/Taipei101_1.jpeg'
  }
]

export async function generateFragmentString(shaderSrc: string): Promise<string> {
  const { default: glslify } = await import('glslify');

  //   const shaderBase = `
  // #ifdef GL_ES
  // precision mediump float;
  // #endif

  // uniform vec2 u_resolution;
  // uniform float u_time;
  // uniform vec2 u_mouse;
  // `

  const shaderContent = fs.readFileSync(
    path.join(process.cwd(), "src/shader", shaderSrc),
    "utf-8"
  );

  // Resolve includes asynchronously
  const resolvedShaderContent = await resolveLygiaAsync(shaderContent);

  // const shaderString = resolvedShaderContent + "\n" + shaderBuffer;
  const shaderString = resolvedShaderContent;

  const content = glslify(shaderString, {
    basedir: "./src/shader",
  });

  console.log('Log from utils.ts: ', content);
  return content;
}