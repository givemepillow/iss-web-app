<template>
  <div ref="telegramElement" :class="{'telegram-login--loaded': isLoaded}" class="telegram-login">
    <component
      is="script"
      ref="scriptElement"
      :data-telegram-login="props.telegramLogin"
      async
      data-onauth="window.onTelegramAuth(user)"
      data-radius="5"
      data-request-access="write"
      data-size="medium"
      src="https://telegram.org/js/telegram-widget.js?22"
      @load="onLoad"
    />
  </div>
</template>

<script setup>

import { onBeforeMount, ref } from "vue";

const props = defineProps({
  telegramLogin: {
    type: String,
    required: true
  }
});

const emit = defineEmits(["login"])

const scriptElement = ref(null);

const isLoaded = ref(false);

function onTelegramAuth(user) {
  emit("login", user)
}

onBeforeMount(() => {
  window.onTelegramAuth = onTelegramAuth;
});

function onLoad(e) {
  console.log(e)
  isLoaded.value = true
}
</script>

<style lang="scss" scoped>
.telegram-login {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ease-in-out 0.75s;

  &--loaded {
    opacity: 1;
  }
}
</style>