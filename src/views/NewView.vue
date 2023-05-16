<script setup>
import BaseView from "@/views/BaseView.vue";
import CreatePost from "@/components/editor/PostEditor.vue";
import DesktopNavigation from "@/components/DesktopNavigation.vue";
import MobileNavigation from "@/components/MobileNavigation.vue";
</script>


<template>
  <BaseView>
    <template #header>
      <DesktopNavigation/>
    </template>
    <template #main>
      <CreatePost />
    </template>
    <template #footer>
      <MobileNavigation/>
    </template>
  </BaseView>
</template>

