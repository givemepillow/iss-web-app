<template>
  <div class="user-label">
    <div class="user-label__avatar">
      <img :alt="props.user?.username ?? 'default'" :src="props.user?.avatarUrl ?? avatar" class="">
    </div>
    <span class="user-label__name">
      {{ props.user?.username ?? 'default' }}
    </span>
  </div>
</template>

<script setup>
import avatar from "@/assets/avatars/batman.svg";


const props = defineProps({
  user: {
    type: Object,
    required: true
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
    border-radius: 100%;
    overflow: hidden;

    img {
      display: block;
      height: 2rem;
      width: 2rem;
      -webkit-user-drag: none;
      user-select: none;
    }

  }


  &__name {
    word-wrap: anywhere;
  }
}
</style>