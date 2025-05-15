import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeShiki from '@shikijs/rehype'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  transpilePackages: process.env.NODE_ENV !== "production" ? ["next-mdx-remote"] : undefined,
  serverExternalPackages: ["glslify"],
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "production" ? 'https' : 'http',
        hostname: process.env.NODE_ENV === "production" ? 'example.com' : 'localhost',
        port: '',
        pathname: '/assets/**',
        search: '',
      },
    ],
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      remarkMdxFrontmatter,
    ],
    rehypePlugins: [
      [rehypeShiki, { theme: 'nord' }],
    ],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)