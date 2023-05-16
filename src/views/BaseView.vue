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
  grid-template-columns: calc(100%);
  grid-template-rows: auto 100% auto;
  background-color: var(--background-color);

  header {
    z-index: 999;
    display: grid;
    position: sticky;
    top: 0;
    width: calc(100%);
    border-bottom: #333333 solid 1px;
  }

  main {
    display: block;
    width: calc(100%);
  }

  footer {
    margin-top: 4rem;
    z-index: 1;
    display: grid;
    width: calc(100%);
  }

}


</style>