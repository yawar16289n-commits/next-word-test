// app/posts/[slug]/page.js
export const revalidate = 60; // ISR enabled

// ✅ Use Yoast SEO title + description
export async function generateMetadata({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts?slug=${params.slug}&_embed&_fields=title,content,excerpt,slug,_yoast_head_json`,
    { next: { revalidate: 60 } }
  );

  const posts = await res.json();
  if (!posts.length) {
    return { title: "Post not found" };
  }

  const post = posts[0];
  const yoast = post._yoast_head_json;

  return {
    title: yoast?.title || post.title.rendered,
    description: yoast?.description || post.excerpt.rendered,
    alternates: { canonical: yoast?.canonical },
  };
}

export default async function Post({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts?slug=${params.slug}&_embed&_fields=title,content,excerpt,slug,_yoast_head_json`,
    { next: { revalidate: 60 } }
  );
  const posts = await res.json();

  if (!posts.length) {
    return <h1>Post not found</h1>;
  }

  const post = posts[0];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
}
