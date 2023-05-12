<template>
  <IconButton :padding="6" :size="props.size" :src="squareIcon"/>
</template>

<script setup>
import squareIcon from "@/assets/icons/square.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const props = defineProps({
  size: Number
});
</script>

<style lang="scss" scoped>

</style>
