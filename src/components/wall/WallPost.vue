<template>
  <div class="wall-post">
    <div class="wall-post__header">
      <div class="wall-post__user">
        <UserLabel :user="post.user" />
      </div>
    </div>
    <RouterLink :to="'/posts/' + post.id">
      <div class="wall-post__middle">
        <div class="wall-post__carousel">
          <WallPostCarousel :post="post" />
        </div>
      </div>
    </RouterLink>
    <div class="wall-post__bottom">
      <div class="wall-post__statistics">
        <PostObserverStatistics />
      </div>
    </div>
  </div>
</template>

<script setup>
import UserLabel from "@/components/common/UserLabel.vue";
import WallPostCarousel from "@/components/wall/WallPostCarousel.vue";
import PostObserverStatistics from "@/components/observer/PostObserverStatistics.vue";
import Post from "@/models/post";


const props = defineProps({
  post: {
    type: Post,
    request: true
  }
});

</script>

<style lang="scss" scoped>
.wall-post {
  width: 100%;
  background-color: var(--app-default-color);
  border-radius: var(--app-border-radius);
  box-shadow: var(--app-default-shadow);
  overflow: hidden;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  border: var(--app-default-border);

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