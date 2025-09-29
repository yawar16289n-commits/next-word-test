export const metadata = {
  title: "About Us - My Blog",
  description:
    "Learn more about the mission and vision behind this Next.js + WordPress powered blog.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">About Us</h1>
      <p className="text-gray-700">
        This blog is built with <strong>Next.js</strong> as the frontend and{" "}
        <strong>WordPress REST API</strong> as the backend. Our mission is to
        provide fast, modern, and SEO-friendly content delivery while keeping
        WordPress as the editor-friendly CMS.
      </p>
      <p className="text-gray-700">
        By combining the power of static site generation (SSG) and incremental
        revalidation, we ensure both speed and up-to-date content. We believe in
        simplicity, performance, and open-source technologies.
      </p>
    </main>
  );
}
