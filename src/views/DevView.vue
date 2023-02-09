<script setup>
import NavigationHeader from "@/components/NavigationBar.vue";
import TemplatePage from "@/pages/TemplatePage.vue";
import PostCreator from "@/pages/CreatePostPage.vue";
</script>

<template>
  <TemplatePage>
    <template v-slot:header>
      <NavigationHeader :is-profile="false"/>
    </template>
    <template v-slot:main>
      <PostCreator/>
    </template>
    <template v-slot:footer>
    </template>
  </TemplatePage>
</template>