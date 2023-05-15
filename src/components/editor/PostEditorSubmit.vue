<template>
  <div :class="{disabled: props.disabled}" class="submit-button">
    СОЗДАТЬ
  </div>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: true
  }
});
</script>

<style lang="scss" scoped>
.submit-button {
  height: 100%;
  width: 100%;
  background-color: #7cb518;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: x-large;
  text-shadow: rgba(0, 0, 0, 0.05) 0 0 0 1px;
  transition: all ease-in-out 150ms;
  cursor: pointer;
  user-select: none;
}

.submit-button:hover {
  background-color: #8ac926;
}

.disabled {
  background-color: #b5bd89;
}

.disabled:hover {
  background-color: #b5bd89;
}
</style>