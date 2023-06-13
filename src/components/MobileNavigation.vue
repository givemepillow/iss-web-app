<template>
  <nav>
    <div :class="{'button--active': $route.name === 'explore'}" class="explore-button button  app-card">
      <RouterLink to="/explore">
        <IconButton :alpha="0" :shadow="false" :size="2.5" :src="exploreIcon" />
      </RouterLink>
    </div>
    <div :class="{'button--active': $route.name === 'new'}" class="new-button button  app-card">
      <RouterLink to="/new">
        <IconButton :alpha="0" :shadow="false" :size="2.5" :src="addIcon" />
      </RouterLink>
    </div>
    <div :class="{'profile-button--active': $route.path.split('/')[1]=== me?.username}"
         class="profile-button button  app-card">
      <IconButton :alpha="0" :padding="0" :shadow="false" :size="2" :src="resolveAvatarSrc(me?.id, me?.avatarId)"
                  class="icon" @click="goProfile('/'+(me?.username ?? ''))" />
    </div>
    <div :class="{'button--active': $route.name === 'settings'}" class="settings-button button  app-card">
      <RouterLink to="/settings">
        <IconButton :alpha="0" :shadow="false" :size="2.5" :src="settingsIcon" class="button" />
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import IconButton from "@/components/buttons/IconButton.vue";
import exploreIcon from "@/assets/icons/explore.svg";
import addIcon from "@/assets/icons/add.svg";
import settingsIcon from "@/assets/icons/settings.svg";
import { onMounted, ref } from "vue";
import { useUserInfoStore } from "@/stores/userinfo";
import { resolveAvatarSrc } from "@/services/api";
import { useRoute, useRouter } from "vue-router";

const me = ref(null);
const userinfo = useUserInfoStore();

onMounted(async () => {
  me.value = await userinfo.get(true);
});

const router = useRouter();
const route = useRoute();

async function goProfile(path) {
  const currentPath = route.path;
  await router.push({ path: path, force: true });
  if (currentPath !== path) {
    await router.go(0);
  }
}
</script>

<style lang="scss" scoped>
nav {
  z-index: 999;
  border-top: #333333 solid 1px;
  position: fixed;
  bottom: 0;
  @media only screen and (min-width: 640px) {
    display: none;
  };
  width: 100%;
  display: flex;
  border-bottom: #333333 solid 1px;
  align-items: center;
  justify-items: center;
  gap: 2em;
  padding: 0.5rem 1.5rem;
  background-color: var(--app-background-color);

  .button {
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    height: 2.5rem;
    width: 2.5rem;

    &--active {
      background: var(--app-active-color);
    }
  }

  .profile-button {
    margin-left: auto;

    &--active {
      border: #eeeeee solid 2.5px;
    }
  }
}

</style>