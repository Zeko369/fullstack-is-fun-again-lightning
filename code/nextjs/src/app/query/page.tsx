import { db } from "~/app/db";

export default async function GetPosts() {
  const posts = await db.posts.findMany();

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
