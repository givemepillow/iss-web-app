<script setup>
import NavigationHeader from "@/components/NavigationBar.vue";
import TemplatePage from "@/pages/BasePage.vue";
import ExplorePage from "@/pages/ExplorePage.vue";
</script>

<template>
  <TemplatePage>
    <template v-slot:header>
      <NavigationHeader :is-profile="false"/>
    </template>
    <template v-slot:main>
      <ExplorePage/>
    </template>
    <template v-slot:footer>
<!--      <NavigationHeader />-->
    </template>
  </TemplatePage>
</template>