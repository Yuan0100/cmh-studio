import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { getMDXFiles, parseFrontmatter } from '@/lib/mdx';

const contentDirectory = path.join(process.cwd(), 'src/content/studio');

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

export function getStudioPosts(): Post[] {
  const filePaths = getMDXFiles(contentDirectory);

  return filePaths.map(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const category = path.basename(path.dirname(filePath));
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
  const posts = getStudioPosts();
  return posts.find(post => post.slug === slug);
}