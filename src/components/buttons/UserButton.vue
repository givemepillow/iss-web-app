<template>
  <IconButton :padding="4" :size="props.size" :src="userIcon" />
</template>

<script setup>
import userIcon from "@/assets/icons/user.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const props = defineProps({
  size: Number
});
</script>
