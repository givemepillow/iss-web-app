<template>
  <div
    ref="postElement"
    class="post"
  >
    <BackgroundOverlay v-if="currentState !== states.default ">
      <TheLoading v-if="currentState === states.pending" />
      <ModalPopup
        v-else-if="currentState === states.confirmation"
        text="Вы действительно хотите удалить публикацию!?"
        @confirm="onConfirm"
        @reject="onReject"
      />
    </BackgroundOverlay>
    <div class="post__picture">
      <div class="post__bar post__bar--vertical post__card">
        <UserLabel :user="post.user" />
        <OptionsMenu v-if="post.user.id !== 0" :options="options" @select="onSelect" />
      </div>
      <div class="post__carousel">
        <PostCarousel
          :post="post"
        />
      </div>
    </div>
    <div class="post__info">
      <div class="post__bar post__bar--horizontal post__card">
        <UserLabel :user="post.user" />
        <OptionsMenu v-if="post.user.id !== 0" :options="options" @select="onSelect" />
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
      <div class="post__card" style="overflow: clip">
        <BaseButton
          :class="{'post__button--on': isDescription}"
          class="post__button post__button--description"
          text="Описание"
          @click="isDescription = !isDescription"
        />
        <BaseButton
          :class="{'post__button--on': !isDescription}"
          class="post__button post__button--discussion"
          text="Обсуждение"
          @click="isDescription = !isDescription"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import UserLabel from "@/components/common/UserLabel.vue";
import PostCarousel from "@/components/observer/PostObserverCarousel.vue";
import PostDescription from "@/components/observer/PostDescription.vue";
import PostTitle from "@/components/observer/PostObserverTitle.vue";
import PostStatistics from "@/components/observer/PostObserverStatistics.vue";
import BaseButton from "@/components/buttons/AppButton.vue";
import { deletePost, getPost } from "@/services/api";
import Post from "@/models/post";
import OptionsMenu from "@/components/common/OptionsMenu.vue";
import trashIcon from "@/assets/icons/trash.svg";
import { useRouter } from "vue-router";
import BackgroundOverlay from "@/components/common/BackgroundOverlay.vue";
import ModalPopup from "@/components/common/ModalPopup.vue";
import TheLoading from "@/components/common/TheLoading.vue";

const postElement = ref(null);
const isDescription = ref(true);
const post = ref(null);

const states = Object.freeze({
  confirmation: 0,
  pending: 1,
  default: 2
});
const currentState = ref(states.default);


const props = defineProps({
  post_id: {
    type: String,
    request: true
  }
});


const showNotification = inject("showNotification");
const router = useRouter();

const options = [
  { key: "delete", text: "Удалить", icon: trashIcon }
];


function onReject() {
  currentState.value = states.default;
}

async function onConfirm() {
  currentState.value = states.pending;
  let response = await deletePost(props.post_id);
  if (response.ok) {
    router.go(-1);
    showNotification((await response.json()).detail);
  } else {
    showNotification((await response.json()).detail);
  }
}


async function onSelect(key) {
  if (key === "delete") {
    currentState.value = states.confirmation;
  }
}

let response = await getPost(props.post_id);
if (response.ok) {
  post.value = new Post( await response.json());
  console.log(post.value)
}

const postRatio = post.value.aspectRatio;
const postWidth = Math.min(
  window.innerHeight * postRatio * 0.8,
  window.innerWidth / 2.75
);
const postHeight = postWidth / postRatio;

scroll(0, 0);


</script>

<style lang="scss" scoped>
$gap: 0.5rem;
$padding: 0.5rem;
.post {
  display: grid;
  padding: $padding;
  grid-gap: $gap;
  justify-content: center;

  &__card {
    background-color: var(--app-default-color);
    border-radius: var(--app-border-radius);
    box-shadow: var(--app-default-shadow);
    border: var(--app-default-border);
  }

  @media only screen and (min-width: 960px) {
    grid-template-columns: calc(1px * v-bind(postWidth)) min(20rem, 40%);
    grid-template-rows: max(calc(1px * v-bind(postHeight)),  calc(1px * v-bind(postWidth)));
  };

  @media only screen and (max-width: 960px) {
    grid-template-columns: calc(1px * v-bind(postWidth)) min(20rem, 40%);
    grid-template-rows: max(calc(1px * v-bind(postHeight)),  calc(1px * v-bind(postWidth)));
  };

  @media only screen and (max-width: 640px) {
    grid-template-columns: calc(85% - 2 * $padding);
    grid-template-rows: none;
  };

  @media only screen and (max-width: 480px) {
    grid-template-columns: calc(100% - 2 * $padding);
    grid-template-rows: none;
  };


  &__picture {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: $gap;
  }

  &__carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--app-border-radius);
    box-shadow: var(--app-default-shadow);
    background-color: var(--app-default-color);
    overflow: clip;
  }

  &__info {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto auto 7fr 2.75rem;

    @media only screen and (max-width: 640px) {
      grid-template-rows: auto auto 2.75rem 4rem;
    };

    grid-gap: $gap;
  }

  &__statistics {
    padding: 0.75rem;
    width: 100%;

  }

  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0 0.5rem 0.5em;


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
    font-size: 14pt;
    transition: all ease-in-out 250ms;


    &--description {
      left: -100%;
    }

    &--discussion {
      left: 100%;
      bottom: 100%;
    }

    &--on {
      left: 0;
    }
  }
}
</style>