<template>
  <div ref="container" class="post-item-container">
    <div class="carousel">
      <PostCarousel src="https://i.pinimg.com/originals/da/6e/0f/da6e0f93ccbb020eb4aebdcff186cdef.gif" />
    </div>
    <div class="info">
      <PostInfo></PostInfo>
    </div>
  </div>
</template>

<script setup>

import PostCarousel from "@/components/post/PostCarousel.vue";
import PostInfo from "@/components/post/PostInfo.vue";
import { ref } from "vue";

const container = ref(null);


</script>

<style lang="scss" scoped>

@media (max-width: 650px) {
  .post-item-container {
    grid-template-columns: 100%;
  }
}


@media (min-width: 650px) {
  .post-item-container {
    grid-template-columns: minmax(0, calc(100vh * 0.75)) 35%;
    grid-gap: 0.5em;
    margin-top: 1em;
  }
}

.post-item-container {
  display: grid;
  width: 100%;
  justify-content: center;
  grid-template-rows: auto;


  .carousel {
    width: 100%;
    align-self: center;
    align-content: center;
    background-color: palegoldenrod;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }

  .info {
    width: 100%;
    text-align: center;
    background-color: mediumaquamarine;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
}
</style>