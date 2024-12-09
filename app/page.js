import Link from "next/link";

async function fetchPosts() {
  if (process.env.NODE_ENV === "development") {
    // Local environment
    const res = await fetch("http://localhost:3000/api/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    return res.json();
  }

  // Fallback to mock data for prerendering
  return [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Introduction to Next.js" },
    { id: "3", title: "Advanced JavaScript" },
  ];
}

export default async function Home() {
  let posts = [];

  try {
    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://next15-practice.netlify.app";
    const res = await fetch(`${url}/api/posts`); // Use your deployed API URL
    if (!res.ok) throw new Error("Failed to fetch posts");
    posts = await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <main>
      <h1>Welcome to My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
