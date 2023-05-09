<template>
  <div class="page">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot name="main"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.page {
  display: grid;
  width: 100%;
  min-height: 100vh;
  grid-template-columns: 100%;
  grid-template-rows: auto 100% auto;
  background-color: gainsboro;

  header {
    display: grid;
    height: fit-content;
    position: sticky;
    top: 0;
    z-index: 2;
    align-items: start;
    align-content: start;
  }

  main {
    display: grid;
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
  }

  footer {
    display: grid;
    height: fit-content;
  }

}


</style>