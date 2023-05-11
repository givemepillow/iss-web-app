<template>
  <div ref="cropperElement" class="cropper-carousel-item">
    <div ref="canvasElement" class="cropper-carousel-item__canvas cropper-canvas">
      <img ref="imageElement" :src="src" alt="" class="cropper-carousel-item__image">
    </div>
    <a ref="a" style="display:none;position: absolute"></a>
  </div>

</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import Cropper from "cropperjs";

const a = ref(null);
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  ratio: {
    type: Number,
    required: true,
    default: 0
  }
});
const canvasElement = ref(null);
const cropperElement = ref(null);
const imageElement = ref(null);
const cropper = ref(null);
const currentZoom = ref(0);
const zoomStep = 100;

function save() {
  cropper.value.getCroppedCanvas({
    imageSmoothingEnabled: false,
    imageSmoothingQuality: "high"
  }).toBlob((b) => {
    a.value.href = window.URL.createObjectURL(b);
    a.value.download = "picture.png";
    a.value.click();
    window.URL.revokeObjectURL(a.value.href);
  }, "image/png", 1);
}

function rotate() {
  cropper.value.rotate(90);
}

function zoom(v) {
  if (cropper.value === null) return;
  const containerData = cropper.value.getContainerData();
  const canvasData = cropper.value.getCanvasData();
  cropper.value.zoomTo((canvasData.width / canvasData.naturalWidth) + ((v - currentZoom.value) / zoomStep), {
    x: containerData.width / 2,
    y: containerData.height / 2
  });
  currentZoom.value = v;
}

function getPictureRatio() {
  if (cropper.value === null) return;
  return cropper.value.getImageData().aspectRatio;
}

defineExpose({
  zoom,
  rotate,
  save
});

function scaleCropper(ratio) {
  cropper.value.reset();
  const image = cropper.value.getImageData();
  cropper.value.setAspectRatio(ratio !== 0 ? ratio : image.width / image.height);
  const box = cropper.value.getCropBoxData(); // Порядок важен!
  let scale = canvasElement.value.offsetHeight;
  scale /= (box.height > box.width ? box.height : box.width);
  cropper.value.scale(scale, scale);
  cropper.value.setCropBoxData({
    left: scale !== 1 ? (image.width - box.width * scale) / 2 : box.left,
    top: scale !== 1 ? (image.height - box.height * scale) / 2 : box.top,
    height: box.height * scale,
    width: box.width * scale
  });
  const canvasData = cropper.value.getCanvasData();
  cropper.value.zoomTo((canvasData.width / canvasData.naturalWidth) + (currentZoom.value / zoomStep));
}

watch(props, () => {
  if (cropper.value === null) return;
  scaleCropper(props.ratio);
});

onMounted(() => {
  cropper.value = new Cropper(imageElement.value, {
    checkCrossOrigin: false,
    initialAspectRatio: imageElement.width / imageElement.height,
    viewMode: 1,
    dragMode: "move",
    toggleDragModeOnDblclick: false,
    zoomOnWheel: false,
    zoomOnTouch: false,
    responsive: true,
    restore: true,
    guides: true,
    center: true,
    scalable: true,
    zoomable: true,
    background: false,
    highlight: true,
    autoCropArea: 1,
    autoCrop: true,
    cropBoxResizable: false,
    cropBoxMovable: false,
    ready(_) {
      scaleCropper(props.ratio);
      cropperElement.value.style.opacity = 1;
    }
  });
});

onUnmounted(() => {
  cropper.value.destroy();
});

</script>

<style lang="scss" scoped>
.cropper-carousel-item {
  width: 100%;
  height: 100%;
  opacity: 0;
  user-select: none;
  transition: opacity ease-out 0.5s;

  &__image {
    display: block;
    max-width: 100%;
  }
}
</style>