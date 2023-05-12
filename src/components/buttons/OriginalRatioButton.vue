<template>
  <IconButton :padding="5" :size="props.size" :src="originalIcon"/>
</template>

<script setup>
import originalIcon from "@/assets/icons/original.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const props = defineProps({
  size: Number
});
</script>

<style lang="scss" scoped>

</style>
