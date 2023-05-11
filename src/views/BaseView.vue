<template>
  <div :class="$style.page">
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

<style lang="scss" module>
.page {
  display: grid;
  width: calc(100%);
  //min-height: 100vh;
  grid-template-columns: calc(100%);
  grid-template-rows: auto calc(100%) auto;
  background-color: var(--background-color);

  header {
    display: grid;
    position: sticky;
    top: 0;
    z-index: 999;
    align-items: start;
    align-content: start;
    width: calc(100%);
  }

  main {
    display: block;
    width: calc(100%);
  }

  footer {
    display: grid;
    width: calc(100%);
  }

}


</style>