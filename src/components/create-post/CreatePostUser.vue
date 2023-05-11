<template>
  <div class="user-label-container">
    <UserButton :size="36" />
    <p>Анонимный Пользователь</p>
  </div>
</template>

<script setup>
import UserButton from "@/components/buttons/UserButton.vue";
</script>

<style scoped>
.user-label-container {
    display: flex;
    gap: 1em;
    align-items: center;
    font-size: 12pt;
}
</style>