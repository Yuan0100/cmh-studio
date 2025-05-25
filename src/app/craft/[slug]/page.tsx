import { getPostBySlug, getPosts } from "../utils";
import { notFound } from "next/navigation";
// import { serialize } from "next-mdx-remote/serialize";
// import CustomMDX from "@/app/components/CustomMDX";
// import { mdxOptions } from "@/lib/mdx";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import styles from "./page.module.scss";
import { generateFragmentString } from "./utils";
import CodeBlock from "@/app/components/CodeBlock";
import GLSLCanvas from "@/app/components/GLSLCanvas";

type Props = {
  params: Promise<{
    slug: string;
  }>
}

export default async function CraftPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // const mdxSource = await serialize(post.content, {
  //   scope: {},
  //   mdxOptions,
  //   parseFrontmatter: true,
  // });

  const fragmentString = await generateFragmentString(post.metadata.shader);

  return (
    <div>
      <Header />
      <div className={styles.head_section}>
        <GLSLCanvas
          fragmentString={fragmentString}
          textures={post.metadata.shader?.textures}
          // resolutionScale={0.5}
          className={styles.canvas_container}
        />
      </div>
      <div className={styles.container}>
        <main>
          <h1>{post.metadata.title}</h1>
          <p>{post.metadata.description}</p>
          <CodeBlock codeString={fragmentString} />
          {/* {post.content && (
            <div>
              <CustomMDX mdxSource={mdxSource} />
            </div>
          )} */}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = getPosts()

  const paths = posts.map(post => ({
    slug: post.slug,
  }));

  return paths;
}

export const dynamicParams = false