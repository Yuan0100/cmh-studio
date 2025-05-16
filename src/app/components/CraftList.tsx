import Link from "next/link";
import { getPosts } from "../craft/utils"
import styles from "./craft-list.module.scss"
import CraftCard from "./CraftCard";


export default async function CraftList() {
  const posts = getPosts().map(post => ({
    ...post.metadata,
    slug: post.slug,
  }))

  // Group posts by category
  const groupedPosts = posts.reduce((acc, post) => {
    const category = post.category || "Uncategorized"; // Default to "Uncategorized" if no category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  console.log(groupedPosts);



  return (
    <div className={styles.container}>
      {Object.entries(groupedPosts).map(([category, posts]) => (
        <div key={category} className={styles.list_section}>
          <h2 className={styles.section_title}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <ul className={styles.list} id={`craft-list-${category}`}>
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
      ))}
      {/* <ul className={styles.list} id="craft-list">
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
      </ul> */}
    </div>
  )
}