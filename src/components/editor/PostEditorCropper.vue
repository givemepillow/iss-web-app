<template>
  <div ref="cropperElement" class="post-cropper">
    <div ref="canvasElement" :class="{'post-cropper--ready': isReady}" class="post-cropper__canvas cropper-canvas">
      <img ref="imageElement" :src="src" alt="" class="post-cropper__image">
    </div>
    <div :class="{'post-cropper__placeholder--ready': isReady}" class="post-cropper__placeholder">
      <TheLoading />
    </div>
    <a ref="a" style="display:none;position: absolute"></a>
  </div>

</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import Cropper from "cropperjs";
import TheLoading from "@/components/common/TheLoading.vue";

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

const emit = defineEmits(["created"]);
const canvasElement = ref(null);
const cropperElement = ref(null);
const imageElement = ref(null);
const cropper = ref(null);
const currentZoom = ref(0);
const isReady = ref(false);

const isOriginalSaved = ref(false);
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
  cropper.value.crop();
  let data = cropper.value.getData(true);
  let area = {};
  area.x = Math.floor(data.x / data.scaleX);
  area.y = Math.floor(data.y / data.scaleY);
  area.width = Math.floor(data.width / data.scaleX);
  area.height = Math.floor(data.height / data.scaleY);
  area.rotate = data.rotate;
  return area;
}


function rotate(r) {
  cropper.value.rotate(r);
}

function zoom(v) {
  if (cropper.value === null) return;
  const containerData = cropper.value.getContainerData();
  const canvasData = cropper.value.getCanvasData();
  cropper.value.zoomTo(
    (canvasData.width / canvasData.naturalWidth) +
    ((v - currentZoom.value) / zoomStep),
    {
      x: containerData.width / 2,
      y: containerData.height / 2
    }
  );
  currentZoom.value = v;
}

function naturalRatio() {
  if (cropper.value.getData().rotate % 180 === 0) {
    return cropper.value.getImageData().aspectRatio;
  } else {
    return 1 / cropper.value.getImageData().aspectRatio;
  }
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
  // Порядок важен!!!
  cropper.value.reset();

  // Получем высоту и ширину изображения в текущем положении.
  const imageData = cropper.value.getImageData();
  let [imageWidth, imageHeight] = [imageData.width, imageData.height];
  if (cropper.value.getData().rotate % 180 !== 0) {
    [imageWidth, imageHeight] = [imageHeight, imageWidth];
  }

  // Устанавливаем соотношение сторон.
  cropper.value.setAspectRatio(ratio !== 0 ? ratio : imageWidth / imageHeight);

  // Вычисление коэффициента увеличения изображения.
  const boxData = cropper.value.getCropBoxData();
  let scale = canvasElement.value.offsetHeight;
  scale /= (boxData.height > boxData.width ? boxData.height : boxData.width);

  // Увеличиваем изображение, подгоняя его тем самым к размеру контейнера.
  cropper.value.scale(scale, scale);


  // Вычисление размеров crop box.
  const containerData = cropper.value.getContainerData();
  let [boxHeight, boxWidth] = [containerData.height, containerData.height * ratio];
  if (ratio > 1) {
    [boxWidth, boxHeight] = [containerData.width, containerData.width / ratio];
  }

  // Установка crop box.
  cropper.value.setCropBoxData({
    left: (containerData.width - boxWidth) / 2,
    top: (containerData.height - boxHeight) / 2,
    height: boxHeight,
    width: boxWidth
  });

  // Возвращаем исходный зум.
  const canvasData = cropper.value.getCanvasData();
  cropper.value.zoomTo(
    (canvasData.width / canvasData.naturalWidth) +
    (currentZoom.value / zoomStep)
  );
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
      emit("created");
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
  user-select: none;
  transition: opacity ease-out 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;


  &__placeholder {
    position: absolute;
    pointer-events: none;
    &--ready {
      opacity: 0;
      z-index: -1;
    }
  }

  &__canvas {
    opacity: 0;
    transition: opacity ease-out 0.25s;
  }

  &__image {
    display: block;
    max-width: 100%;
  }

  &--ready {
    opacity: 1;
  }
}
</style>