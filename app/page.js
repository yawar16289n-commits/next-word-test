import Link from "next/link";

export const metadata = {
  title: "My Blog - Next.js + WordPress",
  description:
    "A modern blog built with Next.js frontend and WordPress REST API backend.",
  keywords: "Next.js, WordPress, Headless CMS, Blog",
};

export default async function Home() {
  const resPosts = await fetch(
    "https://grayscalejacket.com/wp-json/wp/v2/posts?per_page=3",
    { next: { revalidate: 60 } }
  );
  const posts = await resPosts.json();

  const resCategories = await fetch(
    "https://grayscalejacket.com/wp-json/wp/v2/categories?per_page=5",
    { next: { revalidate: 60 } }
  );
  const categories = await resCategories.json();

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-20">
      {/* Hero */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-lg mb-6">
          Insights, stories, and updates powered by WordPress + Next.js
        </p>
        <div className="space-x-4">
          <Link
            href="/posts"
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
          >
            Read Blog
          </Link>
          <Link
            href="/about"
            className="bg-transparent border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700"
          >
            About Us
          </Link>
        </div>
      </section>

      {/* Latest Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Latest Posts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="p-4 border rounded-xl shadow hover:shadow-lg transition"
            >
              <Link href={`/posts/${post.slug}`}>
                <h3 className="text-xl font-semibold hover:underline">
                  {post.title.rendered}
                </h3>
              </Link>
              <div
                className="text-gray-600 mt-2"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
            </article>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <span
              key={cat.id}
              className="px-4 py-2 bg-gray-200 rounded-full text-gray-800 hover:bg-gray-300 cursor-pointer"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
