<template>
  <div ref="cropContainer" class="crop-container">
    <div class="image-wrapper">
      <img
        :src="file.src"
        alt=""
        @load="createCropper"
      >
    </div>
  </div>
</template>

<script setup>
import Cropper from "cropperjs";

const props = defineProps({
  file: Object
});



function createCropper(event) {
  props.file.cropper = new Cropper(event.target, {
    initialAspectRatio: 1,
    viewMode: 1,
    dragMode: "move",
    responsive: true,
    restore: true,
    guides: true,
    center: false,
    autoCropArea: 1,
    autoCrop: true,
    scalable: false,
    zoomable: true,
    zoomOnWheel: false,
    zoomOnTouch: false,
    background: false,
    highlight: false,
    cropBoxResizable: false,
    cropBoxMovable: false,
    movable: true,
    wheelZoomRatio: 0.4,
    ready(event) {
      const imageData = this.cropper.getImageData();
      const len = window.innerWidth > 600 ? 500 : window.innerWidth;
      if (imageData.height > imageData.width) {
        this.cropper.setCanvasData({
          width: len,
          top: 0,
          left: 0
        });
      } else {
        this.cropper.setCanvasData({
          height: len,
          top: 0,
          left:0
        });
      }
      this.cropper.setCropBoxData({
        width: len,
        height: len
      });
      event.target.parentElement.parentElement.style.opacity = "1";
    }
  });
}
</script>

<style lang="scss" scoped>

.spin {
  width: 100%;
  height: 100%;
}

.crop-container {
  background-color: transparent;
  width: 100%;
  height: 100%;
  overflow: clip;
  opacity: 0;
  transition: opacity 0.3s ease-in;


  .image-wrapper {
    width: 100%;
    height: 100%;

    img {
      max-width: 100%;
    }
  }
}


</style>