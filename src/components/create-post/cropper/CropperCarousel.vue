<template>
  <div class="cropper-carousel">
    <div
      class="cropper-carousel__tools cropper-carousel__tools--top"
    >
      <DeleteButton
        :size="30"
        class="cropper-carousel__delete-button"
        @click="onClickDelete"
      />
      <SaveButton
        :size="30"
        class="cropper-carousel__save-button"
        @click="onClickSave"
      />
    </div>
    <div ref="swiperElement" class="cropper-carousel__swiper swiper">
      <div class="cropper-carousel__swiper-wrapper swiper-wrapper">
        <CropperCarouselItem
          v-for="[_, v] of links.entries()"
          :key="v.key"
          ref="croppers"
          :ratio="currentRatio"
          :src="v.file"
          class="cropper-carousel__swiper-slide swiper-slide"
        />
        <div
          v-if="links.length < props.maxlength"
          class="cropper-carousel__swiper-slide swiper-slide">
          <CropperCarouselFileUploader
            @upload="onUpload" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <PrevButton
        :size="26"
        class="cropper-carousel__swiper-button-prev swiper-button-prev"
      />
      <NextButton
        :size="26"
        class=" cropper-carousel__swiper-button-next swiper-button-next"
      />
    </div>
    <div
      class="cropper-carousel__tools cropper-carousel__tools--bottom"
    >
      <RotateButton
        :size="30"
        class="cropper-carousel__rotate-button"
        @click="onClickRotate"
      />
      <CropButton
        :size="30"
        class="cropper-carousel__crop-button"
        @click="onClickCrop"
      />
      <ZoomButton
        :size="30"
        class="cropper-carousel__zoom-button"
        @click="onClickZoom"
      />
      <MoveLeftButton
        :size="30"
        class="cropper-carousel__move-left"
        @click="onClickMoveLeft"
      />
      <MoveRightButton
        :size="30"
        class="cropper-carousel__move-right"
        @click="onClickMoveRight"
      />
      <CropperCarouselZoomSlider
        class="cropper-carousel__zoom-slider"
        @zoomChange="onZoomChange"
      />
      <CropperCarouselRatioMenu
        class="cropper-carousel__ratio-menu"
        @ratioChange="onRationChange"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import Swiper, { Pagination, Navigation } from "swiper";
import CropperCarouselItem from "@/components/create-post/cropper/CropperCarouselItem.vue";
import CropperCarouselZoomSlider from "@/components/create-post/cropper/CropperCarouselZoomSlider.vue";
import CropperCarouselRatioMenu from "@/components/create-post/cropper/CropperCarouselRatioMenu.vue";
import CropperCarouselFileUploader from "@/components/create-post/cropper/CropperCarouselFileUploader.vue";
import NextButton from "@/components/buttons/NextButton.vue";
import PrevButton from "@/components/buttons/PrevButton.vue";
import CropButton from "@/components/buttons/CropButton.vue";
import ZoomButton from "@/components/buttons/ZoomButton.vue";
import DeleteButton from "@/components/buttons/DeleteButton.vue";
import RotateButton from "@/components/buttons/RotateButton.vue";
import MoveLeftButton from "@/components/buttons/MoveLeftButton.vue";
import MoveRightButton from "@/components/buttons/MoveRightButton.vue";
import SaveButton from "@/components/buttons/SaveButton.vue";

const props = defineProps({
  maxlength: {
    type: Number,
    required: false,
    default: 10
  }
});

const links = ref([]);
const swiperElement = ref(null);
const croppers = ref([]);
const swiper = ref(null);
const currentRatio = ref(1);
let index = 0;

function onClickRotate() {
  croppers.value[swiper.value.realIndex].rotate();
}

function onClickZoom(v) {

}

function onClickCrop() {

}

function onClickMoveLeft() {

}

function onClickMoveRight() {

}

function onClickDelete() {
  links.value.splice(swiper.value.realIndex, 1);
}


function onClickSave() {
  croppers.value[swiper.value.realIndex].save();
}


function onRationChange(r) {

}

function onZoomChange(v) {
  croppers.value[swiper.value.realIndex].zoom(v);
}

function onUpload(files) {
  Array.from(files).forEach((f) => {
    if (links.value.length >= props.maxlength) return;
    links.value.push({
      key: index++,
      file: URL.createObjectURL(f)
    });
  });
}

onMounted(() => {
  swiper.value = new Swiper(swiperElement.value, {
    observer: true,
    modules: [Navigation, Pagination],
    direction: "horizontal",
    loop: false,
    speed: 300,
    spaceBetween: 1,
    effect: "slide",
    allowTouchMove: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
});

onUpdated(() => {
  swiper.value.update();
});

</script>

<style lang="scss" scoped>
.cropper-carousel {
  height: 100%;
  width: 100%;
  user-select: none;

  &__swiper-button-prev, &__swiper-button-next {
    transition: all ease-in-out 150ms;
  }

  &__tools, {
    $tools-height: 10%;
    z-index: 2;
    width: 100%;
    height: $tools-height;
    position: absolute;
    display: flex;
    align-items: center;
    row-gap: 1rem;
    padding: 1.5rem;
    column-gap: 0.7rem;

    &--top {
      bottom: calc(100% - $tools-height);
    }

    &--bottom {
      bottom: 0;
    }
  }

  &__move-left, &__save-button {
    margin-left: auto;
  }

  &__zoom-slider, &__ratio-menu {
    display: none;
    position: absolute;
  }


  &__crop-button, &__zoom-button, &__rotate-button {
    transition: all ease-in-out 300ms;

    &:hover {
      transform: rotate(360deg);
    }
  }
}
</style>