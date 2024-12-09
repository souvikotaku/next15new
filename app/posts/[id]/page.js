// app/posts/[id]/page.js

// Fetch data for an individual post based on the ID from the URL
async function fetchPost(id) {
  // Mock post data or fetch it from an API/database
  const post = {
    id,
    title: `Blog Post ${id}`,
    content: `This is the content of blog post ${id}.`,
  };

  return post;
}

export default async function Post({ params }) {
  const post = await fetchPost(params.id);

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
