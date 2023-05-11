<template>
  <div class="create-post-container">
    <div class="cropper-container">
      <CropperCarousel />
    </div>
    <div class="info-container">
      <div class="top">
        <div class="user-info-container">
          <UserLabel />
        </div>
        <div class="title-container">
          <TitleInput />
        </div>
      </div>
      <div class="bottom">
        <div class="description-container">
          <DescriptionInput />
        </div>
        <div class="create-button-container">
          <TextButton :alpha="0.5" text="Опубликовать" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CropperCarousel from "@/components/create-post/cropper/CropperCarousel.vue";
import DescriptionInput from "@/components/create-post/CreatePostDescriprion.vue";
import TextButton from "@/components/buttons/TextButton.vue";
import UserLabel from "@/components/create-post/CreatePostUser.vue";
import TitleInput from "@/components/create-post/CreatePostTitle.vue";
</script>

<style lang="scss" scoped>

@media (max-width: 680px) {
  .create-post-container {
    $cropper-size: calc(var(--background-width) - 3vw);
    width: $cropper-size;
    grid-template-columns: $cropper-size;
    grid-template-rows: $cropper-size auto;
  }
  .info-container {
    height: 60%;
  }
}


@media (min-width: 680px) {
  .create-post-container {
    $cropper-size: 80vh;
    width: $cropper-size;
    grid-template-columns: $cropper-size;
    grid-template-rows: $cropper-size auto;
  }
  .info-container {
    height: 75%;
  }
}

@media (min-width: 960px) {
  .create-post-container {
    $cropper-size: 75vh;
    width: calc($cropper-size * 1.7);
    grid-template-columns: $cropper-size $cropper-size * 0.7;
    grid-template-rows: $cropper-size;
  }
  .info-container {
    height: 100%;
  }
}

.create-post-container {
  margin: 1em auto;
  display: grid;
  grid-gap: 0.5em;


  .cropper-container {
    display: block;
    height: 100%;
    width: 100%;
    background-color: #242424;
  }

  .info-container {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 4fr;
    grid-gap: 0.5em;

    .top {
      display: grid;
      background-color: #242424;
      grid-template-columns: 1fr;
      padding: 1em;
      grid-gap: 0.5em;

      .user-info-container {
        background-color: #242424;
      }

      .title-container {
        border-top: #444444 solid 1px;
        background-color: #242424;
      }
    }

    .bottom {
      display: grid;
      background-color: #242424;
      grid-template-columns: 1fr;
      padding: 0.5em 0.5em 0.5em 1.5em;

      .description-container {
        background-color: #242424;
      }

      .create-button-container {
        align-self: end;
        justify-self: center;
        background-color: #242424;
      }

    }


  }
}


</style>


