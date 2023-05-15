<template>
  <IconButton :padding="0" :size="props.size" :src="nextIcon" />
</template>

<script setup>
import nextIcon from "@/assets/icons/next.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const props = defineProps({
  size: Number
});


</script>
