<template>
  <div ref="container" class="wall">
    <div v-for="post in posts" :key="post.id" class="wall__post">
      <WallPost :post="post"/>
    </div>
  </div>
</template>

<script setup>

import WallPost from "@/components/wall/WallPost.vue";
import { ref } from "vue";

import { examples } from "@/models/examples";

const container = ref(null);
let posts = examples;
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

  &__post {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>