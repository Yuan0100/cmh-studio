import Link from "next/link";
import { getPosts } from "../craft/utils"
import styles from "./craft-list.module.scss"
import CraftCard from "./CraftCard";


export default async function CraftList() {
  const posts = getPosts().map(post => ({
    ...post.metadata,
    slug: post.slug,
  }))

  return (
    <div className={styles.container}>
      <ul className={styles.list} id="craft-list">
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/craft/${post.slug}`}>
              <CraftCard
                heroImage={post.heroImage}
                title={post.title}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}