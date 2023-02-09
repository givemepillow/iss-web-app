<script setup>
import NavigationHeader from "@/components/NavigationBar.vue";
import TemplatePage from "@/pages/TemplatePage.vue";
import CreatePostPage from "@/pages/CreatePostPage.vue";
</script>

<template>
  <TemplatePage>
    <template v-slot:header>
      <NavigationHeader :is-profile="false"/>
    </template>
    <template v-slot:main>
      <CreatePostPage/>
    </template>
    <template v-slot:footer>
    </template>
  </TemplatePage>
</template>