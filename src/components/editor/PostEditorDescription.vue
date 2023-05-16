<template>
  <div class="description">
    <textarea
      v-model.trim="value"
      :maxlength="props.maxlength"
      :placeholder="props.placeholder"
      class="description__textarea"
      wrap="hard"
    ></textarea>
    <div ref="emojiButton" class="description__bottom">
      <img :src="emojiIcon" alt="" class="description__emoji">
      <div class="description__counter">
        {{ value.length }} / {{ props.maxlength }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import emojiIcon from "@/assets/icons/emoji.svg";
import { createPopup } from "@picmo/popup-picker";

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

const emojiButton = ref(null);
const value = ref("");

defineExpose({
  value
});


onMounted(() => {
  const picker = createPopup({
    emojisPerRow: 6,
    visibleRows: 4,
    showSearch: false,
    showCategoryTabs: false,
    showRecents: true,
    showPreview: false,
    showVariants: false,
    theme: "darkTheme",
    emojiSize: "1.5rem"
  }, {
    referenceElement: emojiButton.value,
    triggerElement: emojiButton.value,
    position: "bottom-start",
    showCloseButton: false,
    hideOnEscape: true,
    hideOnClickOutside: true,
    hideOnEmojiSelect: false,
    onPositionLost: "close"
  });
  picker.addEventListener("emoji:select", (selection) => {
    value.value += selection.emoji;
  });
  emojiButton.value.addEventListener("click", () => {
    picker.toggle();
  });
});
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
    background-color: var(--default-color);
  }

  &__bottom {
    margin: 0;
    padding: 0;
    display: flex;
    background-color: var(--default-color);
    //align-self: end;
  }

  &__counter {
    font-size: 75%;
    margin-left: auto;
    margin-bottom: 0;
    color: rgba(255, 255, 255, 0.5);
  }

  &__emoji {
    user-select: none;
    -webkit-user-drag: none;
    height: 1.3em;
    width: 1.3em;
    cursor: pointer;
    background-color: transparent;
    opacity: 0.5;
  }

  ::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }
}
</style>