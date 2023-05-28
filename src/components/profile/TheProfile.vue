<template>
  <div class="the-profile">
    <div class="the-profile__header">
      <div class="the-profile__avatar">
        <img :src="avatar" alt="" class="the-profile__image">
      </div>
      <div class="the-profile__info">
        <h1 class="the-profile__name">{{ profile.name }}</h1>
        <h2 class="the-profile__username">@{{ profile.username }}</h2>
        <p class="the-profile__bio">{{ profile.bio }}</p>
      </div>
    </div>
    <div class="the-profile__tabs">
      <div :class="{'active-tab': currentTab !== 'bookmarks' }" class="the-profile__tab the-profile__card">
        <TextIconButton :src="wallIcon" text="Публикации" @click="onClickPostsTab" />
      </div>
      <div :class="{'active-tab':  currentTab === 'bookmarks'}" class="the-profile__tab the-profile__card">
        <TextIconButton :src="marksIcon" text="Закладки" @click="onClickMarksTab" />
      </div>
    </div>
    <TheWall v-if="currentTab === 'bookmarks'" :posts="bookmarks" />
    <TheWall v-else :posts="posts" />
  </div>
</template>

<script setup>
import avatar from "@/assets/avatars/batman.svg";

import { getBookmarks, getPostsByUserId, getUser } from "@/services/api";
import { ref } from "vue";
import Profile from "@/models/profile";
import TheWall from "@/components/common/TheWall.vue";
import Post from "@/models/post";
import TextIconButton from "@/components/buttons/TextIconButton.vue";
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
let postsResponse = await getPostsByUserId(profile.value.id);
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


  &__card {
    background-color: var(--app-default-color);
    border-radius: var(--app-border-radius);
    box-shadow: var(--app-default-shadow);
    border: var(--app-default-border);
  }

  &__tabs {
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
    border: whitesmoke solid 3px;
    box-shadow: var(--app-default-color);
  }

  &__avatar {
    border-radius: 100%;
    overflow: hidden;
    height: 12rem;
    width: 12rem;
  }


  &__info {
    padding: 0.5rem;
  }
}

.active-tab {
  background-color: #168aad;
}
</style>