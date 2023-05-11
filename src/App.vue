<script setup>
import { RouterView } from "vue-router";
import { NConfigProvider, NMessageProvider, NDialogProvider, darkTheme } from "naive-ui";
import { computed } from "vue";


const editedTheme = computed(() => {
  darkTheme.common.primaryColor = "#bbd0ff";
  darkTheme.common.primaryColorHover = "#ffd6ff";
  darkTheme.common.primaryColorPressed = "#c8b6ff";
  darkTheme.common.primaryColorSuppl = "#e7c6ff";
  return darkTheme;
});

</script>
<template>
  <n-config-provider :theme="editedTheme">
    <n-dialog-provider>
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>