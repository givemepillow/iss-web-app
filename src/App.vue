<template>
  <AppView>
    <template #header>
      <DesktopNavigation v-if="$route.name !== 'login'" />
    </template>
    <template #main>
      <router-view v-slot="{Component, route}">
        <transition
          :enter-active-class="route.meta.enterClass"
          :leave-active-class="route.meta.leaveClass"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </template>
    <template #footer>
      <MobileNavigation v-if="$route.name !== 'login'" />
    </template>
  </AppView>
</template>


<script setup>
import { RouterView } from "vue-router";
import "animate.css";
import DesktopNavigation from "@/components/DesktopNavigation.vue";
import MobileNavigation from "@/components/MobileNavigation.vue";
import AppView from "@/views/AppView.vue";
</script>

