<template>
  <div :style="buttonStyle" class="button-container" draggable="false">
    <img :src="props.src" alt="">
  </div>
</template>

<script setup>
const props = defineProps({
  src: String,
  size: {
    type: Number,
    default: 2
  },
  alpha: {
    type: Number,
    default: 0.6
  },
  shadow: {
    type: Boolean,
    default: true
  }
});

const buttonStyle = {
  width: props.size + "rem",
  height: props.size + "rem",
  "background-color": `rgba(0, 0, 0, ${props.alpha})`,
  "box-shadow": props.shadow ? "rgba(0, 0, 0, 0.16) 0 1px 4px" : "none"
};

</script>

<style lang="scss" scoped>
.button-container {
  user-select: none;
  -webkit-user-drag: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.25rem;
  transition: background-color ease-in 0.15s;
  border-radius: 100%;

  img {
    display: block;
    -webkit-user-drag: none;
    user-select: none;
  }
}

.button-container:hover {
  background-color: rgba(0, 0, 0, 0.3)
}

.button-container:active {
  background-color: rgba(0, 0, 0, 0);
}


</style>
