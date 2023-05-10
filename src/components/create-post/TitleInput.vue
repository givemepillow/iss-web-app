<template>
  <div class="title-input-container">
    <textarea
      ref="textarea"
      placeholder="Придумайте название..."
      rows="1"
      maxlength="25"
      spellcheck="false"
    ></textarea>
  </div>
</template>

<script setup>

import { ref } from "vue";
const textarea = ref(null);
</script>

<style lang="scss" scoped>
.title-input-container {
  width: 100%;
  padding: 0.5em;

  textarea {
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    color: white;
    resize: none;
    padding: 0;
    font-size: 14pt;
    font-weight: bolder;
  }
}
</style>