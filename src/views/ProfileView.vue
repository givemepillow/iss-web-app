<script setup>
import NavigationHeader from "@/components/DesktopNavigation.vue";
import BaseView from "@/views/BaseView.vue";
</script>

<template>
  <BaseView>
    <template #header>
      <NavigationHeader />
    </template>
    <template #main>
      Профиль
    </template>
    <template #footer>
    </template>
  </BaseView>
</template>
