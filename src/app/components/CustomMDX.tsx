'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { MDXComponents } from 'mdx/types'
import styles from './custom-mdx.module.scss'
import Image, { ImageProps } from 'next/image'

export const components: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1 className={`${styles.heading1} ${className}`} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={`${styles.heading2} ${className}`} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={`${styles.heading3} ${className}`} {...props} />
  ),
  h4: ({ className, ...props }) => (
    <h4 className={`${styles.heading4} ${className}`} {...props} />
  ),
  h5: ({ className, ...props }) => (
    <h5 className={`${styles.heading5} ${className}`} {...props} />
  ),
  h6: ({ className, ...props }) => (
    <h6 className={`${styles.heading6} ${className}`} {...props} />
  ),
  a: ({ className, ...props }) => (
    <a className={`${styles.link} ${className}`} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={`${styles.paragraph} ${className}`} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={`${styles.unorderedList} ${className}`} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={`${styles.orderedList} ${className}`} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={`${styles.listItem} ${className}`} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote className={`${styles.blockquote} ${className}`} {...props} />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image className={`${styles.image} ${className}`} {...(props as ImageProps)} alt={alt || ''} width={1080} height={1080} />
  ),
  hr: ({ className, ...props }) => (
    <hr className={`${styles.horizontalRule} ${className}`} {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className={`${styles.tableContainer} ${className}`}>
      <table className={`${styles.table} ${className}`} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={`${styles.tableRow} ${className}`} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th className={`${styles.tableHeader} ${className}`} {...props} />
  ),
  td: ({ className, ...props }) => (
    <td className={`${styles.tableCell} ${className}`} {...props} />
  ),
  pre: ({ className, ...props }) => (
    <pre className={`${styles.preformatted} ${className}`} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code className={`${styles.code} ${className}`} {...props} />
  ),
}

interface Props {
  mdxSource: MDXRemoteSerializeResult
}

export default function CustomMDX({ mdxSource }: Props) {
  return (
    <MDXRemote {...mdxSource} components={components} />
  )
}