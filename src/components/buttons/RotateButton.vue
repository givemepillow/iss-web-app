<template>
  <IconButton :padding="6" :size="props.size" :src="rotateIcon" />
</template>

<script setup>
import rotateIcon from "@/assets/icons/rotate.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const props = defineProps({
  size: Number
});
</script>
