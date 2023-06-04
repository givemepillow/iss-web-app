<template>
  <p class="post-description">
    {{ props.description}}
  </p>
</template>

<script setup>
const props = defineProps({
  description: {
    type: String,
    required: false,
    default: "Please check the Advanced Matching documentation to explore them. Vue Router uses its own path matching syntax, inspired by the one used by express, so it supports many advanced matching patterns such as optional params, zero or more / one or more requirements, and even custom regex patterns. Please check the Advanced Matching documentation to explore them. Vue Router uses its own path matching syntax, inspired by the one used by express, so it supports many advanced matching patterns such as optional params, zero or more / one or more requirements, and even custom regex patterns. Please check the Advanced Matching documentation to explore them."
  }
});
</script>

<style scoped>
.post-description {
    font-size: 10pt;
}
</style>