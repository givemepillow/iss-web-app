<script setup>
import WallFeed from "@/components/wall/TheWall.vue";
import BaseView from "@/views/AppView.vue";
import DesktopNavigation from "@/components/DesktopNavigation.vue";
import MobileNavigation from "@/components/MobileNavigation.vue";

</script>


<template>
  <BaseView>
    <template #header>
<!--      <MobileSearch/>-->
      <DesktopNavigation />
    </template>
    <template #main>
      <WallFeed />
    </template>
    <template #footer>
      <MobileNavigation />
    </template>
  </BaseView>
</template>



