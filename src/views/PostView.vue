<script setup>
import PostItem from "@/components/post/PostItem.vue";
import WallFeed from "@/components/wall/WallFeed.vue";
import TemplatePage from "@/pages/BasePage.vue";
import NavigationBar from "@/components/NavigationBar.vue";
</script>


<template>
  <TemplatePage>
    <template v-slot:header>
      <NavigationBar/>
    </template>
    <template v-slot:main>
      <PostItem />
      <WallFeed />
    </template>
    <template v-slot:footer></template>
  </TemplatePage>
</template>

