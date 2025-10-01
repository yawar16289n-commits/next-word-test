export const revalidate = 60; // ISR enabled

// 🔹 Generate metadata dynamically from WordPress
export async function generateMetadata({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts?slug=${params.slug}&_embed`
  );
  const posts = await res.json();

  if (!posts.length) {
    return {
      title: "Post Not Found - My Blog",
      description: "The requested post could not be found.",
    };
  }

  const post = posts[0];
  const plainExcerpt = post.excerpt.rendered
    .replace(/<[^>]+>/g, "") // strip HTML tags
    .slice(0, 150); // keep it short for SEO

  return {
    title: `${post.title.rendered} - My Blog`,
    description: plainExcerpt || "Read this blog post on My Blog.",
  };
}

export default async function Post({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts?slug=${params.slug}&_embed`
  );
  const posts = await res.json();

  if (!posts.length) {
    return <h1>Post not found</h1>;
  }

  const post = posts[0];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>

      {/* Featured image */}
      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <img
          src={post._embedded["wp:featuredmedia"][0].source_url}
          alt={post.title.rendered}
          className="rounded-lg mb-6 w-full h-72 object-cover"
        />
      )}

      {/* Content */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
}
