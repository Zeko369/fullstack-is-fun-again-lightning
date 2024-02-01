---
fonts:
  sans: 'Inter'
---

# Fullstack can be fun (again)

Fran Zekan

---

# def. `full-stack`

<li v-click>
Writing server and client bugs
</li>

<img src="/assets/gpt.png" class="my-2" v-click>

<h2 v-click class="mt-4">
"Business logic + (Database) + Client side interactivity"
</h2>

---

# What do I mean by fun and easy?

- No boilerplate
- Easy to add server features
- Easy to add interactive features
- Great DX (editor autocomplete, ...)

---

# PHP 🙈

```php {all|4|11-13}
<?php

$conn = new mysqli('localhost', 'root', 'foobar123', 'fullstack-is-fun');
$result = $conn->query("SELECT id, title FROM posts");

?>

<h1>Blog posts</h1>

<ul>
  <?php while ($row = $result->fetch_assoc()) : ?>
    <li><?= $row['title'] ?></li>
  <?php endwhile; ?>
</ul>
```

---

# Interactivity jQuery... 🫠

```php {16-22}
<?php

$conn = new mysqli('localhost', 'root', 'foobar123', 'fullstack-is-fun');
$result = $conn->query("SELECT id, title FROM posts");

?>

<h1>Blog posts</h1>

<ul>
  <?php while ($row = $result->fetch_assoc()) : ?>
    <li><?= $row['title'] ?></li>
  <?php endwhile; ?>
</ul>

<script>
    $(document).ready(function() {
        $('button#submit').on('click', function() {
            toastLibraryWePulledFromSomeCDN().fire({title: 'Hello there', body: 'General Kenobi'});
        })
    })
</script>
```

---
layout: two-cols-header
---

# What did we do to fix this?

::left::

<img v-click src="/assets/graphql.png" class="w-80">

::right::

<img v-click src="/assets/react.png" class="w-80">

---

# GraphQL Server

```ts
const schema = gql`
  type Post {
    id: Int!
    title: String!
  }

  type Query {
    posts: [Post!]!
  }
`;

const resolvers: IResolvers = {
  Query: {
    async posts(root, args, ctx, info) {
      return await db.posts.findMany();
    },
  },
};
```

---

# GraphQL Query

```tsx
const postsQuery = graphql(/* GraphQL */ `
  query postsQuery {
    posts {
      id
      title
    }
  }
`);
```

<div v-click>
```bash
npx graphql-codegen
```
</div>

<div v-click>
```ts
// ... a bunch of genearted typescript

type QuerySomething = {}
type MutationSomethingSomething = never;

type AreYouReallyReadingThis = false;

type foo<K infer 'true'> = K[]
```
</div>

---

# GraphQL Client

```tsx
function App() {
  const { loading, error, data } = useQuery(postsQuery);

  return (
    <div id="blog">
      <h1>Blog posts</h1>

      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      {!loading && !error && data && (
        <ul>
          {data.posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

# Hmm...

<h2>
    This is 7x the amount of code
</h2>

<ul v-click class="mt-10">
    <li>❌ No boilerplate</li>
    <li>❌ Easy to add server features</li>
    <li>❌ Easy to add interactive features</li>
    <li class="decoration-line-through">✅ Great DX (editor autocomplete, ...)</li>
</ul>

---
layout: two-cols-header
---

# Course correction

Great but mostly evolution not revolution

::left::

<img src="/assets/blitz.png" class="w-80">

::right::

<img src="/assets/t3.svg" class="w-80">

---
clicks: 3
---

# Next.js App Router

<div class="grid grid-cols-2 grid-gap-x-2">

```tsx {all|4|10-12}{at:1}
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
```

<div v-click="1" style="margin: var(--slidev-code-margin) !important">

```php {all|4|11-13}{at:1}
<?php

$conn = new mysqli('localhost', 'root', 'foobar123', 'fullstack-is-fun');
$result = $conn->query("SELECT id, title FROM posts");

?>

<h1>Blog posts</h1>

<ul>
  <?php while ($row = $result->fetch_assoc()) : ?>
    <li><?= $row['title'] ?></li>
  <?php endwhile; ?>
</ul>
```
</div>
</div>

---

# Next.js App Router - Interactive client

```tsx
'use client'

import { toast } from 'some-toast-library'

export const ConfirmButton = () => {
  return <button onClick={() => toast('Hello there')}>Click me</button>
}
```

---

# Next.js App Router - Interactive client

```tsx {16}
import { db } from "~/app/db";
import { ConfirmButton } from './confirm'

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
      
      <ConfirmButton />
    </div>
  );
}
```

---

# But I don't like Next13 / RSC / Triangle Company

Try it again (WITH an open mind), you'll probably like it
