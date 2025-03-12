import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import styles from './mdx-components.module.scss';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
      //@ts-ignore
      <Image className={`${styles.image} ${className}`} alt={alt} {...(props as ImageProps)} />
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
    ...components,
  };
}