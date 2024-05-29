<template>
  <div ref="emojiButton" class="emoji-button">
    <img :src="emojiIcon" alt="" class="description__emoji">
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import emojiIcon from "@/assets/icons/emoji.svg";
import { createPopup } from "@picmo/popup-picker";

const emojiButton = ref(null);

const emit = defineEmits(["emoji"]);


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
    className: "emoji-picker",
    emojiSize: "1.35rem"
  }, {
    referenceElement: emojiButton.value,
    triggerElement: emojiButton.value,
    position: "top-start",
    showCloseButton: false,
    hideOnEscape: true,
    hideOnClickOutside: true,
    hideOnEmojiSelect: false,
    onPositionLost: "close"
  });
  picker.addEventListener("emoji:select", (selection) => {
    emit("emoji", selection.emoji);
  });
  emojiButton.value.addEventListener("click", () => {
    picker.toggle();
  });
});
</script>

<style scoped>
.emoji-button {
    user-select: none;
    -webkit-user-drag: none;
    cursor: pointer;
    background-color: transparent;
    display: grid;
    align-items: center;
    justify-items: center;
}
</style>