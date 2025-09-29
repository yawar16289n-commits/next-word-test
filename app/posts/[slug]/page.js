// app/posts/[slug]/page.js
export async function generateStaticParams() {
  const res = await fetch("https://grayscalejacket.com/wp-json/wp/v2/posts");
  const posts = await res.json();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }) {
  const res = await fetch(
    `https://grayscalejacket.com/wp-json/wp/v2/posts?slug=${params.slug}`,
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
