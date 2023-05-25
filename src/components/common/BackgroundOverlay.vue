<template>
  <Transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    mode="out-in"
  >
    <Teleport to="body">
      <div class="background-overlay" @click.stop>
        <slot></slot>
      </div>
    </Teleport>
  </Transition>
</template>

<script setup>

</script>

<style scoped>

.background-overlay {
    z-index: 999;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>