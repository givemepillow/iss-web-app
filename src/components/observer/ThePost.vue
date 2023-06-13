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
      <div class="post__bar post__bar--vertical app-card">
        <UserLabel :user="post.user" />
        <OptionsMenu v-if="post.user.id === me.id" :options="options" @select="onSelect" />
      </div>
      <div class="post__carousel">
        <PostCarousel
          :post="post"
        />
      </div>
    </div>
    <div class="post__info">
      <div class="post__bar post__bar--horizontal  app-card">
        <UserLabel :user="post.user" />
        <OptionsMenu v-if="post.user.id === me.id" :options="options" @select="onSelect" />
      </div>
      <div class="post__statistics  app-card ">
        <PostStatistics :me="me" :post="post" />
      </div>
      <div class="post__article  app-card ">
        <div class="post__title">
          <PostTitle :title="post.title" />
        </div>
        <div class="post__datetime">{{ fmtDate(post.createdAt) }}</div>
        <Transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
          mode="out-in"
        >

          <Suspense>
            <div v-if="isDescription && post.description.length > 0" class="post__description">
              <ThePostDescription :description="post.description" />
            </div>
            <div v-else-if="isDescription" class="post__placeholder">
              <div class="placeholder-wrapper">
                <img :src="placeholders[Math.floor(Math.random() * placeholders.length)]" alt="" />
              </div>
            </div>
            <div v-else class="post__discussion">
              <ThePostDiscussion :post_id="post_id" />
            </div>
            <template #fallback>
              <TheLoading />
            </template>
          </Suspense>
        </Transition>
      </div>
      <div class="" style="overflow: clip">
        <div class="post__button app-card" @click="onClick">
          <TextIconButton v-if="isDescription" :src="arrowRightIcon" text="К обсуждению" />
          <IconTextButton v-else :src="arrowLeftIcon" text="К описанию" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import UserLabel from "@/components/common/UserLabel.vue";
import PostCarousel from "@/components/observer/ThePostCarousel.vue";
import PostTitle from "@/components/observer/ThePostTitle.vue";
import PostStatistics from "@/components/common/PostStatistics.vue";
import { deletePost, getPost } from "@/services/api";
import Post from "@/models/post";
import OptionsMenu from "@/components/common/OptionsMenu.vue";
import trashIcon from "@/assets/icons/trash.svg";
import { useRouter } from "vue-router";
import BackgroundOverlay from "@/components/common/BackgroundOverlay.vue";
import ModalPopup from "@/components/common/ModalPopup.vue";
import TheLoading from "@/components/common/TheLoading.vue";
import { useUserInfoStore } from "@/stores/userinfo";
import ThePostDiscussion from "@/components/observer/ThePostDiscussion.vue";
import ThePostDescription from "@/components/observer/ThePostDescription.vue";
import p1 from "@/assets/placeholders/castle.svg";
import p2 from "@/assets/placeholders/farm.svg";
import p3 from "@/assets/placeholders/hay.svg";
import p4 from "@/assets/placeholders/dunes.svg";
import p5 from "@/assets/placeholders/farm.svg";
import p6 from "@/assets/placeholders/desert.svg";
import p7 from "@/assets/placeholders/island.svg";
import p8 from "@/assets/placeholders/mountains.svg";
import p9 from "@/assets/placeholders/park.svg";
import p10 from "@/assets/placeholders/spring.svg";
import p12 from "@/assets/placeholders/sunset.svg";
import p13 from "@/assets/placeholders/waterfall.svg";
import p14 from "@/assets/placeholders/valley.svg";
import p15 from "@/assets/placeholders/winter.svg";
import p16 from "@/assets/placeholders/tree.svg";
import p17 from "@/assets/placeholders/summer.svg";
import p18 from "@/assets/placeholders/forest.svg";
import p19 from "@/assets/placeholders/grove.svg";
import TextIconButton from "@/components/buttons/TextIconButton.vue";
import arrowRightIcon from "@/assets/icons/arrowRight.svg";
import arrowLeftIcon from "@/assets/icons/arrowLeft.svg";
import IconTextButton from "@/components/buttons/IconTextButton.vue";
import { fmtDate } from "@/services/datetime";

const placeholders = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p12, p13, p14, p15, p16, p17, p18, p19];

const postElement = ref(null);
const isDescription = ref(true);
const post = ref(null);

const states = Object.freeze({
  confirmation: 0,
  pending: 1,
  default: 2
});
const currentState = ref(states.default);
const userinfo = useUserInfoStore();
const me = await userinfo.get(false);


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

function onClick() {
  isDescription.value = !isDescription.value;
}


async function onSelect(key) {
  if (key === "delete") {
    currentState.value = states.confirmation;
  }
}

let response = await getPost(props.post_id);
if (response.ok) {
  post.value = new Post(await response.json());
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

  @media only screen and (min-width: 960px) {
    grid-template-columns: calc(1px * v-bind(postWidth)) min(25rem, 40%);
    grid-template-rows: min(max(calc(1px * v-bind(postHeight)), calc(1px * v-bind(postWidth))));
  };

  @media only screen and (max-width: 960px) {
    grid-template-columns: calc(1px * v-bind(postWidth)) min(25rem, 40%);
    grid-template-rows: max(calc(1px * v-bind(postHeight)), calc(1px * v-bind(postWidth)));
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
    user-select: none;
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
    grid-template-rows: auto auto minmax(0, 7fr) 2.75rem;

    @media only screen and (max-width: 640px) {
      grid-template-rows: auto minmax(5rem, 20rem) 2.75rem;
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
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto auto minmax(0, 1fr);
    padding: 0.5rem 0.75rem;
    overflow: clip;
  }

  &__datetime {
    font-size: 11pt;
    opacity: 0.75;
    border-bottom: grey solid 1px;
    margin-bottom: 0.5rem;
  }


  &__description {
    opacity: 0.85;
    word-wrap: normal;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0.5rem;
      border-radius: 5px;
      overflow: clip;
      height: 0.25em;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 5px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);;
    }

  }

  &__placeholder {
    display: grid;
    align-items: center;
    justify-content: center;
    user-select: none;
    height: 100%;
    width: 100%;


    .placeholder-wrapper {
      height: 75%;
      width: 100%;
      opacity: 0.5;

      img {
        -webkit-user-drag: none;
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
  }

  &__button {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14pt;
    transition: all ease-in-out 250ms;
    background: var(--app-active-color);
    color: white;
  }
}
</style>