<template>
  <div class="container">
    <n-slider ref="zoomSlider" :on-update-value="zoom" :tooltip="false" :value="props.value" class="zoom-slider" />
  </div>
</template>

<script setup>
import { NSlider } from "naive-ui";


const emit = defineEmits(["zoomChange"]);
const props = defineProps({
  value: {
    type: Number,
    default: 0
  }
});

function zoom(v) {
  emit("zoomChange", v);
}
</script>

<style scoped>
.container {
    height: fit-content;
    padding: 7px;
    background-color:rgba(0, 0, 0, 0.6);
}
</style>