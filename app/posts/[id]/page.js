async function fetchPost(id) {
  const res = await fetch("http://localhost:3000/api/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts = await res.json();
  return posts.find((post) => post.id === id) || null;
}

export default async function Post({ params }) {
  const { id } = params;

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
