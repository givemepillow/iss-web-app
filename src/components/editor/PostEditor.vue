<template>
  <div class="editor">
    <div class="editor__cropper">
      <CropperCarousel ref="cropper" />
    </div>
    <div class="editor__info">
      <div class="editor__info--header">
        <PostEditorUser />
        <PostEditorTitle :maxlength="25" placeholder="Придумайте название..." />
      </div>
      <div class="editor__info--middle">
        <PostEditorDescription :maxlength="500" placeholder="Добавьте описание..." />
      </div>
      <div class="editor__info--bottom">
        <CreatePostSubmitItem :disabled="cropper?.links?.length === 0" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CropperCarousel from "@/components/editor/PostEditorCarousel.vue";
import CreatePostSubmitItem from "@/components/editor/PostEditorSubmit.vue";
import PostEditorDescription from "@/components/editor/PostEditorDescription.vue";
import PostEditorTitle from "@/components/editor/PostEditorTitle.vue";
import PostEditorUser from "@/components/common/UserLabel.vue";


const cropper = ref(null);

</script>

<style lang="scss" scoped>
$gap: 0.5rem;
$padding: 0.5rem;

.editor {
  padding: $padding;
  justify-content: center;
  display: grid;
  grid-gap: $gap;
  overflow: clip;

  @media only screen and (min-width: 980px) {
    grid-template-columns: 550px 20rem;
    grid-template-rows: 550px;
  };

  @media only screen and (max-width: 980px) {
    grid-template-columns:  450px  min(20rem, calc(100% - 450px));
    grid-template-rows:  450px;
  };

  @media only screen and (max-width: 740px) {
    $width: 80vw;
    grid-template-columns: $width;
    grid-template-rows: $width $width;
  };

  @media only screen and (max-width: 480px) {
    $width: calc(100vw - var(--scrollbar-width) - $padding * 2);
    grid-template-columns: $width;
    grid-template-rows: $width 30rem;
  };

  &__cropper {
    background-color: var(--default-color);
    border-radius: var(--border-radius);
    box-shadow: var(--default-box-shdow);
  }

  &__info {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 2fr 7fr 3rem;
    grid-gap: $gap;

    &--header {
      background-color: var(--default-color);
      border-radius: var(--border-radius);
      box-shadow: var(--default-box-shdow);
      overflow: clip;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 1fr 1fr;
      grid-gap: $gap;
      padding: 0.75rem;
    }

    &--middle {
      background-color: var(--default-color);
      border-radius: var(--border-radius);
      box-shadow: var(--default-box-shdow);
      overflow: clip;
      padding: 0.75rem;
    }

    &--bottom {
      background-color: var(--default-color);
      border-radius: var(--border-radius);
      overflow: clip;
      box-shadow: var(--default-box-shdow);
      height: 100%;
    }
  }
}
</style>


