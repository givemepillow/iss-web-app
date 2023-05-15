<template>
  <div class="user-label">
    <div class="user-label__avatar">
      <img :alt="props.name" :src="avatar" class="">
    </div>
    <span class="user-label__name">
      {{ name }}
    </span>
  </div>
</template>

<script setup>
import avatar from "@/assets/avatars/batman.svg";


const props = defineProps({
  name: {
    type: String,
    default: "kirilllapushinskiy"
  }
});
</script>

<style lang="scss" scoped>
.user-label {
  display: flex;
  gap: 1em;
  align-items: center;
  font-size: 12pt;
  padding: 0;

  &__avatar {
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: block;
      -webkit-user-drag: none;
      user-select: none;
    }

  }


  &__name {
    word-wrap: anywhere;
  }
}
</style>