<script setup>
import NavigationHeader from "@/components/NavigationBar.vue";
import TemplatePage from "@/pages/TemplatePage.vue";
</script>

<template>
  <TemplatePage>
    <template v-slot:header>
      <NavigationHeader :is-profile="false"/>
    </template>
    <template v-slot:main>
<!--      <FeedCollection />-->
    </template>
    <template v-slot:footer>
      <NavigationHeader />
    </template>
  </TemplatePage>
</template>