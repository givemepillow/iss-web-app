<script setup>
import PostItem from "@/components/post/PostItem.vue";
import WallFeed from "@/components/wall/WallFeed.vue";
import TemplatePage from "@/pages/BasePage.vue";
</script>

<template>
  <TemplatePage>
    <template v-slot:header>
    </template>
    <template v-slot:main>
      <PostItem />
      <WallFeed />
    </template>
    <template v-slot:footer>
    </template>
  </TemplatePage>
</template>