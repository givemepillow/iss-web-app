<template>
  <div class="wall">
    <WallPost v-for="post in posts" :key="post.id" :me="me" :post="post" class="wall__post" />
  </div>
</template>

<script setup>

import WallPost from "@/components/common/TheWallPost.vue";

import Post from "@/models/post";
import { useUserInfoStore } from "@/stores/userinfo";

const props = defineProps({
  posts: {
    type: Array[Post],
    default: []
  }
});
const userinfo = useUserInfoStore();
const me = await userinfo.get();

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
    columns: 5;
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
    break-inside: avoid;
    page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
  }
}
</style>