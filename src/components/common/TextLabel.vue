<template>
  <div :style="buttonStyle" class="button-container" draggable="false">
     {{ props.text }}
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
  size: {
    type: Number,
    default: 2
  },
  alpha: {
    type: Number,
    default: 0.4
  }
});


const buttonStyle = {
  "font-size": props.size + "pt",
  "background-color": `rgba(0, 0, 0, ${props.alpha})`,
  "box-shadow": props.shadow ? "rgba(0, 0, 0, 0.16) 0 1px 4px" : "none"
};

</script>

<style lang="scss" scoped>
.button-container {
  user-select: none;
  -webkit-user-drag: none;
  cursor: pointer;
  transition: background-color ease-in 0.15s;
  border-radius: 50%/75%;
  padding: 0.1rem 0.4rem 0.1rem 0.4rem;
  text-align: center;
  vertical-align: middle;
}

.button-container:hover {
  background-color: rgba(0, 0, 0, 0.3)
}

.button-container:active {
  background-color: rgba(0, 0, 0, 0);
}


</style>
