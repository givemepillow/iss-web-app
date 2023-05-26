<template>
  <div class="background-overlay" @click.stop>
    <slot></slot>
  </div>
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