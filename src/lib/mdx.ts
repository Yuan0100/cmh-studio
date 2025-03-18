import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeShiki from '@shikijs/rehype';
import { CompileOptions } from '@mdx-js/mdx';

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
}