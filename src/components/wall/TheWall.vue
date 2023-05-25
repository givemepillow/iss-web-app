<template>
  <div class="wall">
    <WallPost v-for="post in posts" :key="post.id" :post="post" class="wall__post" />
  </div>
</template>

<script setup>

import WallPost from "@/components/wall/WallPost.vue";
import { ref, onBeforeMount, onMounted } from "vue";

import { getPosts } from "@/services/api";
import Post from "@/models/post";

const posts = ref([]);

let response = await getPosts();
let result = await response.json();
for (let json of result) {
  posts.value.push(new Post(json));
}

</script>

<style lang="scss" scoped>
@media (max-width: 480px) {
  .wall {
    columns: 2;
  }
}

@media (min-width: 480px) {
  .wall {
    columns: 3;
  }
}


@media (min-width: 640px) {
  .wall {
    columns: 4;
  }
}

@media (min-width: 960px) {
  .wall {
    columns: 6;
  }
}

.wall {
  width: 100%;
  user-select: none;
  column-gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 4rem;

  &__post {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>