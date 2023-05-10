<template>
  <RouterLink to="/post" >
    <div ref="container" class="wall-post-container">
      <div ref="swiperContainer" class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img ref="image" :src="props.src" alt="">
          </div>
          <div class="swiper-slide">
            <img :src="props.src" alt="">
          </div>
          <div class="swiper-slide">
            <img :src="props.src" alt="">
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Swiper, { Pagination, Autoplay } from "swiper";

const container = ref(null);
const image = ref(null);


const swiperContainer = ref(null);
const swiper = ref(null);
const props = defineProps({
  src: String
});

onMounted(() => {
  swiper.value = new Swiper(swiperContainer.value, {
    modules: [Pagination, Autoplay],
    direction: "horizontal",
    loop: true,
    speed: 500,
    spaceBetween: 0,
    effect: "slide",
    allowTouchMove: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      hideOnClick: true
    },
    autoplay: {
      delay: Math.random() * (10000 - 3000) + 3000
    }
  });
});
</script>

<style lang="scss" scoped>

.wall-post-container {
  background-color: #3399ff;

  img {
    width: 100%;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }

  .swiper-button-next:hover, .swiper-button-prev:hover {
    opacity: 0.5 !important;
  }
}


</style>