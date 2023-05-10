<template>
  <div class="description-input-container">
    <textarea
      ref="textarea"
      v-model.trim="text"
      maxlength="2000"
      placeholder="Добавьте какое-ниюудь описание..."
    ></textarea>
    <div class="textarea-tools">
      <button ref="trigger" @click="onCLick">
        <EmojiButton />
      </button>
      <div class="capacity">
        {{ text.length }}/2000
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import { createPopup } from "@picmo/popup-picker";
import EmojiButton from "@/components/buttons/EmojiButton.vue";

const text = ref("");
const textarea = ref(null);
const trigger = ref(null);
let picker = null;

function onCLick() {
  picker.toggle();
}

onMounted(() => {
  picker = createPopup({
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
    referenceElement: trigger.value,
    triggerElement: trigger.value,
    position: "bottom-start",
    showCloseButton: false,
    hideOnEscape: true,
    hideOnClickOutside: true,
    hideOnEmojiSelect: false,
    onPositionLost: "close"
  });
  picker.addEventListener("emoji:select", (selection) => {
    text.value += selection.emoji;
  });

});
</script>

<style lang="scss" scoped>
.description-input-container {
  height: 100%;
  width: 100%;
  padding: 0.5em;

  textarea {
    min-height: 100%;
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: large;
    color: white;
    resize: none;
    padding: 0;
  }

  .textarea-tools {
    border-top: #444444 solid 1px;
    padding-top: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {

      background: transparent;
      border: none;
      opacity: 0.5;
      padding: 0;
      margin: 0;
    }

    .capacity {

    }
  }


}
</style>