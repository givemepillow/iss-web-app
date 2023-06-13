<template>
  <nav>
    <div class="logo-button button">
      <RouterLink to="/">
        <IconTextButton :font-size="28" :size="3" :src="shareIcon" text="ISS" />
      </RouterLink>
    </div>
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
      <IconButton
        :alpha="0"
        :padding="0"
        :shadow="false"
        :size="2"
        :src="resolveAvatarSrc(me?.id, me?.avatarId)"
        class="icon"
        @click="goProfile('/'+(me?.username ?? ''))"
      />
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
import { onBeforeMount, ref } from "vue";
import { useUserInfoStore } from "@/stores/userinfo";
import { resolveAvatarSrc } from "@/services/api";
import shareIcon from "@/assets/icons/share.svg";
import IconTextButton from "@/components/buttons/IconTextButton.vue";
import { useRoute, useRouter } from "vue-router";

const me = ref(null);
const userinfo = useUserInfoStore();

onBeforeMount(async () => {
  me.value = await userinfo.get(false);
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
nav {
  @media only screen and (max-width: 639px) {
    display: none;
  };
  z-index: 999;
  width: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 1em;
  height: 100%;
  padding: 0.5rem 1rem;
  border-bottom: #393939 solid 1px;
  box-shadow: var(--app-default-shadow);
  background-color: var(--app-default-color);

  .logo-button {
    margin: 0 2rem;
  }

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