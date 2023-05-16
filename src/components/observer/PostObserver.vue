<template>
  <Transition>
    <div
      v-if="isPostLoaded"
      ref="postElement"
      class="post"
    >
      <div class="post__picture">
        <div class="post__user-label post__user-label--vertical  post__card">
          <UserLabel :user="post.user" />
        </div>
        <div class="post__carousel">
          <PostCarousel
            :pictures="post.pictures"
            @create="onCreate"
          />
        </div>
      </div>
      <div class="post__info">
        <div class="post__user-label post__user-label--horizontal  post__card">
          <UserLabel :user="post.user" />
        </div>
        <div class="post__statistics  post__card">
          <PostStatistics />
        </div>
        <div class="post__article  post__card">
          <div class="post__title">
            <PostTitle :title="post.title" />
          </div>
          <div class="post__description">
            <PostDescription :description="post.description" />
          </div>
        </div>
        <div class="post__card" @click="isDescription = !isDescription">
          <div
            :class="{'post__button--on': isDescription}"
            class="post__button post__button--description"
          >
            Описание
          </div>
          <div
            :class="{'post__button--on': !isDescription}"
            class="post__button post__button--discussion"
          >
            Обсуждение
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>

import { onBeforeMount, onMounted, ref } from "vue";
import UserLabel from "@/components/common/UserLabel.vue";
import PostCarousel from "@/components/observer/PostObserverCarousel.vue";
import PostDescription from "@/components/observer/PostDescription.vue";
import PostTitle from "@/components/observer/PostObserverTitle.vue";
import PostStatistics from "@/components/observer/PostObserverStatistics.vue";
import { examples } from "@/models/examples";

const postElement = ref(null);
const isPostLoaded = ref(false);
const postWidth = ref("");
const postRatio = ref(1);
const isDescription = ref(true);
const post = ref(null);

const props = defineProps({
  post_id: {
    type: Number,
    request: true
  }
});


function onCreate(width, height) {
  let w = ((window.innerHeight / height) * width);
  w = w >= window.innerWidth * 0.55 ? window.innerWidth * 0.55 : w * 0.9;
  postWidth.value = (w > window.innerHeight * 0.8 ? window.innerHeight * 0.8 : w) + "px";
  postRatio.value = height / width;
}

onBeforeMount(() => {
  post.value = examples[props.post_id];
});


onMounted(() => {
  isPostLoaded.value = true;
});

</script>

<style lang="scss" scoped>


.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


$gap: 0.5rem;
$padding: 0.5rem;
.post {
  display: grid;
  padding: $padding;
  grid-gap: $gap;
  justify-content: center;

  &__card {
    background-color: var(--default-color);
    border-radius: var(--border-radius);
    box-shadow: var(--default-box-shdow);
    overflow: clip;
  }

  @media only screen and (min-width: 960px) {
    grid-template-columns: calc(v-bind(postWidth) - 2 * $padding) min(45%, 20rem);
    grid-template-rows: max(calc((v-bind(postWidth) - 2 * $padding) * v-bind(postRatio)), 75vh);
  };

  @media only screen and (max-width: 960px) {
    grid-template-columns: calc(v-bind(postWidth) - 2 * $padding) min(45%, 20rem);
    grid-template-rows: max(calc((v-bind(postWidth) - 2 * $padding) * v-bind(postRatio)), 75vh);
  };

  @media only screen and ((max-width: 640px) or (max-device-width: 960px)) {
    grid-template-columns: calc(85% - 2 * $padding);
    grid-template-rows: none;
  };


  @media only screen and ((max-width: 480px) or (max-device-width: 640px)) {
    grid-template-columns: calc(100% - 2 * $padding);
    grid-template-rows: none;
  };


  &__picture {
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-gap: $gap;
  }

  &__carousel {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius);
    box-shadow: var(--default-box-shdow);
    background-color: var(--default-color);
    overflow: clip;
  }

  &__info {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto auto 7fr 3rem;

    @media only screen and (max-width: 640px) {
      grid-template-rows: auto auto 3rem;
    };

    grid-gap: $gap;
  }

  &__statistics {
    padding: 0.75rem;
    width: 100%;
  }

  &__user-label {
    padding: 0.75rem;

    &--vertical {
      @media only screen and (min-width: 640px) {
        display: none;
      };
    }

    &--horizontal {
      @media only screen and (max-width: 640px) {
        display: none;
      };
    }
  }

  &__article {
    padding: 0.75rem;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr;
  }

  &__button {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: left ease-in-out 250ms;
    user-select: none;
    font-weight: bold;
    font-size: x-large;

    &--description {
      left: -100%;
      background-color: orange;
    }

    &--discussion {
      left: 100%;
      bottom: 100%;
      background-color: dodgerblue;
    }

    &--on {
      left: 0;
    }
  }
}

</style>