<template>
  <IconButton :padding="4" :size="props.size" :src="saveIcon" />
</template>

<script setup>
import saveIcon from "@/assets/icons/save.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const props = defineProps({
  size: Number
});
</script>
