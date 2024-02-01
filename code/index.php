<?php

$conn = new mysqli('localhost', 'root', 'foobar123', 'fullstack-is-fun');
$result = $conn->query("SELECT id, title, body FROM posts");
$conn->close();

?>

<h1>Blog posts</h1>

<ul>
  <?php while ($row = $result->fetch_assoc()) : ?>
    <li><?= $row['title'] ?></li>
  <?php endwhile; ?>
</ul>
