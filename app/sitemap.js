export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Fetch posts from WordPress
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts?per_page=100&_fields=slug,modified`,
    { next: { revalidate: 60 } }
  );
  const posts = await res.json();

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.modified,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
    },
    ...postUrls,
  ];
}
