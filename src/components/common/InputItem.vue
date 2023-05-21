<template>
  <div class="input-item">
    <label
      :for="name"
      class="input-item__label"
    >
      {{ props.label }}
    </label>
    <input
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :max="max"
      :maxlength="maxlength"
      :minlength="minlength"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      class="input-item__input"
      @blur="$emit('blur')"
      @input="onInput"
    />
    <label
      v-if="!error && tip"
      :for="name"
      class="input-item__tip"
    >
      {{ tip }}
    </label>
    <label
      v-else-if="error"
      :for="name"
      class="input-item__error"
    >
      {{ error }}
    </label>
  </div>
</template>

<script setup>
import { toRef } from "vue";


const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: "Input field",
    required: false
  },
  tip: {
    type: String,
    default: "",
    required: false
  },
  error: {
    type: String,
    default: "",
    required: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: "Placeholder",
    required: false
  },
  type: {
    type: String,
    default: "text"
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  autocomplete: {
    type: String,
    default: "on"
  },
  max: {
    type: Number,
    default: 99999999
  },
  modelValue: {
    type: String,
    default: "",
    required: true
  },
  minlength: {
    type: Number,
    default: 0
  },
  maxlength: {
    type: Number,
    default: 1000
  },
  align: {
    type: String,
    default: "left"
  }
});


const emit = defineEmits(["update:modelValue", "blur"]);
const tip = toRef(props, "tip");
const error = toRef(props, "error");

function onInput(event) {
  if (props.type === "digits") {
    event.target.value = event.target.value.replace(/\D/g, "");
  }
  emit("update:modelValue", event.target.value);
}
</script>

<style lang="scss" scoped>
.input-item {
  display: block;

  &__label {
    position: absolute;
    bottom: 100%;
    display: block;
    margin: 0 0 0.3rem 0;
    padding: 0 0 0 .2rem;
    font-size: 9pt;
    color: var(--app-text-color)
  }

  &__tip, &__error {
    display: block;
    position: absolute;
    margin: 0 0 0 0;
    padding: 0 0 0 .2rem;
    font-size: 9pt;
    color: rgba(0, 0, 0, 0);
  }

  &__tip {
    color: rgba(165, 190, 0, 0.95);
  }

  &__error {
    color: rgba(237, 24, 50, 0.95);
  }

  &__input {
    width: 100%;
    margin: 0;
    background-color: var(--app-background-color);
    border-radius: var(--app-border-radius);
    outline: none;
    height: 2.2rem;
    font-size: 12pt;
    box-sizing: border-box;
    color: var(--app-text-color);
    padding: 0.3rem;
    border: #444444 solid 2px;
    transition: all ease-in-out 0.15s;
    text-align: v-bind(align);

    &:focus {
      border: rgba(8, 189, 189, 0.75) solid 2px;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: var(--app-text-color) !important;
      -webkit-box-shadow: 0 0 0 30px var(--app-background-color) inset !important;
    }
  }
}
</style>