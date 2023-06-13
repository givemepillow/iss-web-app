<template>
  <div :style="{'font-size': props.fontSize + 'pt'}" class="text-icon-button">
    <IconButton :alpha="0" :shadow="false" :size="props.size" :src="props.src" />
    <span>{{ props.text }}</span>
  </div>
</template>

<script setup>
import IconButton from "@/components/buttons/IconButton.vue";

const props = defineProps({
  src: String,
  text: String,
  size: {
    type: Number,
    default: 2
  },
  fontSize: {
    type: Number,
    default: 12
  }
});


</script>

<style lang="scss" scoped>
.text-icon-button {
  user-select: none;
  -webkit-user-drag: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-right: 0.5rem;
  transition: background-color ease-in 0.15s;
}

.button-container:hover {
  background-color: rgba(0, 0, 0, 0.3)
}

.button-container:active {
  background-color: rgba(0, 0, 0, 0);
}


</style>
