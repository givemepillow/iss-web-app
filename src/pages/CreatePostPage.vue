<template>
  <div class="container">
    <div class="crop-gallery-container">
      <n-button
        v-if="currentIndex !== files.length"
        ref="deleteButton"
        circle
        class="delete-button"
        color="#e63946"
        tertiary
        @click.prevent="deleteImage"
      >
        <template #icon>
          <n-icon :component="TrashOutline" size="20" />
        </template>
      </n-button>
      <n-carousel
        ref="carousel"
        :loop="false"
        :on-update-current-index="updateCurrentIndex"
        :show-arrow="files.length > 0"
        :show-dots="files.length > 0"
        :touchable="false"
        class="carousel"
        direction="horizontal"
        dot-placement="right"
        keyboard
      >
        <ImageCropper v-for="file in files" :key="file.src" :file="file" />
        <UploadPlaceholder
          v-if="files.length < maxImageNumber"
          :files="files"
          :max-image-number="maxImageNumber"
          @uploaded="updateCurrentIndex(currentIndex)"
        />
      </n-carousel>
      <div :style="{'opacity': currentIndex < files.length ? '1' : '0'}" class="tools">
        <div ref="rotateButton" class="rotate-button" @click.prevent="rotateImage">
          <n-button circle size="small" tertiary>
            <template #icon>
              <n-icon :component="ReloadOutline" color="white" size="20" />
            </template>
          </n-button>
        </div>
        <n-slider ref="slider" :on-update-value="zoom" :value="currentZoom" />
      </div>
    </div>
    <div class="post-edit-container">
      <div class="title">
        <n-input class="title" placeholder="Заголовок, название или тема поста..." type="text" />
      </div>
      <div class="description">
        <n-input :autosize="{minRows: 3, maxRows: 17}" class="description-input" maxlength="2000"
                 placeholder="Какое-нибудь интересное описание. Жили-были..." type="textarea" />
      </div>
      <div class="create-post-button">
        <n-button :disabled="files.length === 0" type="primary">Опубликовать</n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { NSlider, NIcon, NButton, NCarousel, NInput } from "naive-ui";
import { ReloadOutline, TrashOutline } from "@vicons/ionicons5";

import ImageCropper from "@/components/ImageCropper.vue";
import UploadPlaceholder from "@/components/UploadPlaceholder.vue";


const carousel = ref();
const rotateButton = ref();
let width = ref(window.innerWidth);


const maxImageNumber = 10;
const files = ref([]);
let currentIndex = ref(0);
const currentZoom = ref(0);


function updateCurrentIndex(index) {
  currentIndex.value = index;
  if (currentIndex.value < files.value.length) {
    let currentFile = files.value[currentIndex.value];
    currentZoom.value = currentFile.zoom ? currentFile.zoom : 0;
  }
}

function rotateImage() {
  let currentFile = files.value[currentIndex.value];
  currentFile.rotation = (currentFile.rotation + 90) % 360;
  currentFile.cropper.rotate(90);
}

async function deleteImage() {
  files.value.splice(currentIndex.value, 1);
  updateCurrentIndex(currentIndex.value);
  if (currentIndex.value === files.value.length) carousel.value.prev();
}

function zoom(v) {
  let currentFile = files.value[currentIndex.value];
  currentFile.cropper.zoom((v - currentFile.zoom) / 100);
  currentFile.zoom = v;
  currentZoom.value = v;
}
</script>

<style lang="scss" scoped>


.delete-button {
  position: absolute;
  top: 15px;
  left: 10px;
  z-index: 10;
}

.crop-gallery-container {
  border-radius: 10px;
  border: #555555 solid 2px;
}

.carousel {
  border-radius: 10px;
  height: 100%;
  width: 100%;
  background-color: var(--background-color);
  margin: 0;
  padding: 0;
}


.container {
  display: grid;
  margin-top: 20px;
  justify-self: center;
  grid-gap: 15px;

  .post-edit-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    align-content: start;
    gap: 10px;

    .title {

    }

    .description {

    }

    .create-post-button {
      justify-self: center;
    }
  }

  .tools {
    position: absolute;
    bottom: 5px;
    left: 10px;
    z-index: 10;
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 15px;
    width: 85%;
    transition: opacity 0.5s ease-in-out;
  }
}

@media screen and (min-width: 900px) {
  .container {
    grid-template-columns: 500px 300px;
    grid-template-rows: 500px auto;
  }
  .description-input {
    height: 375px;
  }
}

@media screen and (max-width: 900px) {
  .container {
    grid-template-columns: 500px;
    grid-template-rows: 500px auto;
  }
  .description-input {
    height: inherit;
  }
}

@media screen and (max-width: 600px) {
  .container {
    grid-template-columns: minmax(305px, 95vw);
    grid-template-rows: minmax(305px, 95vw) auto;
  }
}
</style>