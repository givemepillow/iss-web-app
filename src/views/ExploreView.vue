<script setup>
import WallFeed from "@/components/wall/WallFeed.vue";
import BaseView from "@/views/BaseView.vue";
import NavigationBar from "@/components/NavigationBar.vue";
</script>


<template>
  <BaseView>
    <template #header>
      <NavigationBar/>
    </template>
    <template #main>
      <WallFeed />
    </template>
    <template #footer></template>
  </BaseView>
</template>
