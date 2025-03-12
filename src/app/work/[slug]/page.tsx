import { getWorkPosts } from "../utils";

type Props = {
  params: Promise<{
    slug: string;
  }>
}

export default async function page({ params }: Props) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/work/${slug}.mdx`)

  return (
    <div className="mdx">
      <Post />
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = getWorkPosts().map((post) => ({ slug: post.slug }))

  return slugs;
}

export const dynamicParams = false