<script setup>
import NavigationHeader from "@/components/NavigationBar.vue";
import TemplatePage from "@/pages/BasePage.vue";
</script>

<template>
  <TemplatePage>
    <template v-slot:header>
      <NavigationHeader :is-profile="true" />
    </template>
    <template v-slot:main>
    </template>
    <template v-slot:footer>
    </template>
  </TemplatePage>
</template>
