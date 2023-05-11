<script setup>
import PostItem from "@/components/post/PostItem.vue";
import WallFeed from "@/components/wall/WallFeed.vue";
import BaseView from "@/views/BaseView.vue";
</script>

<template>
  <BaseView>
    <template #header>
    </template>
    <template #main>
      <PostItem />
      <WallFeed />
    </template>
    <template #footer>
    </template>
  </BaseView>
</template>