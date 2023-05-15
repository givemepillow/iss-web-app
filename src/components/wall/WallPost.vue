<template>
  <div class="wall-post">
    <div class="wall-post__header">
      <div class="wall-post__user">
        <UserLabel />
      </div>
    </div>
    <div class="wall-post__middle">
      <div class="wall-post__carousel">
        <WallPostCarousel :pictures="props.post.pictures" />
      </div>
    </div>
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
    default: new Post(),
    request: true
  }
});
</script>

<style lang="scss" scoped>
.wall-post {
  width: 100%;
  background-color: var(--default-color);
  border-radius: var(--border-radius);
  box-shadow: var(--default-box-shdow);
  overflow: hidden;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;

  &__header {
    padding: 0.5rem;
    display: flex;
    align-items: center;
  }

  &__middle {

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