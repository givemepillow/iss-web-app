<template>
  <div class="user-label">
    <div class="user-label__avatar">
      <img :alt="props.user?.username" :src="avatar" class="">
    </div>
    <span class="user-label__name">
      {{ props.user?.username }}
    </span>
  </div>
</template>

<script setup>
import avatar from "@/assets/avatars/batman.svg";
import User from "@/models/user";
import { computed } from "vue";


const props = defineProps({
  user: {
    type: User
  }
});


const user = computed(() => {
  return props.user ?? new User();
});

</script>

<style lang="scss" scoped>
.user-label {
  display: flex;
  gap: 1em;
  align-items: center;
  font-size: 10pt;
  padding: 0;
  background-color: transparent;

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