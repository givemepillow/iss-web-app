<script setup>
import TemplatePage from "@/pages/BasePage.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import CreatePost from "@/components/create-post/CreatePost.vue";
</script>


<template>
  <TemplatePage>
    <template v-slot:header>
      <NavigationBar/>
    </template>
    <template v-slot:main>
      <CreatePost/>
    </template>
    <template v-slot:footer></template>
  </TemplatePage>
</template>

