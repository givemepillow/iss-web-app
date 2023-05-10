<template>
  <IconButton :padding="4" :alpha=0 :size="props.size" :src="emojiIcon" />
</template>

<script setup>
import emojiIcon from "@/assets/icons/emoji.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const props = defineProps({
  size: Number
});
</script>
