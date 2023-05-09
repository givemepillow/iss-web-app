<template>
  <IconButton :padding="6" :size="props.size" :src="deleteIcon" />
</template>

<script setup>
import deleteIcon from "@/assets/icons/delete.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const props = defineProps({
  size: Number
});


</script>
