<template>
  <nav>
    <RouterLink to="/explore">
      <IconButton :alpha="0" :shadow="false" :size="3" :src="exploreIcon" />
    </RouterLink>
    <RouterLink to="/new">
      <IconButton :alpha="0" :shadow="false" :size="3" :src="addIcon" />
    </RouterLink>
  </nav>
</template>

<script setup>
import IconButton from "@/components/buttons/IconButton.vue";
import exploreIcon from "@/assets/icons/explore.svg";
import addIcon from "@/assets/icons/add.svg";


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
  padding: 0.5rem;
  background-color: var(--app-background-color);
}

</style>