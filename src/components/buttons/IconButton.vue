<template>
  <div :style="buttonStyle" class="button-container" draggable="false">
    <img :src="props.src" :style="imgStyle" alt="">
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
  "border-radius": props.size + "px"
};

const imgStyle = {
  width: (props.size - (props.padding * 2)) + "px",
  height: (props.size - (props.padding * 2)) + "px"
};

</script>

<style lang="scss" scoped>
.button-container {
  user-select: none;
  -webkit-user-drag: none;
  display: flex;
  //justify-content: center;
  //align-content: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color ease-in 0.15s;
  img {
    display: block;
    //box-sizing: content-box;
    -webkit-user-drag: none;
    user-select: none;
  }
}

.button-container:hover {
  background-color: rgba(0, 0, 0, 0.65)
}

.button-container:active {
  background-color: rgba(0, 0, 0, 0);
}


</style>
