<template>
  <BaseButton
    :class="{pending: props.pending}"
    :disabled="disabled"
    class="submit-button"
    text="СОЗДАТЬ"
  />
</template>

<script setup>
import BaseButton from "@/components/buttons/AppButton.vue";

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
  font-weight: bold;
  font-size: x-large;
  background-color: gold;
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
  background: var(--app-active-color);
  background-size: 300% 300%;
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