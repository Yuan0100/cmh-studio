import Link from "next/link";
import { generateFragmentString, getPosts } from "../craft/utils"
import styles from "./craft-list.module.scss"
import Image from "next/image";
import CraftCanvas from "./CraftCanvas";


export default async function CraftList() {
  const posts = getPosts().map(post => ({
    ...post.metadata,
    slug: post.slug,
  }))

  const fragmentString = await generateFragmentString(posts.map(post => (post.shader)));

  return (
    <div className={styles.container}>
      <CraftCanvas fragmentString={fragmentString} />
      <ul className={styles.list} id="craft-list">
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/craft/${post.slug}`}>
              <div className={`thumb_area ${styles.thumb_area}`}>
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