<template>
  <IconButton :padding="4" :size="props.size" :src="cropIcon" />
</template>

<script setup>
import cropIcon from "@/assets/icons/crop.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const props = defineProps({
  size: Number
});
</script>
