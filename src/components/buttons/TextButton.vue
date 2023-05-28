<template>
  <div :style="buttonStyle" class="button-container" draggable="false">
    <span> {{ props.text}}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
  padding: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    default: 2
  },
  alpha: {
    type: Number,
    default: 0.4
  },
  fontSize: {
    type: Number,
    default: 9
  }
});


const buttonStyle = {
  width: props.size + "rem",
  height: props.size + "rem",
  "font-size": props.fontSize + "pt",
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
  transition: background-color ease-in 0.15s;
  border-radius: 100%;
  span {
    padding: 0;
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
