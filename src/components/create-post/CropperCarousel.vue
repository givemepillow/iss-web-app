<template>
  <div class="cropper-carousel">
    <div
      :class="{'hidden-top-tools': !isToolsShowed, 'hidden-tools': !isToolsShowed}"
      class="cropper-carousel__tools cropper-carousel__tools--top"
    >
      <DeleteButton
        :size="30"
        class="cropper-carousel__delete-button"
        @click="onClickDelete"
      />
      <SaveButton
        :class="{'original-saved': croppers[swiper?.realIndex]?.isOriginalSaved}"
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
            @upload="onFileUpload" />
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
      :class="{'hidden-bottom-tools': !isToolsShowed, 'hidden-tools': !isToolsShowed}"
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
      <CropperCarouselZoomSlider
        :class="{'hidden-zoom-slider': !isZoomSliderShowed    }"
        :value="croppers[swiper?.realIndex]?.currentZoom ?? 0"
        class="cropper-carousel__zoom-slider"
        @zoomChange="onZoomChange"
      />
      <MoveLeftButton
        :class="{disabled: !isMoveLeftShowed}"
        :size="30"
        class="cropper-carousel__move-left"
        @click="onClickMoveLeft"
      />
      <MoveRightButton
        :class="{disabled: !isMoveRightShowed}"
        :size="30"
        class="cropper-carousel__move-right"
        @click="onClickMoveRight"
      />

    </div>
    <div
      :class="{
      'hidden-bottom-tools': !isRatioToolsShowed,
      'hidden-tools': !isRatioToolsShowed
    }"
      class="cropper-carousel__tools cropper-carousel__tools--vertical-ratio">
      <OriginalRatioButton @click="onClickRatio(null)" />
      <TextButton text="2:3" @click="onClickRatio(2/3)" />
      <TextButton text="4:5" @click="onClickRatio(4/5)" />
      <TextButton text="9:16" @click="onClickRatio(9/16)" />
      <TextButton text="9:18" @click="onClickRatio(9/18)" />
      <TextButton text="9:21" @click="onClickRatio(9/21)" />
    </div>
    <div
      :class="{
      'hidden-bottom-tools': !isRatioToolsShowed,
      'hidden-tools': !isRatioToolsShowed
    }"
      class="cropper-carousel__tools cropper-carousel__tools--horizontal-ratio">
      <SquareRatioButton @click="onClickRatio(1)" />
      <TextButton text="3:2" @click="onClickRatio(3/2)" />
      <TextButton text="4:3" @click="onClickRatio(4/3)" />
      <TextButton text="5:4" @click="onClickRatio(5/4)" />
      <TextButton text="16:9" @click="onClickRatio(16/9)" />
      <TextButton text="21:9" @click="onClickRatio(21/9)" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import Swiper, { Pagination, Navigation } from "swiper";
import CropperCarouselItem from "@/components/create-post/CropperCarouselItem.vue";
import CropperCarouselZoomSlider from "@/components/create-post/CropperCarouselZoomSlider.vue";
import CropperCarouselFileUploader from "@/components/create-post/CropperCarouselFileUploader.vue";
import NextButton from "@/components/buttons/NextButton.vue";
import PrevButton from "@/components/buttons/PrevButton.vue";
import CropButton from "@/components/buttons/CropButton.vue";
import ZoomButton from "@/components/buttons/ZoomButton.vue";
import DeleteButton from "@/components/buttons/DeleteButton.vue";
import RotateButton from "@/components/buttons/RotateButton.vue";
import MoveLeftButton from "@/components/buttons/MoveLeftButton.vue";
import MoveRightButton from "@/components/buttons/MoveRightButton.vue";
import SaveButton from "@/components/buttons/SaveButton.vue";
import OriginalRatioButton from "@/components/buttons/OriginalRatioButton.vue";
import TextButton from "@/components/buttons/TextButton.vue";
import SquareRatioButton from "@/components/buttons/SquareRatioButton.vue";

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
const currentZoom = ref(0);
let index = 0;

const isRatioToolsShowed = ref(false);
const isToolsShowed = ref(false);
const isMoveRightShowed = ref(false);
const isMoveLeftShowed = ref(false);
const isZoomSliderShowed = ref(false);

function toggle(isShowed) {
  isShowed.value = !isShowed.value;
}

function isPictureSlide() {
  if (swiper.value == null) return false;
  const index = swiper.value.realIndex;
  return index === props.maxlength - 1 || index < links.value.length;
}

function isFirstPictureSlide() {
  return isPictureSlide() && swiper.value.realIndex === 0;
}

function isLastPictureSlide() {
  return isPictureSlide() && swiper.value.realIndex === links.value.length - 1;
}

function onClickRatio(r) {
  if (r == null) {
    let naturalRatio = croppers.value[swiper.value.realIndex].naturalRatio();
    currentRatio.value = naturalRatio > 2 ? 21 / 9 : naturalRatio;
  } else {
    currentRatio.value = r;
  }
}


function onClickRotate() {
  croppers.value[swiper.value.realIndex].rotate();
}

function onClickZoom() {
  toggle(isZoomSliderShowed);
  isRatioToolsShowed.value = false;
}

function onClickCrop() {
  toggle(isRatioToolsShowed);
  isZoomSliderShowed.value = false;
}

function onClickMoveLeft() {
  let temp = croppers.value[swiper.value.realIndex];
  croppers.value[swiper.value.realIndex] = croppers.value[swiper.value.realIndex - 1];
  croppers.value[swiper.value.realIndex - 1] = temp;
  let elements = links.value.splice(swiper.value.realIndex, 1);
  links.value.splice(swiper.value.realIndex - 1, 0, elements[0]);
  swiper.value.slidePrev(0);
}

function onClickMoveRight() {
  let temp = croppers.value[swiper.value.realIndex];
  croppers.value[swiper.value.realIndex] = croppers.value[swiper.value.realIndex + 1];
  croppers.value[swiper.value.realIndex + 1] = temp;
  let elements = links.value.splice(swiper.value.realIndex, 1);
  links.value.splice(swiper.value.realIndex + 1, 0, elements[0]);
  swiper.value.slideNext(0);
}

function onClickDelete() {
  const index = swiper.value.realIndex;
  links.value.splice(index, 1);
  if (index === links.value.length || index === props.maxlength - 1) {
    swiper.value.slidePrev(0);
  }
}


function onClickSave() {
  croppers.value[swiper.value.realIndex].save();
}

function onZoomChange(v) {
  croppers.value[swiper.value.realIndex].zoom(v);
}

function updateTools() {
  isToolsShowed.value = isPictureSlide();
  isMoveLeftShowed.value = !isFirstPictureSlide() && isPictureSlide();
  isMoveRightShowed.value = !isLastPictureSlide() && isPictureSlide();
  isRatioToolsShowed.value = isPictureSlide() && isRatioToolsShowed.value;
  isZoomSliderShowed.value = isPictureSlide() && isZoomSliderShowed.value;
}

function onFileUpload(files) {
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
    },
    on: {
      update: () => {
        updateTools();
      },
      slideChange: () => {
        updateTools();
      }
    }
  });
});

onUpdated(() => {
  updateTools();
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
    $indent: 7%;
    z-index: 2;
    width: 100%;
    height: 0;
    position: absolute;
    display: flex;
    align-items: center;
    padding: 0 1.5rem 0 1.5rem;
    column-gap: 0.75rem;
    transition: all ease-in-out 200ms;

    &--top {
      top: calc($indent);
    }

    &--bottom {
      bottom: calc($indent);
    }

    &--vertical-ratio, &--horizontal-ratio {
      justify-content: center;
      column-gap: 0.75rem;
    }

    &--vertical-ratio {
      bottom: calc($indent * 2);
    }

    &--horizontal-ratio {
      bottom: calc($indent * 3);
    }

  }

  &__move-left, &__save-button {
    margin-left: auto;

  }


  &__move-left, &__move-right {
    transition: all ease-in-out 200ms;
  }

  &__zoom-slider {
    width: 50%;
    border-radius: 30px;
    transition: all ease-in-out 300ms;
  }


  &__rotate-button {
    transition: all ease-in-out 300ms;


    &:hover {
      transform: rotate(90deg);
    }
  }

  &__zoom-button {
    transition: all ease-in-out 300ms;

    &:hover {
      transform: rotate(45deg);
    }
  }
}

.disabled {
  margin-top: 2rem;
  opacity: 0;
  pointer-events: none;
  cursor: none;
}

.hidden-tools {
  opacity: 0;
  pointer-events: none;
  cursor: none;
  column-gap: 0;
}

.hidden-top-tools {
  top: 3%;
}

.hidden-bottom-tools {
  bottom: 3%;
}

.hidden-zoom-slider {
  width: 0;
  opacity: 0;
}

.original-saved {
  background-color: rgba(81, 235, 9, 0.75);
}
</style>