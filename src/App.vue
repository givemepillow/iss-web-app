<template>
  <AppView>
    <template #header>
      <Transition
        enter-active-class="animate__animated animate__slideInDown"
        leave-active-class="animate__animated animate__slideOutUp"
        mode="in-out"
      >
        <DesktopNavigation v-if="($route.name ?? 'login') !== 'login'" />
      </Transition>
    </template>
    <template #main>
      <RouterView v-slot="{Component, route}">
        <template v-if="Component">
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
        </template>
      </RouterView>
    </template>
    <template #footer>
      <Transition
        enter-active-class="animate__animated animate__slideInUp"
        leave-active-class="animate__animated animate__slideOutDown"
        mode="out-in"
      >
        <MobileNavigation v-if="($route.name ?? 'login') !== 'login'" />
      </Transition>
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

