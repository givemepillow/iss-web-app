<template>
  <div class="zoom-slider">
    <input ref="zoomSlider"  @input="onInput" :value="modelValue" class="zoom-slider__range" max="100" min="0" type="range" />
  </div>
</template>

<script setup>


const emit = defineEmits(["zoomChange"]);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
});

function onInput(event) {
  emit("zoomChange", event.target.value);
}

</script>

<style lang="scss" scoped>
.zoom-slider {
  display: flex;
  align-items: center;
  height: 1.75rem;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;

  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 0.35rem;
    border-radius: 5px;
    background-color: whitesmoke;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1.5rem;
    width:  1.5rem;
    border-radius: 50%;
    background: var(--app-active-color);
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background .3s ease-in-out;
  }

  input[type=range]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
}
</style>