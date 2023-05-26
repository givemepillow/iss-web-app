<template>
  <Transition
    enter-active-class="animate__animated animate__fadeInUp"
    leave-active-class="animate__animated animate__fadeOutDown"
    mode="out-in"
  >
    <div v-if="isOpen" class="pop-up-notification">
      <div class="pop-up-notification__card" @click="close">
        <p class="pop-up-notification__text">
          {{ text }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup>

import { ref } from "vue";

const isOpen = ref(false);
const text = ref("");
let timeoutId = null;

function close() {
  isOpen.value = false;
  clearTimeout(timeoutId);
}

function open(message) {
  isOpen.value = true;
  text.value = message;

  timeoutId = setTimeout(() => {
    close();
  }, 5000);

}


defineExpose({
  open, close
});

</script>

<style lang="scss" scoped>
.pop-up-notification {
  z-index: 999;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  bottom: 12.5%;

  &__card {
    background: rgba(0, 0, 0, 0.55);
    border-radius: var(--app-border-radius);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    max-width: 20rem;
  }

  &__text {
    color: var(--app-text-color);
    font-size: 10fr;
    word-wrap: normal;
  }
}
</style>