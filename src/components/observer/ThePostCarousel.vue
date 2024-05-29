<template>
  <Teleport to="body">
    <div v-if="open" class="fullscreen" @click="onClick">
      <img
        :src="resolvePictureSrc(props.post.user.id, props.post.pictures[swiper?.realIndex]?.id)"
        alt=""
        class="fullscreen__image"
      >
    </div>
  </Teleport>
  <div ref="carouselElement" class="post-carousel" @mouseover="">
    <div ref="swiperContainerElement" class="swiper">
      <div class="swiper-wrapper">
        <img
          v-for="picture in props.post.pictures" :key="picture.id"
          ref="imageElements"
          :src="resolvePictureSrc(props.post.user.id, picture.id)"
          alt=""
          class="swiper-slide"
          @click="onClick"
        >
      </div>
      <div class="swiper-pagination"></div>
      <IconButton
        :class="{'swiper-navigation-disabled': isNavigationHidden}"
        :size="1.6"
        :src="nextIcon"
        class="swiper-button-prev post-carousel__button-prev"
        style="transform: rotate(180deg)"
        @click="swiper?.slidePrev()"
      />
      <IconButton
        :class="{'swiper-navigation-disabled': isNavigationHidden}"
        :size="1.6"
        :src="nextIcon"
        class="swiper-button-next post-carousel__button-next"
        @click="swiper?.slideNext()"
      />
      <TextIconButton
        :font-size="10.5"
        :size="1.75"
        :src="formatIcon"
        :text="post.pictures[swiper?.realIndex]?.format"
        class="content-type app-card"
      />
      <TextIconButton
        v-if="numberLabel"
        :font-size="10.5"
        :size="1.75"
        :src="collageIcon"
        :text="numberLabel"
        class="number app-card"
      />
      <TextIconButton
        :font-size="10.5"
        :size="1.75"
        :src="resolutionIcon"
        :text="post.pictures[swiper?.realIndex]?.width +
         ' × ' +
         post.pictures[swiper?.realIndex]?.height"
        class="resolution app-card"
      />
      <TextIconButton
        :font-size="10.5"
        :size="1.75"
        :src="downloadIcon"
        :text="
         Math.round((props.post.pictures[swiper?.realIndex]?.size / 1000000) * 100) / 100 >= 1 ?  ((Math.round((props.post.pictures[swiper?.realIndex]?.size / 1000000) * 100)) / 100 + ' MB') : ((Math.round((props.post.pictures[swiper?.realIndex]?.size / 1000) * 100)) / 100 + ' KB')"
        class="size app-card"
        @click="onDownload"
      />
    </div>
    <a ref="aElement" style="display:none"></a>
  </div>
</template>

<script setup>
import nextIcon from "@/assets/icons/next.svg";
import { onMounted, ref } from "vue";
import Swiper, { Navigation, Pagination } from "swiper";
import IconButton from "@/components/buttons/IconButton.vue";
import Post from "@/models/post";
import { resolveOriginalPictureSrc, resolvePictureSrc } from "@/services/api";
import TextIconButton from "@/components/buttons/IconTextButton.vue";
import downloadIcon from "@/assets/icons/download.svg";
import collageIcon from "@/assets/icons/collage.svg";
import formatIcon from "@/assets/icons/format.svg";
import resolutionIcon from "@/assets/icons/resolution.svg";

const carouselElement = ref(null);
const swiperContainerElement = ref(null);
const imageElements = ref(null);
const swiper = ref(null);

const numberLabel = ref("");


const props = defineProps({
  post: {
    type: Post,
    required: true
  }
});

function updateLabel() {
  if (swiper.value?.slides?.length > 1) {
    numberLabel.value = `${(swiper.value?.realIndex ?? 0) + 1}/${swiper.value?.slides?.length}`;
  } else {
    numberLabel.value = "";
  }
}


const isNavigationHidden = ref(false);
const open = ref(false);
const aElement = ref(null);

function onClick() {
  open.value = !open.value;
}

async function onDownload() {
  let url = resolveOriginalPictureSrc(props.post?.user.id, props.post?.pictures[swiper.value?.realIndex]?.id);
  aElement.value.href = url;
  aElement.value.download = url;
  aElement.value.click();
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
    navigation: {},
    on: {
      update: () => {
        updateLabel();
      },
      slideChange: () => {
        updateLabel();
      }
    }
  });
  swiperContainerElement.value.focus();
  isNavigationHidden.value = swiper.value.slides.length === 1;
});
</script>

<style lang="scss" scoped>
.content-type, .number, .resolution, .size {
  position: absolute;
  z-index: 3;
  opacity: 0.85;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  transition: all ease-in-out 0.15s;
  cursor: default !important;


}


.number {
  right: 0.5rem;
  top: 0.5rem;
}

.resolution {
  left: 0.5rem;
  bottom: 0.5rem;

}

.size {
  right: 0.5rem;
  bottom: 0.5rem;
  cursor: pointer !important;

  &:hover {
    opacity: 1;
  }
}

.content-type {
  left: 0.5rem;
  top: 0.5rem;
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

.swiper-navigation-disabled {
  display: none;
}

</style>