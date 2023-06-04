<template>
  <h1 class="post-title">
  {{ props.title}}
  </h1>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "Vue 3 router."
  }
});
</script>

<style scoped>
.post-title {
    font-size: 13pt;
}
</style>