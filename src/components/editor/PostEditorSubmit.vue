<template>
  <div :class="{disabled: props.disabled, pending: props.pending}" class="submit-button">
    СОЗДАТЬ
  </div>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: true
  },
  pending: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.submit-button {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: x-large;
  text-shadow: rgba(0, 0, 0, 0.05) 0 0 0 1px;
  transition: all ease-in-out 250ms;
  cursor: pointer;
  user-select: none;
  background: #8ac926;
}

@keyframes gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.submit-button:hover {

}

.pending {
  background: linear-gradient(90deg, hsla(148, 100%, 47%, 1) 0%, hsla(211, 90%, 47%, 1) 100%);
  background-size: 400% 400%;
  animation: gradient 3s ease infinite;
  font-size: 0;
}

.disabled {
  background-size: 100% 100%;
  animation: none;
  background: #b5bd89;
}

.disabled:hover {
  background-color: #b5bd89;
}
</style>