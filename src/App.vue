<template>
  <AppView>
    <template #header>
      <DesktopNavigation v-if="$route.name !== 'login'" />
    </template>
    <template #main>
      <RouterView v-slot="{Component, route}">
        <Transition
          :enter-active-class="route.meta.enterClass"
          :leave-active-class="route.meta.leaveClass"
          mode="out-in"
        >
            <Suspense>
              <component :is="Component" />
              <template #fallback>
                <BackgroundOverlay>
                  <TheLoading />
                </BackgroundOverlay>
              </template>
            </Suspense>
        </Transition>
      </RouterView>
    </template>
    <template #footer>
      <MobileNavigation v-if="$route.name !== 'login'" />
    </template>
  </AppView>
  <NotificationPopUp ref="notificationElement" text="ОШИБКА!!!" />
</template>


<script setup>
import { provide, ref } from "vue";
import { RouterView } from "vue-router";

import "animate.css";

import DesktopNavigation from "@/components/DesktopNavigation.vue";
import MobileNavigation from "@/components/MobileNavigation.vue";
import AppView from "@/views/AppView.vue";
import NotificationPopUp from "@/components/common/NotificationPopup.vue";
import BackgroundOverlay from "@/components/common/BackgroundOverlay.vue";
import TheLoading from "@/components/common/TheLoading.vue";


const notificationElement = ref(null);

function show(message) {
  notificationElement.value.open(message);
}

function hide() {
  notificationElement.value.close();
}

provide("showNotification", show);
provide("hideNotification", hide);

</script>

<style scoped>

</style>

