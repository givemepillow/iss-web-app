<template>
  <div class="wall-post  app-card">
    <div class="wall-post__header">
      <div class="wall-post__user">
        <UserLabel :user="props.post.user" />
      </div>
    </div>
    <RouterLink :to="'/posts/' + props.post.id">
      <div class="wall-post__middle">
        <div class="wall-post__carousel">
          <WallPostCarousel :post="props.post" />
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import UserLabel from "@/components/common/UserLabel.vue";
import WallPostCarousel from "@/components/common/WallPostCarousel.vue";
import Post from "@/models/post";
import Me from "@/models/me";


const props = defineProps({
  post: {
    type: Post,
    request: true
  },
  me: Me
});

</script>

<style lang="scss" scoped>
.wall-post {
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  user-select: none;

  &__header {
    padding: 0.5rem;
    display: flex;
    align-items: center;
  }

  &__middle {
    width: 100%;
  }

  &__bottom {
    padding: 0.5rem;
    display: flex;
    align-items: center;
  }

  &__statistics {
    width: 100%;
  }
}
</style>