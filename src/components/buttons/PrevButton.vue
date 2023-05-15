<template>
  <IconButton :padding="3" :size="props.size" :src="nextIcon" style="transform: rotate(180deg)"/>
</template>

<script setup>
import nextIcon from "@/assets/icons/next.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const props = defineProps({
  size: Number
});
</script>
