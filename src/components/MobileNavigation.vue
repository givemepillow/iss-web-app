<template>
  <nav>
    <div class="explore-button">
      <RouterLink to="/explore">
        <IconButton :alpha="0" :shadow="false" :size="3" :src="exploreIcon" />
      </RouterLink>
    </div>
    <div class="new-button">
      <RouterLink to="/new">
        <IconButton :alpha="0" :shadow="false" :size="3" :src="addIcon" />
      </RouterLink>
    </div>
    <div class="profile-button">
      <RouterLink :key="$route.fullPath" :to="'/'+(me?.username ?? '')">
        <IconButton :alpha="0" :shadow="false" :size="2.7" :src="profileIcon" />
      </RouterLink>
    </div>
    <div class="settings-button">
      <RouterLink to="/settings">
        <IconButton :alpha="0" :shadow="false" :size="3.2" :src="settingsIcon" />
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import IconButton from "@/components/buttons/IconButton.vue";
import exploreIcon from "@/assets/icons/explore.svg";
import addIcon from "@/assets/icons/add.svg";
import profileIcon from "@/assets/icons/profile.svg";
import settingsIcon from "@/assets/icons/settings.svg";
import { onMounted, ref } from "vue";
import { useUserInfoStore } from "@/stores/userinfo";

const me = ref(null);
const userinfo = useUserInfoStore();

onMounted(async () => {
  me.value = await userinfo.get(true);
});
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
  gap: 1em;
  padding: 0.5rem 1rem;
  background-color: var(--app-background-color);

  .profile-button {
    margin-left: auto;
  }
}

</style>