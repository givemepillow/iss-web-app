<script setup>
import { RouterView } from "vue-router";
import { NConfigProvider, NMessageProvider, NDialogProvider, darkTheme } from "naive-ui";
import { computed } from "vue";


const editedTheme = computed(() => {
  darkTheme.common.primaryColor = "#ffffff";
  darkTheme.common.primaryColorHover = "#ffffff";
  darkTheme.common.primaryColorPressed = "#ffffff";
  darkTheme.common.primaryColorSuppl = "#ffffff";
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

<style lang="scss">


</style>