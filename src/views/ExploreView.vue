<script setup>
import WallFeed from "@/components/wall/TheWall.vue";
import BaseView from "@/views/BaseView.vue";
</script>


<template>
  <BaseView>
    <template #header></template>
    <template #main>
      <WallFeed />
    </template>
    <template #footer></template>
  </BaseView>
</template>
