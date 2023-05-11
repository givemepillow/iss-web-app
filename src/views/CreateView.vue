<script setup>
import BaseView from "@/views/BaseView.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import CreatePost from "@/components/create-post/CreatePost.vue";
</script>


<template>
  <BaseView>
    <template #header>
      <NavigationBar/>
    </template>
    <template #main>
      <CreatePost/>
    </template>
    <template #footer></template>
  </BaseView>
</template>

