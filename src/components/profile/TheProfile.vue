<template>
  <div class="the-profile">
    <div class="the-profile__header">
      <div class="the-profile__avatar app-card">
        <img :src="resolveAvatarSrc(profile?.id ?? 0, profile?.avatarId ?? 0)" alt="" class="the-profile__image">
      </div>
      <div class="the-profile__info ">
        <h1 class="the-profile__name ">{{ profile.name }}</h1>
        <h2 class="the-profile__username">@{{ profile.username }}</h2>
        <p class="the-profile__bio">{{ profile.bio ?? "" }}</p>
      </div>
    </div>
    <div class="the-profile__tabs">
      <div :class="{'active-tab': currentTab !== 'bookmarks' }" class="the-profile__tab app-card">
        <TextIconButton :src="wallIcon" text="Публикации" @click="onClickPostsTab" />
      </div>
      <div :class="{'active-tab':  currentTab === 'bookmarks'}" class="the-profile__tab app-card">
        <TextIconButton :src="marksIcon" text="Закладки" @click="onClickMarksTab" />
      </div>
    </div>
    <TheWall v-if="currentTab === 'bookmarks'" :posts="bookmarks" />
    <TheWall v-else :posts="posts" />
  </div>
</template>

<script setup>

import { getBookmarks, getPostsByUserId, getUser, resolveAvatarSrc } from "@/services/api";
import { ref } from "vue";
import Profile from "@/models/profile";
import TheWall from "@/components/common/TheWall.vue";
import Post from "@/models/post";
import TextIconButton from "@/components/buttons/IconTextButton.vue";
import marksIcon from "@/assets/icons/marks.svg";
import wallIcon from "@/assets/icons/wall.svg";
import { useRouter } from "vue-router";

const props = defineProps({
  username: {
    type: String,
    request: true
  },
  tab: {
    type: String
  }
});

const router = useRouter();
const currentTab = ref("");
currentTab.value = props.tab;

function onClickPostsTab() {
  currentTab.value = "posts";
  router.replace({ path: "/" + props.username + "/" });
}

function onClickMarksTab() {

  currentTab.value = "bookmarks";
  router.replace({ path: "/" + props.username + "/bookmarks" });
}

const profile = ref(null);
let userResponse = await getUser(props.username);
if (userResponse.ok) {
  profile.value = new Profile(await userResponse.json());
}


const posts = ref([]);
let postsResponse = await getPostsByUserId(profile.value.id, 32, (new Date()).toISOString());
for (let json of await postsResponse.json()) {
  posts.value.push(new Post(json));
}

const bookmarks = ref([]);
let bookmarksResponse = await getBookmarks(props.username);
for (let json of await bookmarksResponse.json()) {
  bookmarks.value.push(new Post(json));
}

scroll(0, 0);
</script>

<style lang="scss" scoped>
.the-profile {
  width: 100%;


  &__header {
    width: 100%;
    margin-top: 1.5rem;
    display: grid;
    justify-content: center;
    justify-items: center;
    grid-auto-columns: 100%;
    text-align: center;
    grid-gap: .5rem;
  }

  &__tabs {
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  &__tab {
    display: flex;
    justify-content: center;
    justify-items: center;
    padding: 0.25rem;
    transition: all ease-in-out 0.25s;

    &:hover {
      background-color: #02c39a;
    }
  }


  &__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 100%;
    //overflow: clip;
    //border: whitesmoke solid 3px;
    box-shadow: var(--app-default-color);
  }

  &__avatar {
    user-select: none;
    border-radius: 100%;
    overflow: hidden;
    height: 12rem;
    width: 12rem;
  }

  &__username {
    font-weight: lighter;
  }

  &__name {
    font-size: 21pt;
  }

  &__info {
    padding: 0.5rem;
  }
}

.active-tab {
  background-color: #168aad;
}
</style>