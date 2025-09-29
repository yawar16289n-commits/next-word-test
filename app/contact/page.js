export const metadata = {
  title: "Contact Us - My Blog",
  description:
    "Get in touch with us for questions, collaborations, or feedback.",
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="text-gray-700">
        Have questions, suggestions, or collaboration ideas? We’d love to hear
        from you.
      </p>

      <div className="bg-gray-100 p-6 rounded-xl shadow">
        <p className="mb-4">
          📧 Email us at:{" "}
          <a
            href="mailto:youremail@example.com"
            className="text-blue-600 hover:underline"
          >
            youremail@example.com
          </a>
        </p>
        <p className="mb-4">📍 Location: Your City, Country</p>
        <p>
          💬 Or reach out on{" "}
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Twitter
          </a>
        </p>
      </div>
    </main>
  );
}
