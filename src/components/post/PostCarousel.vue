<template>
  <div ref="container" class="post-carousel-container">
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
      <div class="swiper-pagination"></div>
      <PrevButton :size="26" class="swiper-button-prev post-carousel-prev" ref="buttonPrev"/>
      <NextButton :size="26" class="swiper-button-next post-carousel-next" ref="buttonNext"/>
    </div>
  </div>

</template>

<script setup>
import PrevButton from "@/components/buttons/PrevButton.vue";
import NextButton from "@/components/buttons/NextButton.vue";
import { onMounted, ref } from "vue";
import Swiper, { Navigation, Pagination } from "swiper";

const container = ref(null);
const image = ref(null);
const swiperContainer = ref(null);
const buttonNext = ref(null);
const buttonPrev = ref(null);
const swiper = ref(null);
const props = defineProps({
  src: String
});

function updateHeight() {
  container.value.style.height = image.value.height + "px";
}

onMounted(() => {
  // updateHeight()
  swiper.value = new Swiper(swiperContainer.value, {
    modules: [Pagination, Navigation],
    direction: "horizontal",
    autoHeight: true,
    centeredSlides: true,
    loop: true,
    speed: 500,
    spaceBetween: 0,
    effect: "slide",
    allowTouchMove: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".post-carousel-next",
      prevEl: ".post-carousel-prev",
    }
  });


});
</script>

<style lang="scss" scoped>

.post-carousel-container {
  //max-width: 100%;
  background-color: #3399ff;

  img {
    width: 100%;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
}


.swiper-button-next:hover, .swiper-button-prev:hover {
  opacity: 0.5 !important;
}


</style>