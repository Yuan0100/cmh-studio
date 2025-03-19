import Link from "next/link";
import { getPosts } from "../craft/utils"
import styles from "./craft-list.module.scss"
import Image from "next/image";

type Props = {}

export default function CraftList({ }: Props) {
  const posts = getPosts().map(post => ({
    ...post.metadata,
    slug: post.slug,
  }))

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/craft/${post.slug}`}>
              <div className={styles.thumb_area}>
                {post.heroImage && !post.shader && (
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    width={300}
                    height={300}
                  />
                )}
              </div>
              <h2>{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}