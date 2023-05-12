<template>
  <IconButton :padding="4" :size="props.size" :src="zoomIcon" />
</template>

<script setup>
import zoomIcon from "@/assets/icons/zoom.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const props = defineProps({
  size: Number
});


</script>
