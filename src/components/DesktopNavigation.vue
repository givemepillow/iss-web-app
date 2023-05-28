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
      <RouterLink to="/profile">
        <IconButton :alpha="0" :shadow="false" :size="3" :src="profileIcon" />
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import IconButton from "@/components/buttons/IconButton.vue";
import exploreIcon from "@/assets/icons/explore.svg";
import addIcon from "@/assets/icons/add.svg";
import profileIcon from "@/assets/icons/profile.svg";


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
  padding: 0.5rem 1rem;
  border-bottom: #393939 solid 1px;
  box-shadow: var(--app-default-shadow);
  background-color: var(--app-default-color);

  .profile-button {
    margin-left: auto;
  }
}

</style>