<template>
  <div class="container">
    <div
      class="dropzone"
      @click="onClick"
      @dragleave="onDragleave"
      @dragover="onDragover"
      @dragover.prevent
      @dragenter.prevent
      @drop.prevent="onDrop"
    >
      <input
        ref="file"
        accept=".webp,.gif,.jpg,.jpeg,.png,.heic"
        multiple
        style="display: none"
        type="file"
        @change="onChange"
      />
      <div class="prompt">
        <img alt="" src="@/assets/icons/images.svg">
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from "vue";

const isDragging = ref(false);

const file = ref(null);

const emit = defineEmits(["upload"]);

function onClick() {
  file.value.value = null;
  file.value.click();
}

function onDrop(e) {
  emit("upload", e.dataTransfer.files);
}

function onDragover() {
  isDragging.value = true;
}

function onDragleave() {
  isDragging.value = false;
}

function onChange(e) {
  emit("upload", e.currentTarget.files);
}

</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.dropzone {
  background-color: transparent;
  height: 50%;
  width: 50%;
  border: #555555 dashed 3px;
  border-radius: 10px;
  padding: 2rem;

  .prompt {
    height: 100%;
    width: 100%;
    padding: 0.5rem;

    img {
      -webkit-user-drag: none;
      user-select: none;
      object-fit: contain;
      height: 100%;
      width: 100%;
      opacity: 0.65;
    }
  }
}


</style>