<template>
  <div ref="carouselElement" class="post-carousel">
    <div ref="swiperContainerElement" class="swiper">
      <div class="swiper-wrapper">
        <img
          v-for="picture in props.pictures"
          :key="picture.id"
          ref="imageElements"
          :src="picture.url"
          alt=""
          class="post_carousel__image swiper-slide"
          @load="onLoad"
        >
      </div>
      <div class="swiper-pagination"></div>
      <PrevButton ref="buttonPrev" :size="1.6" class="swiper-button-prev post-carousel__button-prev" />
      <NextButton ref="buttonNext" :size="1.6" class="swiper-button-next post-carousel__button-next" />
    </div>
  </div>

</template>

<script setup>
import PrevButton from "@/components/buttons/PrevButton.vue";
import NextButton from "@/components/buttons/NextButton.vue";
import { onMounted, ref } from "vue";
import Swiper, { Navigation, Pagination } from "swiper";
import Picture from "@/models/picture";

const carouselElement = ref(null);
const swiperContainerElement = ref(null);
const imageElements = ref(null);

const props = defineProps({
  pictures: {
    type: Array[Picture],
    required: true
  }
});

const emits = defineEmits(["create"]);

function onLoad() {
  emits("create", imageElements.value[0].naturalWidth, imageElements.value[0].naturalHeight);
}

onMounted(() => {
  new Swiper(swiperContainerElement.value, {
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
      clickable: true
    },
    navigation: {
      nextEl: ".post-carousel__button-next",
      prevEl: ".post-carousel__button-prev"
    }
  });
});
</script>

<style lang="scss" scoped>
.post-carousel {
  width: 100%;
}

</style>