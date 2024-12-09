// app/api/posts/route.js
export async function GET() {
  const posts = [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Introduction to Next.js" },
    { id: "3", title: "Advanced JavaScript" },
  ];

  return new Response(JSON.stringify(posts), { status: 200 });
}
