<template>
  <div class="description">
    <textarea
      ref="textareaElement"
      v-model.trim="value"
      :maxlength="props.maxlength"
      :placeholder="props.placeholder"
      class="description__textarea"
      wrap="hard"
    ></textarea>
    <div ref="emojiButton" class="description__bottom">
      <EmojiButton @emoji="onEmoji" class="description__emoji"/>
      <div class="description__counter">
        {{ value.length }} / {{ props.maxlength }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import EmojiButton from "@/components/buttons/EmojiButton.vue";

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

const textareaElement = ref(null);
const value = ref("");

defineExpose({
  value
});

function onEmoji(emoji) {
  if (!(value.value.length + emoji.length < props.maxlength)) {
    return;
  }
  let i = textareaElement.value.selectionEnd;
  value.value = value.value.slice(0, i) + emoji + value.value.slice(i);
}

</script>

<style lang="scss" scoped>


.description {
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr auto;
  grid-gap: 0.5rem;

  &__textarea {
    font-family: inherit;
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    resize: none;
    border: none;
    outline: none;
    color: whitesmoke;
    font-size: 12pt;
    font-weight: normal;
    background-color: transparent;
  }

  &__bottom {
    margin: 0;
    padding: 0;
    display: flex;
    background-color: transparent;
  }

  &__counter {
    font-size: 75%;
    margin-left: auto;
    margin-bottom: 0;
    color: rgba(255, 255, 255, 0.5);
  }

  &__emoji {
    height: 1.3em;
    width: 1.3em;
  }

  ::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }
}
</style>