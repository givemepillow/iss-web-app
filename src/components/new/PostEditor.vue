<template>
  <div class="editor">
    <BackgroundOverlay v-if="isPostPending">
      <TheLoading />
    </BackgroundOverlay>
    <div class="editor__user editor__user--mobile">
      <UserLabel :user="me" />
    </div>
    <div class="editor__cropper app-card">
      <PostEditorCarousel ref="cropperCarouselElement" />
    </div>
    <div class="editor__info">
      <div class="editor__info--header  app-card">
        <div class="editor__user editor__user--desktop">
          <UserLabel :user="me" />
        </div>
        <PostEditorTitle ref="titleElement" :maxlength="25" placeholder="Придумайте название..." />
      </div>
      <div class="editor__info--middle  app-card">
        <PostEditorDescription ref="descriptionElement" :maxlength="500" placeholder="Добавьте описание..." />
      </div>
      <div class="editor__info--bottom">
        <CreatePostSubmit
          :disabled="!(cropperCarouselElement?.isReady ?? false)"
          @click="onCreatePost"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import PostEditorCarousel from "@/components/common/CropperCarousel.vue";
import CreatePostSubmit from "@/components/new/PostEditorSubmit.vue";
import PostEditorDescription from "@/components/new/PostEditorDescription.vue";
import PostEditorTitle from "@/components/new/PostEditorTitle.vue";
import UserLabel from "@/components/common/UserLabel.vue";
import { publishPost } from "@/services/api";
import { useUserInfoStore } from "@/stores/userinfo";
import { useRouter } from "vue-router";
import BackgroundOverlay from "@/components/common/BackgroundOverlay.vue";
import TheLoading from "@/components/common/TheLoading.vue";

const cropperCarouselElement = ref(null);
const descriptionElement = ref(null);
const titleElement = ref(null);

const isPostPending = ref(false);


const userinfo = useUserInfoStore();
const router = useRouter();
const showNotification = inject("showNotification");

async function onCreatePost() {
  if (!(cropperCarouselElement.value?.isReady ?? false)) {
    return;
  }

  isPostPending.value = true;

  let formData = new FormData();

  formData.append("title", titleElement.value.value);
  formData.append("description", descriptionElement.value.value);
  formData.append("aspectRatio", cropperCarouselElement.value.currentRatio);

  for (let flag of cropperCarouselElement.value.getSaveOriginals()) {
    formData.append("saveOriginals", flag);
  }

  for (let area of cropperCarouselElement.value.getAreas()) {
    formData.append("areas", JSON.stringify(area));
  }

  for (let file of cropperCarouselElement.value.getFiles()) {
    formData.append("files", file, file.name);
  }

  // await new Promise(r => setTimeout(r,2000));

  try {
    let response = await publishPost(formData);
    if (response.ok) {
      router.go(-1);
      showNotification((await response.json()).detail);
    } else {
      showNotification((await response.json()).detail);
      isPostPending.value = false;
    }
  } catch (e) {
    showNotification(e);
    isPostPending.value = false;
  }

}

const me = await userinfo.get(true);

</script>

<style lang="scss" scoped>
$gap: 0.5rem;
$padding: 0.5rem;
.loading {
  top: 15rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.created {
  top: 15rem;
  width: 100%;
  font-size: 26pt;
  display: flex;
  align-items: center;
  justify-content: center;
}


.editor {
  padding: $padding;
  justify-content: center;
  display: grid;
  grid-gap: $gap;
  overflow: clip;
  opacity: 1;
  user-select: none;

  @media only screen and (min-width: 980px) {
    grid-template-columns: 550px 20rem;
    grid-template-rows: 550px;
  };

  @media only screen and (max-width: 980px) {
    grid-template-columns:  450px  min(20rem, calc(100% - 450px));
    grid-template-rows:  450px;
  };

  @media only screen and ((max-width: 980px) and ((hover: none) and (pointer: coarse))) {
    $width: 80vw;
    grid-template-columns: $width;
    grid-template-rows: $width $width;
  };

  @media only screen and (max-width: 740px) {
    $width: 80vw;
    grid-template-columns: $width;
    grid-template-rows: $width $width;
  };


  @media only screen and (max-width: 480px) {
    $width: calc(100vw - var(--app-scrollbar-width) - $padding * 2);
    grid-template-columns: $width;
    grid-template-rows: auto $width auto;
  };

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

    @media only screen and (max-width: 740px) {
      grid-template-rows: 4rem 12rem 3rem;
    };

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


