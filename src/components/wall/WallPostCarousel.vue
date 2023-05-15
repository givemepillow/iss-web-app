<template>
  <div ref="container" class="wall-post-carousel">
    <div ref="swiperContainer" class="swiper">
      <div class="swiper-wrapper">
        <img
          v-for="picture in props.pictures"
          :key="picture.id"
          :src="picture.url"
          alt=""
          class="swiper-slide"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Swiper, { Pagination, Autoplay } from "swiper";
import Picture from "@/models/picture";

const container = ref(null);
const image = ref(null);


const swiperContainer = ref(null);
const swiper = ref(null);
const props = defineProps({
  pictures: {
    type: Array[Picture],
    required: true
  }
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

.wall-post-carousel {
  background-color: #3399ff;
  width: 100%;
}


</style>