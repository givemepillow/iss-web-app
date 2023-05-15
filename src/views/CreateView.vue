<script setup>
import BaseView from "@/views/BaseView.vue";
import CreatePost from "@/components/editor/PostEditor.vue";
</script>


<template>
  <BaseView>
    <template #header>
<!--      <NavigationBar/>-->
    </template>
    <template #main>
      <CreatePost/>
    </template>
    <template #footer></template>
  </BaseView>
</template>

