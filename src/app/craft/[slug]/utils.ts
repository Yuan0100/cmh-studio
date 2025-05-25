import fs from 'fs';
import path from 'path';
import { Metadata } from '../utils';
import { resolveLygiaAsync } from '@/lib/lygia';

type PostShader = Metadata['shader'];

export async function generateFragmentString(postShader: PostShader): Promise<string> {
  if (!postShader) return '';

  const { default: glslify } = await import('glslify');

  const shaderBase = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
`

  const shaderContent = fs.readFileSync(
    path.join(process.cwd(), "src/shader", postShader.src),
    "utf-8"
  );

  // Resolve includes asynchronously
  const resolvedShaderContent = await resolveLygiaAsync(
    glslify(shaderContent, { basedir: "src/shader", })
  );

  const shaderString = shaderBase + "\n" + resolvedShaderContent;

  const content = glslify(shaderString, {
    basedir: "src/shader",
  });

  // console.log('Log from craft/[slug]/utils.ts: ', content);
  return content;
}