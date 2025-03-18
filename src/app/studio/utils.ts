import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

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
})

export type Metadata = z.infer<typeof MetadataSchema>;

export type Post = {
  content: string;
  metadata: Metadata;
  slug: string;
};

function parseFrontmatter(fileContent: string, category: string): Post {
  let { data: metadata, content } = matter(fileContent);

  metadata.category = category;

  const parsedMetadata = MetadataSchema.safeParse(metadata);
  if (!parsedMetadata.success) {
    throw new Error(`Invalid front matter: ${parsedMetadata.error.message}`);
  }

  return {
    content,
    metadata: parsedMetadata.data,
    slug: '', // 會在 getPosts 函數中設置
  };
}

function getMDXFiles(dir: string): string[] {
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

export function getStudioPosts(): Post[] {
  const filePaths = getMDXFiles(contentDirectory);

  return filePaths.map(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const category = path.basename(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const slug = fileName.replace(/\.(md|mdx)$/, '');

    const post = parseFrontmatter(fileContent, category);
    post.slug = slug;

    return post;
  });
}

// ===

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getStudioPosts();
  return posts.find(post => post.slug === slug);
}

// export function getCategories(): string[] {
//   const posts = getStudioPosts();
//   const categories = new Set(posts.map(post => post.metadata.category));
//   return Array.from(categories);
// }

// export function getPostsByCategory(category: string): Post[] {
//   const posts = getStudioPosts();
//   return posts.filter(post => post.metadata.category === category);
// }

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}