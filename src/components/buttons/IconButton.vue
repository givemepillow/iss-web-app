<template>
  <div :style="buttonStyle" class="button-container" draggable="false">
    <div :style="iconStyle" class="icon-container" draggable="false">
      <img :src="props.src" :style="imgStyle" alt="">
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  src: String,
  padding: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    default: 30
  },
  alpha: {
    type: Number,
    default: 0.4
  }
});


const buttonStyle = {
  width: props.size + "px",
  height: props.size + "px",
  "border-radius": props.size + "px",
  "background-color": "rgba(0, 0, 0, " + props.alpha + ")"
};

const imgStyle = {
  width: (props.size - (props.padding * 2)) + "px",
  height: (props.size - (props.padding * 2)) + "px",
  opacity: 1
};

const iconStyle = {
  width: props.size + "px",
  height: props.size + "px",
  padding: props.padding + "px",
  "border-radius": props.size + "px"
};


</script>

<style lang="scss" scoped>
.icon-container {
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-content: center;
  -webkit-user-drag: none;
}

.button-container {
  user-select: none;
  cursor: pointer;
  padding: 0;
  //box-shadow: rgba(9, 30, 66, 0.25) 0 1px 1px, rgba(9, 30, 66, 0.13) 0 0 1px 1px;
  transition: opacity ease-in 0.15s;
}

.button-container:hover {
  opacity: 0.5;
}

img {
  -webkit-user-drag: none;
  user-select: none;
}
</style>
