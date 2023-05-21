<template>
  <Teleport to="body">
    <div v-if="open" class="fullscreen" @click="onClick">
      <img
        :src="resolvePictureUrl(props.post.user.id, props.post.pictures[swiper?.realIndex]?.id)"
        alt=""
        class="fullscreen__image"
      >
    </div>
  </Teleport>
  <div ref="carouselElement" class="post-carousel">
    <div ref="swiperContainerElement" class="swiper">
      <div class="swiper-wrapper">
        <img
          v-for="picture in props.post.pictures" :key="picture.id"
          ref="imageElements"
          :src="resolvePictureUrl(props.post.user.id, picture.id)"
          alt=""
          class="swiper-slide"
          @click="onClick"
          @load="onLoad"
        >
      </div>
      <div class="swiper-pagination"></div>
      <IconButton
        ref="buttonPrev"
        :size="1.6"
        :src="nextIcon"
        class="swiper-button-prev post-carousel__button-prev"
        style="transform: rotate(180deg)"
      />
      <IconButton
        ref="buttonNext"
        :size="1.6"
        :src="nextIcon"
        class="swiper-button-next post-carousel__button-next"
      />
      <TextLabel
        :size="11"
        :text="post.pictures[swiper?.realIndex]?.format"
        class="content-type"
      />
    </div>
  </div>
</template>

<script setup>
import nextIcon from "@/assets/icons/next.svg";
import { onMounted, ref } from "vue";
import Swiper, { Navigation, Pagination } from "swiper";
import IconButton from "@/components/buttons/IconButton.vue";
import TextLabel from "@/components/common/TextLabel.vue";
import { resolvePictureUrl } from "@/services/tools";
import Post from "@/models/post";

const carouselElement = ref(null);
const swiperContainerElement = ref(null);
const imageElements = ref(null);
const swiper = ref(null);

const props = defineProps({
  post: {
    type: Post,
    required: true
  }
});

const emits = defineEmits(["create"]);
const open = ref(false);

function onLoad() {
  emits("create", imageElements.value[0].naturalWidth, imageElements.value[0].naturalHeight);
}

function onClick() {
  open.value = !open.value;
}

onMounted(() => {
  swiper.value = new Swiper(swiperContainerElement.value, {
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
  swiperContainerElement.value.focus();
});
</script>

<style lang="scss" scoped>
.content-type {
  position: absolute;
  z-index: 3;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0.65;
}

.post-carousel {
  width: 100%;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
}


</style>