import { redirect } from "next/navigation";
import { db } from "~/app/db";

const like = async (formData: FormData) => {
  "use server";

  // await sql`INSERT INTO "likes" (post_id) VALUES (${formData.get("post_id")}})`;
  redirect("/");
};

export default async function GetPosts() {
  const posts = await db.posts.findMany();

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
            <form action={like}>
              <input type="hidden" name="post_id" value={post.id} />
              <input type="submit" />
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
