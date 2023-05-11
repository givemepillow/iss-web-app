<template>
  <IconButton :padding="4" :size="props.size" :src="moveIcon" style="transform: rotate(90deg)" />
</template>

<script setup>
import moveIcon from "@/assets/icons/move.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const props = defineProps({
  size: Number
});
</script>


