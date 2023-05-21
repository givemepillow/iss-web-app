<template>
  <div class="page">
    <header>
      <slot name="page__header"></slot>
    </header>
    <main>
      <slot name="page__main"></slot>
    </main>
    <footer>
      <slot name="page__footer"></slot>
    </footer>
  </div>
  <div class="page__background-container">
    <div class="page__background"></div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.page {
  display: grid;
  width: calc(100%);
  grid-template-columns: calc(100%);
  grid-template-rows: auto 100% auto;

  &__header {
    z-index: 999;
    display: grid;
    position: sticky;
    top: 0;
    width: calc(100%);
    border-bottom: #333333 solid 1px;
  }

  &__hmain {
    display: block;
    width: calc(100%);
  }

  &__hfooter {
    margin-top: 4rem;
    z-index: 1;
    display: grid;
    width: calc(100%);
  }


  &__background-container {
    position: fixed;
    z-index: -1;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__background {
    --size: 475px;
    --speed: 50s;
    --easing: cubic-bezier(0.9, 0.1, 0.1, 0.9);

    width: var(--size);
    height: var(--size);
    filter: blur(calc(var(--size) / 5));
    background-image: linear-gradient(hsl(158, 82%, 57%, 85%), hsl(252, 82%, 57%));
    animation: rotate var(--speed) var(--easing) alternate infinite;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>