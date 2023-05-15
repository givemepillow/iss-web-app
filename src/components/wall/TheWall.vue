<template>
  <div ref="container" class="wall">
    <div class="wall__post">
      <WallPost />
    </div>
    <div class="wall__post">
      <WallPost :post="post" />
    </div>
    <div class="wall__post">
      <WallPost />
    </div>
    <div class="wall__post">
      <WallPost />
    </div>
    <div class="wall__post">
      <WallPost />
    </div>
    <div class="wall__post">
      <WallPost />
    </div>
    <div class="wall__post">
      <WallPost />
    </div>
    <div class="wall__post">
      <WallPost />
    </div>
    <div class="wall__post">
      <WallPost />
    </div>
    <div class="wall__post">
      <WallPost />
    </div>
    <div class="wall__post">
      <WallPost />
    </div>
    <div class="wall__post">
      <WallPost />
    </div>
    <div class="wall__post">
      <WallPost />
    </div>
    <div class="wall__post">
      <WallPost />
    </div>
    <div class="wall__post">
      <WallPost />
    </div>
  </div>
</template>

<script setup>

import WallPost from "@/components/wall/WallPost.vue";
import { ref } from "vue";
import Post from "@/models/post";
import Picture from "@/models/picture";

const container = ref(null);
let post = new Post({
  pictures: [new Picture({
    url: 'https://i.pinimg.com/564x/b7/ee/a5/b7eea5a239b31fc678e5b674a92f8a1d.jpg'
  })]
})
</script>

<style lang="scss" scoped>

@media (max-width: 650px) {
  .wall {
    columns: 2;
  }
}

@media (min-width: 650px) {
  .wall {
    columns: 5;
  }
}

.wall {
  width: 100%;
  user-select: none;
  column-gap: 0.5rem;
  padding: 0.5rem;

  &__post {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>