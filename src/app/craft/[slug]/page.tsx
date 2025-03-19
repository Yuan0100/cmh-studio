import { getPostBySlug, getPosts } from "../utils";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import CustomMDX from "@/app/components/CustomMDX";
import { mdxOptions } from "@/lib/mdx";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";


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

  const mdxSource = await serialize(post.content, {
    scope: {},
    mdxOptions,
    parseFrontmatter: true,
  });

  return (
    <div>
      <Header />
      <main>
        <h1>{post.metadata.title}</h1>
        <p>{post.metadata.description}</p>
        <div>
          <CustomMDX mdxSource={mdxSource} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = getPosts()

  const paths = posts.map(post => ({
    params: { slug: post.slug },
  }));

  return paths;
}

export const dynamicParams = false