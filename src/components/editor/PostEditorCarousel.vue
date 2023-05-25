<template>
  <div class="cropper-carousel">
    <div
      :class="{'hidden-top-tools': !isToolsShowed, 'hidden-tools': !isToolsShowed}"
      class="cropper-carousel__tools cropper-carousel__tools--top"
    >
      <IconButton
        :size="2"
        :src="deleteIcon"
        class="cropper-carousel__delete-button"
        @click="onClickDelete"
      />
      <IconButton
        :class="{'original-saved': cropperElements[swiper?.realIndex]?.isOriginalSaved}"
        :size="2"
        :src="saveIcon"
        class="cropper-carousel__save-button"
        @click="onClickSaveOriginal"
      />
    </div>
    <div ref="swiperElement" class="cropper-carousel__swiper swiper">
      <div class="cropper-carousel__swiper-wrapper swiper-wrapper">
        <CropperCarouselItem
          v-for="[_, v] of links.entries()"
          :key="v.key"
          ref="cropperElements"
          :ratio="currentRatio"
          :src="v.url"
          :file="v.file"
          class="cropper-carousel__swiper-slide swiper-slide"
          @created="onCreated"
        />
        <div
          v-if="links.length < props.maxlength"
          class="cropper-carousel__swiper-slide swiper-slide">
          <CropperCarouselFileUploader
            @upload="onFileUpload" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <IconButton
        :size="1.8"
        :src="nextIcon"
        class="cropper-carousel__swiper-button-prev swiper-button-prev"
        ref="buttonPrev"
        style="transform: rotate(180deg)"
      />
      <IconButton
        :size="1.8"
        :src="nextIcon"
        ref="buttonNext"
        class="cropper-carousel__swiper-button-next swiper-button-next"
      />
    </div>
    <div
      :class="{'hidden-bottom-tools': !isToolsShowed, 'hidden-tools': !isToolsShowed}"
      class="cropper-carousel__tools cropper-carousel__tools--bottom"
    >
      <IconButton
        :size="2"
        :src="rotateIcon"
        class="cropper-carousel__rotate-button"
        @click="onClickRotate"
      />
      <IconButton
        :class="{'ratio-showed': isRatioToolsShowed}"
        :size="2"
        :src="ratioIcon"
        class="cropper-carousel__ratio-button"
        @click="onClickCrop"
      />
      <IconButton
        :class="{'zoom-showed': isZoomSliderShowed}"
        :size="2"
        :src="zoomIcon"
        class="cropper-carousel__zoom-button"
        @click="onClickZoom"
      />
      <CropperCarouselZoomSlider
        :class="{'hidden-zoom-slider': !isZoomSliderShowed    }"
        :value="cropperElements[swiper?.realIndex]?.currentZoom ?? 0"
        class="cropper-carousel__zoom-slider"
        @zoomChange="onZoomChange"
      />
      <IconButton
        :class="{disabled: !isMoveLeftShowed}"
        :size="2"
        :src="moveIcon"
        class="cropper-carousel__move-left"
        style="transform: rotate(90deg) scale(1, -1)"
        @click="onClickMoveLeft"
      />
      <IconButton
        :class="{disabled: !isMoveRightShowed}"
        :size="2"
        :src="moveIcon"
        class="cropper-carousel__move-right"
        style="transform: rotate(90deg)"
        @click="onClickMoveRight"
      />

    </div>
    <div
      :class="{'hidden-ratio-tools': !isRatioToolsShowed}"
      class="cropper-carousel__ratio-tools">
      <IconButton
        :class="{'ratio-selected': 1 === currentRatio && !isNaturalRatio}"
        :src="squareIcon"
        @click="onClickRatio(1)"
      />
      <IconButton
        :class="{'ratio-selected': isNaturalRatio}"
        :src="originalIcon"
        @click="onClickRatio(null)"
      />
      <TextButton
        :class="{'ratio-selected': 5/4 === currentRatio && !isNaturalRatio}"
        text="5:4"
        @click="onClickRatio(5/4)"
      />
      <TextButton
        :class="{'ratio-selected': 4/5 === currentRatio && !isNaturalRatio}"
        text="4:5"
        @click="onClickRatio(4/5)"
      />
      <TextButton
        :class="{'ratio-selected': 4/3 === currentRatio && !isNaturalRatio}"
        text="4:3"
        @click="onClickRatio(4/3)"
      />
      <TextButton
        :class="{'ratio-selected': 9/16 === currentRatio && !isNaturalRatio}"
        text="9:16"
        @click="onClickRatio(9/16)"
      />
      <TextButton
        :class="{'ratio-selected': 16/9 === currentRatio && !isNaturalRatio}"
        text="16:9"
        @click="onClickRatio(16/9)"
      />
      <TextButton
        :class="{'ratio-selected': 9/18 === currentRatio && !isNaturalRatio}"
        text="9:18"
        @click="onClickRatio(9/18)"
      />
      <TextButton
        :class="{'ratio-selected': 21/9 === currentRatio && !isNaturalRatio}"
        text="21:9"
        @click="onClickRatio(21/9)"
      />
      <TextButton
        :class="{'ratio-selected': 9/21 === currentRatio && !isNaturalRatio}"
        text="9:21"
        @click="onClickRatio(9/21)"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import Swiper, { Pagination, Navigation } from "swiper";
import CropperCarouselItem from "@/components/editor/PostEditorCropper.vue";
import CropperCarouselZoomSlider from "@/components/editor/PostEditorZoomSlider.vue";
import CropperCarouselFileUploader from "@/components/editor/PostEditorFileUploader.vue";
import saveIcon from "@/assets/icons/save.svg";
import deleteIcon from "@/assets/icons/delete.svg";
import nextIcon from "@/assets/icons/next.svg";
import ratioIcon from "@/assets/icons/crop.svg";
import rotateIcon from "@/assets/icons/rotate.svg";
import zoomIcon from "@/assets/icons/zoom.svg";
import moveIcon from "@/assets/icons/move.svg";
import squareIcon from "@/assets/icons/square.svg";
import originalIcon from "@/assets/icons/original.svg";
import TextButton from "@/components/buttons/TextButton.vue";
import IconButton from "@/components/buttons/IconButton.vue";
import { useUserInfoStore } from "@/stores/userinfo";

const props = defineProps({
  maxlength: {
    type: Number,
    required: false,
    default: 10
  }
});

const links = ref([]);
const swiperElement = ref(null);
const cropperElements = ref([]);
const swiper = ref(null);
const currentRatio = ref(1);
let index = 0;
const buttonNext = ref(null);
const buttonPrev = ref(null);

const isRatioToolsShowed = ref(false);
const isToolsShowed = ref(false);
const isMoveRightShowed = ref(false);
const isMoveLeftShowed = ref(false);
const isZoomSliderShowed = ref(false);
const isNaturalRatio = ref(false);
const isReadyToPost = ref(false);



function onCreated(url) {

}

function getAreas() {
  let picturesData = [];
  for (const key in cropperElements.value) {
    picturesData.push(cropperElements.value[key].getArea());
  }
  return picturesData;
}

function getFiles() {
  let picturesData = [];
  for (const key in cropperElements.value) {
    picturesData.push(cropperElements.value[key].getFile());
  }
  return picturesData;
}

function getSaveOriginals() {
  let picturesData = [];
  for (const key in cropperElements.value) {
    picturesData.push(cropperElements.value[key].isOriginalSaved);
  }
  return picturesData;
}

defineExpose({
  isReadyToPost,
  getFiles,
  getAreas,
  getSaveOriginals
});

function toggle(isShowed) {
  isShowed.value = !isShowed.value;
}

function isCropperReady() {
  return cropperElements.value[swiper.value?.realIndex]?.isReady ?? false;
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
  isNaturalRatio.value = r === null;
  if (r === null) {
    let naturalRatio = cropperElements.value[swiper.value.realIndex].naturalRatio();
    currentRatio.value = naturalRatio > 2 ? 21 / 9 : naturalRatio;
  } else {
    currentRatio.value = r;
  }
}


function onClickRotate() {
  cropperElements.value[swiper.value.realIndex].rotate();
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
  let temp = cropperElements.value[swiper.value.realIndex];
  cropperElements.value[swiper.value.realIndex] = cropperElements.value[swiper.value.realIndex - 1];
  cropperElements.value[swiper.value.realIndex - 1] = temp;
  let elements = links.value.splice(swiper.value.realIndex, 1);
  links.value.splice(swiper.value.realIndex - 1, 0, elements[0]);
  swiper.value.slidePrev(0);
}

function onClickMoveRight() {
  let temp = cropperElements.value[swiper.value.realIndex];
  cropperElements.value[swiper.value.realIndex] = cropperElements.value[swiper.value.realIndex + 1];
  cropperElements.value[swiper.value.realIndex + 1] = temp;
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


function onClickSaveOriginal() {
  let prev = cropperElements.value[swiper.value.realIndex].isOriginalSaved;
  cropperElements.value[swiper.value.realIndex].isOriginalSaved = !prev;
  console.log(cropperElements.value[swiper.value.realIndex].isOriginalSaved)
}

function onZoomChange(v) {
  cropperElements.value[swiper.value.realIndex].zoom(v);
}

function updateTools() {
  isToolsShowed.value = isPictureSlide() && isCropperReady();
  isMoveLeftShowed.value = !isFirstPictureSlide() && isPictureSlide();
  isMoveRightShowed.value = !isLastPictureSlide() && isPictureSlide();
  isRatioToolsShowed.value = isPictureSlide() && isRatioToolsShowed.value;
  isZoomSliderShowed.value = isPictureSlide() && isZoomSliderShowed.value;
  isReadyToPost.value = links.value.length > 0;
}

function onFileUpload(files) {
  Array.from(files).forEach((file) => {
    if (links.value.length >= props.maxlength) return;
    links.value.push({
      key: index++,
      url: URL.createObjectURL(file),
      file: file
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
    watchOverflow: true,
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
  min-width: 280px;
  min-height: 280px;
  user-select: none;
  border-radius: var(--app-border-radius);
  overflow: clip;

  &__swiper-button-prev, &__swiper-button-next {
    transition: all ease-in-out 150ms;
  }

  &__tools {
    z-index: 2;
    width: 100%;
    height: 0.75rem;
    position: absolute;
    display: flex;
    align-items: center;
    padding: 0 1.5rem 0 1.5rem;
    column-gap: 3%;
    transition: all ease-in-out 150ms;

    &--top {
      top: 1.5em;
    }

    &--bottom {
      bottom: 2.5em;
    }

  }

  &__ratio-tools {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-template-rows: 1fr 1fr;
    z-index: 2;
    width: 100%;
    justify-content: center;
    align-content: center;
    grid-auto-flow: column;
    bottom: 5em;
    grid-gap: 0.5em;
    transition: all ease-in-out 150ms;
  }

  &__move-left, &__save-button {
    margin-left: auto;

  }


  &__move-left, &__move-right {
    transition: all ease-in-out 150ms;
  }

  &__zoom-slider {

    @media only screen and (max-width: 960px) {
      position: absolute;
      bottom: 2rem;
    };

    width: 50%;
    border-radius: 30px;
    transition: all ease-in-out 150ms;
  }

  &__save-button:hover {
    background-color: rgba(3, 148, 252, 0.75);
  }

  &__rotate-button {
    transition: all ease-in-out 300ms;

    &:hover {
      transform: rotate(90deg);
    }
  }

  &__zoom-button, &__ratio-button {
    transition: all ease-in-out 150ms;

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

.hidden-ratio-tools {
  opacity: 0;
  pointer-events: none;
  cursor: none;
  grid-gap: 0;
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

.original-saved, .original-saved:hover {
  background-color: rgba(3, 148, 252, 0.75)  !important;
}

.ratio-showed, .ratio-showed:hover, .zoom-showed, .zoom-showed:hover {
  transform: rotate(45deg);
}

.ratio-showed, .ratio-showed:hover,
.zoom-showed, .zoom-showed:hover,
.ratio-selected, .ratio-selected:hover {
  background-color: rgba(247, 247, 247, 0.55);
}

</style>