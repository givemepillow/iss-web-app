<template>
  <div class="wall">
    <TransitionGroup name="list">
      <WallPost v-for="post in props.posts" :key="post.id" :me="props.me" :post="post" class="wall__post" />
    </TransitionGroup>
  </div>
</template>

<script setup>

import WallPost from "@/components/common/TheWallPost.vue";

const props = defineProps({
  posts: Array[Post],
  me: Me
});

import Post from "@/models/post";
import Me from "@/models/me";

</script>

<style lang="scss" scoped>

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

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


@media (min-width: 720px) {
  .wall {
    columns: 4;
  }
}

@media (min-width: 1080px) {
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
    break-inside: avoid;
    page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
  }
}
</style>