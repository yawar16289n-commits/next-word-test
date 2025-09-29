import Link from "next/link";

export const metadata = {
  title: "Blog Posts - My Blog",
  description: "Browse all blog posts powered by WordPress REST APIs.",
};

export default async function PostsPage() {
  const res = await fetch(
    "https://grayscalejacket.com/wp-json/wp/v2/posts?per_page=10&_embed",
    { next: { revalidate: 60 } }
  );
  const posts = await res.json();

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center mb-10">All Blog Posts</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border rounded-xl p-6 bg-white shadow hover:shadow-lg transition"
          >
            {/* Featured image (if available) */}
            {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
            )}

            {/* Title */}
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-xl font-semibold hover:underline mb-2">
                {post.title.rendered}
              </h2>
            </Link>

            {/* Excerpt */}
            <div
              className="text-gray-700 text-sm mb-4"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />

            {/* Read More */}
            <Link
              href={`/posts/${post.slug}`}
              className="inline-block text-blue-600 hover:underline font-medium"
            >
              Read More →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
