<script setup>
import { NInput, NButton, NDropdown, NIcon } from "naive-ui";
import {
  PersonCircleOutline,
  SettingsOutline,
  LogOutOutline,
  HomeOutline,
  PlanetOutline,
  Add,
  NotificationsOutline
} from "@vicons/ionicons5";
import { h } from "vue";

defineProps({
  isProfile: Boolean
});

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};

const options = [
  {
    label: "Profile",
    key: "profile",
    icon: renderIcon(PersonCircleOutline)
  },
  {
    label: "Settings",
    key: "settings",
    icon: renderIcon(SettingsOutline)
  },
  {
    label: "Logout",
    key: "logout",
    icon: renderIcon(LogOutOutline)
  }
];
</script>
<template>
  <nav>
    <RouterLink to="/explore">
      <n-button circle quaternary size="medium" strong>
        <n-icon size="large">
          <planet-outline />
        </n-icon>
      </n-button>
    </RouterLink>
    <RouterLink to="/feed">
      <n-button circle quaternary size="medium" strong>
        <n-icon size="large">
          <home-outline />
        </n-icon>
      </n-button>
    </RouterLink >
    <RouterLink to="/new">
    <n-button circle quaternary size="medium" strong>
      <n-icon size="x-large">
        <add />
      </n-icon>
    </n-button>
    </RouterLink >
    <n-input
      class="search"
      clearable
      placeholder="Хочу взглянуть на что-нибудь красивое!"
      round
      type="text"
    />
    <n-button circle quaternary size="medium">
      <n-icon size="x-large">
        <notifications-outline />
      </n-icon>
    </n-button>
    <n-dropdown :options="options" class="button-options">
      <n-button :class="{'button-profile': true, 'button-profile--active': isProfile}" size="large" text circle>
        <n-icon size="2.3em">
          <img alt="me" src="https://i.pinimg.com/564x/05/83/7b/05837bb34590e47ca8c72b948d69524b.jpg">
        </n-icon>
      </n-button>
    </n-dropdown>

  </nav>

</template>


<style lang="scss" scoped>
nav {
  display: flex;
  border-bottom: #333333 solid 1px;
  align-items: center;
  justify-items: center;
  gap: 1em;
  padding: 1em;
  height: 100%;
  background-color: var(--background-color);

  .button-profile {
    img {
      max-width: 100%;
      border-radius: 100%;
    }
  }

  .button-options {
    justify-self: start;
  }


}

.button-profile--active {
  border: white 2px solid;
  padding: 3px;
}

</style>