<template>
  <div
    :class="{'base-button--disabled': isDisabled}"
    class="base-button"
    @click.stop.prevent="onClick"
  >
    {{ props.text }}
  </div>
</template>

<script setup>
import { toRef } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const isDisabled = toRef(props, "disabled");

const emit = defineEmits(["click"]);

function onClick(e) {
  emit("click", e);
}
</script>

<style lang="scss" scoped>
.base-button {
  height: 2.25rem;
  border-radius: var(--app-border-radius);
  //box-shadow: var(--app-default-shadow);
  outline: none;
  background: var(--app-active-color);
  border: none;
  color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: rgba(0, 0, 0, 0.05) 0 0 0 1px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.2px);
  -webkit-backdrop-filter: blur(4.2px);
  cursor: pointer;
  user-select: none;
  transition: all linear 25ms;

  &:hover {
    background-size: 200% 200%;
    animation: gradient 2s ease infinite;
  }

  &:active {
    opacity: 0.75;
  }

  &--disabled {
    background: var(--app-inactive-color) !important;
    cursor: not-allowed;
  }
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
</style>