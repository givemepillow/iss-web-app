<template>
  <div ref="cropperElement" :class="{'post-cropper--ready': isReady}" class="post-cropper">
    <div ref="canvasElement" class="post-cropper__canvas cropper-canvas">
      <img ref="imageElement" :src="src" alt="" class="post-cropper__image">
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
  file: Object,
  ratio: {
    type: Number,
    required: true,
    default: 0
  }
});

const emits = defineEmits(["created"]);
const canvasElement = ref(null);
const cropperElement = ref(null);
const imageElement = ref(null);
const cropper = ref(null);
const currentZoom = ref(0);
const isReady = ref(false);

const isOriginalSaved = ref(true);
const zoomStep = 100;

function saveLocal() {
  isOriginalSaved.value = !isOriginalSaved.value;
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

function getFile() {
  return props.file;
}

function getArea() {
  let data = cropper.value.getData(true);
  data["x"] = Math.floor(data["x"] / data["scaleX"]);
  data["y"] = Math.floor(data["y"] / data["scaleY"]);
  data["width"] = Math.floor(data["width"] / data["scaleX"]);
  data["height"] = Math.floor(data["height"] / data["scaleY"]);
  return data;
}

function getSrc() {
  return props.src;
}

function rotate() {
  // cropper.value.rotate(90);
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

function naturalRatio() {
  return cropper.value.getImageData().aspectRatio;
}

defineExpose({
  zoom,
  rotate,
  saveLocal,
  naturalRatio,
  getArea,
  getFile,
  currentZoom,
  isOriginalSaved,
  isReady
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
  let maxZoom = 0;
  let minZoom = 0;
  cropper.value = new Cropper(imageElement.value, {
    checkCrossOrigin: false,
    initialAspectRatio: imageElement.width / imageElement.height,
    viewMode: 1,
    dragMode: "move",
    toggleDragModeOnDblclick: false,
    zoomOnWheel: false,
    zoomOnTouch: true,
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
      const canvasData = cropper.value.getCanvasData();
      minZoom = (canvasData.width / canvasData.naturalWidth);
      maxZoom = (canvasData.width / canvasData.naturalWidth) + (100 / zoomStep);
      currentZoom.value = 0;
      isReady.value = true;
    },
    zoom(event) {
      if (maxZoom < event.detail.ratio) {
        event.preventDefault();
        return;
      }
      const delta = (event.detail.ratio - minZoom);
      currentZoom.value = Math.floor(delta / (1 / zoomStep));
    }
  });
});

onUnmounted(() => {
  cropper.value.destroy();
});

</script>

<style lang="scss" scoped>
.post-cropper {
  opacity: 0;
  user-select: none;
  transition: opacity ease-out 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;

  &--ready {
    opacity: 1;
  }

  &__image {
    display: block;
    max-width: 100%;
  }
}
</style>