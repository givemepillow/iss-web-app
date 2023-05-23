<template>
  <div class="editor">
    <div class="editor__card editor__user editor__user--mobile">
      <UserLabel :user="userinfo.user" />
    </div>
    <div class="editor__cropper editor__card ">
      <PostEditorCarousel ref="cropperCarouselElement" />
    </div>
    <div class="editor__info">
      <div class="editor__card editor__info--header">
        <div class="editor__user editor__user--desktop">
          <UserLabel :user="userinfo.user" />
        </div>
        <PostEditorTitle ref="titleElement" :maxlength="25" placeholder="Придумайте название..." />
      </div>
      <div class="editor__card editor__info--middle">
        <PostEditorDescription ref="descriptionElement" :maxlength="500" placeholder="Добавьте описание..." />
      </div>
      <div class="editor__card editor__info--bottom">
        <CreatePostSubmit
          :disabled="!(cropperCarouselElement?.isReadyToPost ?? false)"
          :pending="isPostPending"
          @click="onCreatePost"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import PostEditorCarousel from "@/components/editor/PostEditorCarousel.vue";
import CreatePostSubmit from "@/components/editor/PostEditorSubmit.vue";
import PostEditorDescription from "@/components/editor/PostEditorDescription.vue";
import PostEditorTitle from "@/components/editor/PostEditorTitle.vue";
import UserLabel from "@/components/common/UserLabel.vue";
import { publishPost } from "@/services/api";
import { useUserInfoStore } from "@/stores/userinfo";

const cropperCarouselElement = ref(null);
const descriptionElement = ref(null);
const titleElement = ref(null);

const isPostPending = ref(false);
const isPostCreated = ref(false);


const userinfo = useUserInfoStore();


async function onCreatePost() {
  isPostPending.value = true;

  let formData = new FormData();

  formData.append("title", titleElement.value.value);
  formData.append("description", descriptionElement.value.value);

  for (let flag of cropperCarouselElement.value.getSaveOriginals()) {
    formData.append("saveOriginals", flag);
  }

  for (let area of cropperCarouselElement.value.getAreas()) {
    formData.append("areas", JSON.stringify(area));
  }

  for (let file of cropperCarouselElement.value.getFiles()) {
    formData.append("files", file, file.name);
  }

  let response = await publishPost(formData);
  if (response.ok) {
    isPostPending.value = false;
    isPostCreated.value = true;
  }
}

onBeforeMount(async () => {
  await userinfo.load();
});

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
  opacity: 1;

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
    $width: calc(100vw - var(--app-scrollbar-width) - $padding * 2);
    grid-template-columns: $width;
    grid-template-rows: auto $width 30rem 4rem;
  };

  &__card {
    background-color: var(--app-default-color);
    border-radius: var(--app-border-radius);
    box-shadow: var(--app-default-shadow);
    border: var(--app-default-border);
  }

  &__user {


    &--mobile {
      @media only screen and (min-width: 481px) {
        display: none;
      };
      padding: 0.75rem;
    }

    &--desktop {
      @media only screen and (max-width: 480px) {
        display: none;
      };
    }
  }

  &__info {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 2fr 7fr 3rem;
    grid-gap: $gap;

    &--header {
      overflow: clip;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 1fr 1fr;
      grid-gap: $gap;
      padding: 0.75rem;
    }

    &--middle {
      overflow: clip;
      padding: 0.75rem;
    }

    &--bottom {
      overflow: clip;
      height: 100%;
    }
  }
}
</style>


