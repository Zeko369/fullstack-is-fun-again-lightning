<?php

$data =

?>

<div>
    <h1>Posts</h1>
    <ul>
        <?php foreach($posts as $post) { ?>
            <li><?= $post['title'] ?></li>
        <?php } ?>
    </ul>
</div>

<script>
    $(document).on('load', () => {
        $('button#confetti').on('click', () => {
            confettiLibFromCDN().fire();
        })
    })
</script>
