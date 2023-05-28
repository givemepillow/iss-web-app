<template>
  <div ref="container" class="wall-post-carousel">
    <div class="number">
      <TextLabel v-if="numberLabel" :size="10" :text="numberLabel" />
    </div>
    <div ref="swiperContainer" class="swiper">
      <div class="swiper-wrapper">
        <img
          v-for="picture in props.post.pictures"
          :key="picture.id"
          :src="resolvePictureSrc(post.user.id, picture.id)"
          alt=""
          loading="lazy"
          class="swiper-slide wall-post-carousel__image"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Swiper, { Pagination, Autoplay } from "swiper";
import TextLabel from "@/components/common/TextLabel.vue";
import Post from "@/models/post";
import { resolvePictureSrc } from "@/services/api";

const container = ref(null);
const image = ref(null);

const swiperContainer = ref(null);
const swiper = ref(null);
const props = defineProps({
  post: {
    type: Post,
    required: true
  }
});

const numberLabel = ref("");

function updateNumberLabel() {
  if (swiper.value?.slides?.length > 1) {
    numberLabel.value = `${(swiper.value?.realIndex ?? 0) + 1}/${swiper.value?.slides?.length}`;
  } else {
    numberLabel.value = "";
  }
}

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
    },
    on: {
      update: () => {
        updateNumberLabel();
      },
      slideChange: () => {
        updateNumberLabel();
      }
    }
  });
});
</script>

<style lang="scss" scoped>

.wall-post-carousel {
  width: 100%;
}

.number {
  position: absolute;
  top: 0.5rem;
  z-index: 2;
  color: whitesmoke;
  right: 0.5rem;
  opacity: 0.75;
}


</style>