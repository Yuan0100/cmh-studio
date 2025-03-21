import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { getMDXFiles, parseFrontmatter } from '@/lib/mdx';

const contentDirectory = path.join(process.cwd(), 'src/content/craft');

const MetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  shader: z.object({
    src: z.string(),
    function: z.string(),
  }).optional(),
  category: z.string(),
});

export type Metadata = z.infer<typeof MetadataSchema>;

export type Post = {
  content: string;
  metadata: Metadata;
  slug: string;
};

export function getPosts(): Post[] {
  const filePaths = getMDXFiles(contentDirectory);

  return filePaths.map(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const category = path.basename(path.dirname(filePath)) === contentDirectory.split('/').pop()
      ? ''
      : path.basename(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const slug = fileName.replace(/\.(md|mdx)$/, '');

    const post = parseFrontmatter<Metadata>(fileContent, MetadataSchema, category);
    return {
      ...post,
      slug,
    };
  });
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getPosts();
  return posts.find(post => post.slug === slug);
}

// === shader canvas ===

export type PostShader = Metadata['shader'];

function generateThumbnailRegionUniforms(thumbnailCount: number): string {
  let code = '';
  for (let i = 0; i < thumbnailCount; i++) {
    code += `uniform vec4 u_thumbnailRegion${i};\n`;
  }
  return code;
}

export async function generateFragmentString(postShaders: PostShader[]): Promise<string> {
  const { default: glslify } = await import('glslify');

  const shaderEffects = postShaders.map((shader, index) => {
    if (!shader) return '';

    return `
    region = u_thumbnailRegion${index};
    if (uv.x >= region.x && uv.x <= region.x + region.z &&
      uv.y >= region.y && uv.y <= region.y + region.w) {
      index = ${index + 1};
      cell_uv = clamp((uv - region.xy) / region.zw, vec2(0.0), vec2(1.0));
      color = ${shader.function}; 
    } 
    `
  }).join('');

  const shaderIncludes = postShaders.map((shader) => {
    if (!shader) return '';

    const effect = shader.src.split('/').pop()?.replace('.frag', '');
    return `#pragma glslify: ${effect} = require('./${shader.src}')`;
  }).join('\n');


  const thumbnailUniforms = generateThumbnailRegionUniforms(postShaders.length);

  const shaderContent = `
#ifdef GL_ES
precision mediump float;
#endif

${shaderIncludes}

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
// uniform float u_scrollY;
uniform vec2 u_windowMouse;
uniform float u_borderRadius;
${thumbnailUniforms}

vec3 background(vec2 uv) {
    return vec3(1.0, 1.0, 1.0);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Reverse the y coordinate
    uv.y = 1.0 - uv.y;

    // Apply scroll effect
    // uv.y += u_scrollY;

    int index = 0;

    vec2 cell_uv;
    vec3 color;
    vec4 region;

    color = background(uv);

    ${shaderEffects}

    gl_FragColor = vec4(color, 1.0);
}
`;

  const content = glslify(shaderContent, {
    basedir: "./src/shader",
  })

  console.log(content);


  return content;
}

