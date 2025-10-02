import Link from "next/link";

export const metadata = {
  title: "Blog Posts - My Blog",
  description: "Browse all blog posts powered by WordPress REST APIs with SEO.",
};

export const revalidate = 60; // ISR enabled

export default async function PostsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts?per_page=10&_embed&_fields=id,slug,title,excerpt,_embedded,_yoast_head_json`,
    { next: { revalidate: 60 } }
  );
  const posts = await res.json();

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center mb-10">All Blog Posts</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => {
          const yoast = post._yoast_head_json;
          return (
            <article
              key={post.id}
              className="border rounded-xl p-6 bg-white shadow hover:shadow-lg transition"
            >
              {/* Featured image (if available) */}
              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                <img
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={yoast?.title || post.title.rendered}
                  className="rounded-lg mb-4 w-full h-48 object-cover"
                />
              )}

              {/* Title */}
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-xl font-semibold hover:underline mb-2">
                  {yoast?.title || post.title.rendered}
                </h2>
              </Link>

              {/* SEO Description (Yoast) */}
              <p className="text-gray-700 text-sm mb-4">
                {yoast?.description ||
                  post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "")}
              </p>

              {/* Read More */}
              <Link
                href={`/posts/${post.slug}`}
                className="inline-block text-blue-600 hover:underline font-medium"
              >
                Read More →
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}
