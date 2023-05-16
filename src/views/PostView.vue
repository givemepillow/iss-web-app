<script setup>
import PostObserver from "@/components/observer/PostObserver.vue";
import BaseView from "@/views/BaseView.vue";
import DesktopNavigation from "@/components/DesktopNavigation.vue";
import MobileNavigation from "@/components/MobileNavigation.vue";


const props = defineProps({
  post_id: {
    type: String
  }
});
</script>


<template>
  <BaseView>
    <template #header>
      <DesktopNavigation />
    </template>
    <template #main>
      <PostObserver :post_id="Number(props.post_id)" />
    </template>
    <template #footer>
      <MobileNavigation />
    </template>
  </BaseView>
</template>
