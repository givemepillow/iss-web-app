<template>
  <div :style="buttonStyle" class="button-container">
    <div class="text-container">{{ props.text }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  src: String,
  text: String,
  alpha: {
    type: Number,
    default: 0.4
  }
});


const buttonStyle = {
  "background-color": "rgba(0, 0, 0, " + props.alpha + ")"
};

</script>

<style lang="scss" scoped>
.text-container {
  text-align: center;
}

.button-container {
  user-select: none;
  cursor: pointer;
  padding: 0.7em;
  border-radius: 10px;
  transition: opacity ease-in 0.15s;
}

.button-container:hover {
  opacity: 0.5;
}
</style>
