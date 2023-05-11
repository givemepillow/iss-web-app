<template>
  <div class="page">
    <header>
      <slot class="page--header" name="header"></slot>
    </header>
    <main>
      <slot class="page--main" name="main"></slot>
    </main>
    <footer>
      <slot class="page--footer" name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.page {
  display: grid;
  width: var(--background-width);
  min-height: 100vh;
  grid-template-columns: 100%;
  grid-template-rows: auto 100% auto;
  background-color: var(--background-color);

  &--header {
    display: grid;
    position: sticky;
    top: 0;
    z-index: 999;
    align-items: start;
    align-content: start;
  }

  &--main {
    display: block;
    width: 100%;
  }

  &--footer {
    display: grid;
  }

}


</style>