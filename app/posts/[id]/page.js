async function fetchPost(id) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://next15-practice.netlify.app"; // Replace with your actual Netlify domain
  const res = await fetch(`${baseUrl}/api/posts`);
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts = await res.json();
  return posts.find((post) => post.id === id) || null;
}

export default async function Post({ params }) {
  // Ensure params is resolved properly
  const resolvedParams = await params;
  console.log("Resolved Params:", resolvedParams);

  const { id } = resolvedParams;

  if (!id) {
    return (
      <main>
        <h1>Error</h1>
        <p>Post ID is missing.</p>
      </main>
    );
  }

  const post = await fetchPost(id);

  if (!post) {
    return (
      <main>
        <h1>Post Not Found</h1>
        <p>The blog post with ID {id} does not exist.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
