<template>
  <div class="title">
    <input
      v-model.trim="value"
      :maxlength="maxlength"
      :placeholder="placeholder" class="title__input"
      type="text"
    >
    <div class="title__bottom">
      <div class="title__counter">
        {{ value.length }} / {{ props.maxlength }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  maxlength: {
    type: Number,
    required: true,
    default: 10
  },
  placeholder: {
    type: String,
    required: false,
    default: ""
  }
});

const value = ref("");

defineExpose({
  value
});


</script>

<style lang="scss" scoped>
.title {
  background-color: transparent;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  grid-gap: 0;

  &__input {
    margin: 0;
    padding: 0;
    width: 100%;
    resize: none;
    border: none;
    outline: none;
    color: whitesmoke;
    font-size: 14pt;
    font-weight: bolder;
    background-color: transparent;
  }

  &__bottom {
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    background-color: transparent;
  }

  &__counter {
    font-size: 75%;
    margin-left: auto;
    color: rgba(255, 255, 255, 0.5);
    background-color: transparent;
  }
}
</style>