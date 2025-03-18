import { getPostBySlug, getStudioPosts } from "../utils";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import CustomMDX from "@/app/components/CustomMDX";
import { mdxOptions } from "@/lib/mdx";


type Props = {
  params: Promise<{
    slug: string;
  }>
}

export default async function StudioPost({ params }: Props) {
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
      <h1>{post.metadata.title}</h1>
      <p>{post.metadata.description}</p>
      <div>
        <CustomMDX mdxSource={mdxSource} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = getStudioPosts()

  const paths = posts.map(post => ({
    params: { slug: post.slug },
  }));

  return paths;
}

export const dynamicParams = false