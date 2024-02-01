import { db } from "~/app/db";
import { Suspense } from "react";
import { redirect } from "next/navigation";

const SeedDb = async () => {
  if ((await db.posts.count()) === 0) {
    await db.posts.createMany({
      data: [
        { title: "First blogpost", body: "" },
        { title: "Remix is good", body: "" },
        { title: "Next v Remix", body: "" },
        { title: "jQuErY", body: "" },
      ],
    });
  }

  return redirect("/query");
};

export default async function Home() {
  return (
    <Suspense fallback="Seeding DB">
      <SeedDb />
    </Suspense>
  );
}
