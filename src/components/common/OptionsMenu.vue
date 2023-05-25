<template>
  <div class="options-menu">
    <IconButton :alpha="0" :shadow="false" :size="2.5" :src="moreIcon" style="opacity: 0.5" @click="toggle" />
    <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in"
    >
      <div v-if="isOpen" class="options-menu__container">
        <div v-for="option in props.options" :key="option.key" class="options-menu__list">
          <div class="options-menu__item" @click="onClick(option.key)">
            <img :src="option.icon" alt="" class="options-menu__icon">
            {{ option.text }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import moreIcon from "@/assets/icons/more.svg";
import trashIcon from "@/assets/icons/trash.svg";
import IconButton from "@/components/buttons/IconButton.vue";
import { ref } from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: [{ key: 1, text: "Удалить", icon: trashIcon }]
  }
});

const emit = defineEmits(["select"]);

const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}

function onClick(key) {
  emit("select", key);
  toggle();
}
</script>

<style lang="scss" scoped>
.options-menu {


  &__container {
    position: absolute;
    right: 1.5rem;
    z-index: 999;
    background: rgba(0, 0, 0, 0.59);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    border: 1px solid rgba(0, 0, 0, 0.23);
    overflow: hidden;
  }

  &__list {

    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 2rem;
    align-items: center;
    padding: 0.5rem;
    color: var(--app-text-color);
    font-size: 12pt;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: left;
    height: 2rem;
    cursor: pointer;
    gap: 0.2rem;
  }

  &__icon {
    height: 1.5rem
  }
}
</style>