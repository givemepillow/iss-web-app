<template>
  <div class="post-statistics">
    <div class="post-statistics__item">
      <span class="post-statistics__number">{{ props.post.views }}</span>
      <img :src="eyeIcon" alt="" class="post-statistics__icon">
    </div>
    <div class="post-statistics__item">
      <span class="post-statistics__number">{{ props.post.downloads }}</span>
      <img :src="downloadsIcon" alt="" class="post-statistics__icon">
    </div>
    <div class="post-statistics__item" @click="onClickMark" @mouseleave="isHover = false" @mouseover="isHover = true">
      <span class="post-statistics__number">{{ bookmarks.length }}</span>
      <img v-if="!isHover && !isMarked" :src="markIcon" alt="" class="post-statistics__icon">
      <img v-else :src="markedIcon" alt="" class="post-statistics__icon">
    </div>
  </div>
</template>

<script setup>
import markIcon from "@/assets/icons/mark.svg";
import markedIcon from "@/assets/icons/marked.svg";
import eyeIcon from "@/assets/icons/eye.svg";
import downloadsIcon from "@/assets/icons/dowloads.svg";
import { inject, onMounted, ref } from "vue";
import Post from "@/models/post";
import { removeBookmark, saveBookmark } from "@/services/api";
import Me from "@/models/me";

const props = defineProps({
  post: Post,
  me: Me
});

const bookmarks = ref(props.post.bookmarks);
const showNotification = inject("showNotification");
const isMarked = ref(false);
const isHover = ref(false);

onMounted(() => {
  isMarked.value = bookmarks.value.includes(props.me.id);
});


async function onClickMark() {
  try {
    if (isMarked.value) {
      let response = await removeBookmark(props.post.id);
      if (response.ok) {
        let index = bookmarks.value.indexOf(props.me.id);
        if (index !== -1) {
          bookmarks.value.splice(index, 1);
        }
        showNotification((await response.json()).detail);
      }
    } else {
      let response = await saveBookmark(props.post.id);
      if (response.ok) {
        bookmarks.value.push(props.me.id);
        showNotification((await response.json()).detail);
      } else {
        showNotification((await response.json()).detail);
      }
    }
  } catch (e) {
    showNotification(e);
  } finally {
    isMarked.value = bookmarks.value.includes(props.me.id);
  }
}

</script>

<style lang="scss" scoped>

.post-statistics {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &__item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  &__icon {
    user-select: none;
    -webkit-user-drag: none;
    height: 1.3em;
    width: 1.3em;
    cursor: pointer;
    opacity: 0.75;
  }

  &__number {
    font-size: 11pt;
    opacity: 0.75;
  }
}

</style>