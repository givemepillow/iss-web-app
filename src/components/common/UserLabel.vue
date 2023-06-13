<template>
  <div class="user-label" @click="goProfile('/'+props.user?.username)">
    <div class="user-label__avatar">
      <img
        :alt="props.user?.username"
        :src="resolveAvatarSrc(props.user?.id ?? 0, props.user?.avatarId ?? 0)"
      >
    </div>
    <span class="user-label__name">
      {{ props.user?.username }}
    </span>
  </div>
</template>

<script setup>
import User from "@/models/user";
import { resolveAvatarSrc } from "@/services/api";
import { useRouter, useRoute } from "vue-router";


const props = defineProps({
  user: {
    type: User
  }
});

const router = useRouter();
const route = useRoute();

async function goProfile(path) {
  const currentPath = route.path;
  await router.push({ path: path, force: true });
  if (currentPath!== path) {
    await router.go(0);
  }
}

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