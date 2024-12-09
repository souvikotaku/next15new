import Link from "next/link";

// Mock data for production fallback
async function fetchPosts() {
  try {
    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://next15-practice.netlify.app"; // Use the live deployed API URL

    const res = await fetch(`${url}/api/posts`); // Ensure this URL is correct in both environments

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [
      { id: "1", title: "Learn React" },
      { id: "2", title: "Introduction to Next.js" },
      { id: "3", title: "Advanced JavaScript" },
    ]; // Fallback mock data
  }
}

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <main>
      <h1>Welcome to My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
