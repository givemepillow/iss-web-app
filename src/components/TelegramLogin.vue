<template>
  <div ref="telegram"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const emit = defineEmits(["callback"]);

const telegram = ref()

function onTelegramAuth (user) {
  emit("callback", user)
}

onMounted(() => {
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://telegram.org/js/telegram-widget.js?22'
  script.setAttribute('data-size', 'large')
  script.setAttribute('data-userpic', 'true')
  script.setAttribute('data-telegram-login', 'ImageSharingServiceBot')
  script.setAttribute('data-request-access', 'write')
  script.setAttribute('data-radius', '20')
  window.onTelegramAuth = onTelegramAuth
  script.setAttribute('data-onauth', 'window.onTelegramAuth(user)')
  telegram.value.appendChild(script)
})

</script>

<style scoped>

</style>