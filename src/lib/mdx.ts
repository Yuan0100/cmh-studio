import fs from 'fs';
import path from 'path';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeShiki from '@shikijs/rehype';
import { CompileOptions } from '@mdx-js/mdx';
import matter from 'gray-matter';
import { ZodType } from 'zod';

export const mdxOptions: CompileOptions = {
  remarkPlugins: [
    remarkGfm,
    remarkFrontmatter,
    remarkMdxFrontmatter,
  ],
  rehypePlugins: [
    [rehypeShiki, { theme: 'nord' }],
  ],
  format: 'mdx',
};

export function getMDXFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getMDXFiles(filePath));
    } else if (path.extname(file) === '.md' || path.extname(file) === '.mdx') {
      results.push(filePath);
    }
  });

  return results;
}

export function parseFrontmatter<T>(fileContent: string, schema: ZodType<T>, category: string): { content: string, metadata: T } {
  const { data: metadata, content } = matter(fileContent);
  metadata.category = category;

  const parsedMetadata = schema.safeParse(metadata);
  if (!parsedMetadata.success) {
    throw new Error(`Invalid front matter: ${parsedMetadata.error.message}`);
  }

  return {
    content,
    metadata: parsedMetadata.data,
  };
}