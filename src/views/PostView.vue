<script setup>
import PostItem from "@/components/observer/PostObserver.vue";
import BaseView from "@/views/BaseView.vue";
</script>


<template>
  <BaseView>
    <template #header></template>
    <template #main>
      <PostItem />
    </template>
    <template #footer></template>
  </BaseView>
</template>

