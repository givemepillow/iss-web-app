<template>
  <div class="cropper-carousel-container" @mouseleave="hideNavigation" @mouseover="showNavigation">
    <div ref="swiperItem" class="swiper">
      <DeleteButton
        :size="30" :style="{display: swiper?.realIndex === links.length ? 'none' : 'block'}"
        class="delete-button"
        @click="onDelete"
      />
      <div class="swiper-wrapper">
        <div v-for="[i, v] of links.entries()" :key="v.index" class="swiper-slide" @click="hideTools">
          <CropperCarouselItem :ref="(el) => {croppers[i] = el }" :index="v.index" :ratio="ratio" :src="v.file" />
        </div>
        <div v-if="links.length < 3" class="swiper-slide">
          <CropperCarouselFileUploader @mouseover="hideTools" @upload="onUpload" />
        </div>
      </div>
      <div class="swiper-pagination" @click="hideTools"></div>
      <PrevButton :size="26" :style="prevButtonStyle" class="swiper-button-prev" />
      <NextButton :size="26" :style="nextButtonStyle" class="swiper-button-next" />

      <CropButton
        :size="28" :style="{display: swiper?.realIndex === links.length ? 'none' : 'block'}"
        class="crop-button"
        @click="cropMenuShowed = !cropMenuShowed; sliderShowed = false"
      />
      <ZoomButton
        :size="28" :style="{display: swiper?.realIndex === links.length ? 'none' : 'block'}"
        class="zoom-button"
        @click="sliderShowed = !sliderShowed; cropMenuShowed = false"
      />
      <CropperCarouselZoomSlider
        :style="sliderShowed ? sliderShowStyle : sliderHideStyle"
        :value="current?.currentZoom ? current.currentZoom : 0"
        class="zoom-slider"
        @zoom="current?.zoomPicture"
      />
      <CropperCarouselRatioMenu
        :style=" cropMenuShowed ? cropMenuShowStyle : cropMenuHideStyle"
        class="ratio-menu"
        @ratioChange="onRationChange"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, reactive, ref } from "vue";
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

const swiperItem = ref(null);
const count = ref(0);
const index = ref(0);
const links = ref([]);
const swiper = ref(null);
const ratio = ref(1);
const croppers = ref({});
const current = ref(null);
let sliderShowed = ref(false);
let cropMenuShowed = ref(false);


const prevButtonStyle = reactive({ opacity: 0 });
const nextButtonStyle = reactive({ opacity: 0 });
const sliderShowStyle = { bottom: "95px", left: "70px" };
const sliderHideStyle = { bottom: 0, left: "0px" };
const cropMenuShowStyle = { bottom: "295px", left: "30px" };
const cropMenuHideStyle = { bottom: 0, left: "-130px" };

function getIndex() {
  return count.value++;
}

function onUpload(files) {
  Array.from(files).forEach((f) => {
    if (links.value.length > 2) return;
    links.value.push({ index: getIndex(), file: URL.createObjectURL(f) });
  });
}

function onSave() {
  for (const [_, c] of Object.entries(croppers.value)) {
    c.save();
  }
}

onUpdated(() => {
  swiper.value.update();
});

function onDelete() {
  links.value.splice(swiper.value.realIndex, 1);
  let i = 0;
  for (const [key, _] of Object.entries(croppers.value)) {
    if (i === swiper.value.realIndex) {
      croppers.value[key].destroy();
      delete croppers.value[key];
      return;
    }
  }
}

function onRationChange(r) {
  if (ratio.value === r || ratio.value === null) return;
  if (r === 0) {
    ratio.value = current.value.getPictureRatio();
  } else {
    ratio.value = r;
  }
}

function showNavigation() {
  prevButtonStyle.opacity = swiper.value.realIndex === 0 ? 0 : 1;
  nextButtonStyle.opacity = swiper.value.realIndex === swiper.value.slides?.length - 1 ? 0 : 1;
}

function hideNavigation() {
  prevButtonStyle.opacity = 0;
  nextButtonStyle.opacity = 0;
}

function hideTools() {
  cropMenuShowed.value = false;
  sliderShowed.value = false;
}

onMounted(() => {
  swiper.value = new Swiper(swiperItem.value, {
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
        current.value = croppers.value[swiper.value.realIndex];
      },
      slideChange: () => {
        current.value = croppers.value[swiper.value.realIndex];
        showNavigation();
      }
    }
  });
});


</script>

<style lang="scss" scoped>
.cropper-carousel-container {
  height: 100%;
  width: 100%;
  user-select: none;

  .crop-button, .zoom-button, .delete-button {
    z-index: 2;
    position: absolute;

  }

  .crop-button {
    left: 10px;
    bottom: 20px;
  }

  .zoom-button {
    left: 45px;
    bottom: 20px;
  }

  .delete-button {
    left: 10px;
    top: 20px;
  }

  .zoom-slider, .ratio-menu {
    position: relative;
    z-index: 1;
    border-radius: 10px;
    height: fit-content;
    transition: all ease-out 300ms;
  }

  .zoom-slider {
    width: 40%;

  }

  .ratio-menu {
    width: 20%;
  }
}

</style>