<script setup>
import TemplatePage from "@/views/AppView.vue";
import LoginPage from "@/components/login/TheLogin.vue";
</script>

<template>
  <TemplatePage>
    <template v-slot:header>
    </template>
    <template v-slot:main>
      <LoginPage />
    </template>
    <template v-slot:footer>
    </template>
  </TemplatePage>
</template>