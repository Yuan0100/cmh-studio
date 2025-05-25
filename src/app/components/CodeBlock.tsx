'use client'

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import styles from './custom-mdx.module.scss'

type Props = {
  codeString: string;
}

export default function CodeBlock({ codeString }: Props) {
  const [codeHtml, setCodeHtml] = useState<string | null>(null);

  useEffect(() => {
    const getHtml = async () => {
      const html = await codeToHtml(codeString, {
        lang: 'glsl',
        theme: 'nord',
      })
      setCodeHtml(html);
    }
    getHtml();
  }, [codeString])

  return (<>{codeHtml && (
    <div className={styles.codeBlock} dangerouslySetInnerHTML={{ __html: codeHtml }} />
  )}</>)
}