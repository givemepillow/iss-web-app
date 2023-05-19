<template>
  <Teleport to="body">
    <div class="modal-container">
      <div class="modal-window">
        <p class="modal-window__text">
          {{ props.text }}
        </p>
        <BaseButton class="modal-window__button" text="ОК" @click="emit('submit')" />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import BaseButton from "@/components/buttons/AppButton.vue";

const props = defineProps({
  text: {
    type: String,
    required: true
  }
});

const emit = defineEmits(["submit"]);

</script>

<style lang="scss" scoped>

.modal-container {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.56);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-window {
  background-color: var(--app-background-color);
  box-shadow: rgba(0, 0, 0, 0.56) 0 22px 70px 4px;
  border-radius: var(--app-border-radius);
  border: var(--app-default-border);

  max-height: 30rem;
  width: 20rem;

  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 2rem;
  padding: 1rem;
  grid-gap: 1rem;

  &__text {
    display: block;
    color: var(--app-text-color);
    text-align: center;
  }

  &__button {
    height: 100%;
    width: 30%;
    justify-self: center;
    font-size: 12pt;
    background-color: #1C1C1C;
    border: #555555 solid 1px;
  }
}
</style>