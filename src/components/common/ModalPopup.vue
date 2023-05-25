<template>
  <div class="modal-popup" @click.stop>
    <div class="modal-popup__card" @click.stop>
      <p class="modal-popup__text" @click.stop>
        {{ props.text }}
      </p>
      <AppButton
        class="modal-popup__button modal-popup__button--confirm"
        text="Подтвердить"
        @click="$emit('confirm')"
      />
      <AppButton
        class="modal-popup__button modal-popup__button--reject"
        text="Отмена"
        @click="$emit('reject')"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: String
});

import { ref } from "vue";
import AppButton from "@/components/buttons/AppButton.vue";

const isOpen = ref(false);
const text = ref("");

function close() {
  isOpen.value = false;
}

function open() {
  isOpen.value = true;
}


defineExpose({
  open, close
});

</script>

<style lang="scss" scoped>
.modal-popup {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;

  &__card {
    background: rgba(0, 0, 0, 0.65);
    border-radius: var(--app-border-radius);;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    max-width: 20rem;
  }

  &__text {
    //background-color: #3399ff;
    grid-column: 1 / 3;
    text-align: center;
    color: var(--app-text-color);
    font-size: 10fr;
    word-wrap: normal;
    user-select: none;
  }

  &__button {
    &--confirm {
      background: #72b01d;
    }

    &--reject {
      background: #d00000;
    }
  }
}
</style>