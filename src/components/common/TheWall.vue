<template>
  <div class="wall">
    <TransitionGroup name="list">
      <WallPost v-for="post in props.posts" :key="post.id" :me="props.me" :post="post" class="wall__post" />
    </TransitionGroup>
  </div>
</template>

<script setup>

import WallPost from "@/components/common/TheWallPost.vue";

const props = defineProps({
  posts: Array[Post],
  me: Me
})

import Post from "@/models/post";
import Me from "@/models/me";
// import { useUserInfoStore } from "@/stores/userinfo";
// import { getPosts } from "@/services/api";
// import { onMounted, onUnmounted, ref } from "vue";
//
//
// const posts = ref([]);
// const wallElement = ref(null);
// let isNoMore = false;
// let isLoading = false;
// let response = await getPosts(32, (new Date()).toISOString());
// let result = await response.json();
// for (let json of result) {
//   posts.value.push(new Post(json));
// }
// console.log(posts.value.length);
//
//
// async function onScroll(e) {
//   if (isNoMore || isLoading) {
//     return;
//   }
//   isLoading = true;
//   let element = wallElement.value;
//   if (element.getBoundingClientRect().bottom < (window.innerHeight * 2)) {
//     let response = await getPosts(32, posts.value[posts.value.length - 1].createdAt);
//     let result = await response.json();
//     if (result.length === 0) {
//       isNoMore = true;
//     }
//     for (let json of result) {
//       posts.value.push(new Post(json));
//     }
//     console.log(posts.value.length);
//   }
//   isLoading = false;
// }

// useInfiniteScroll(containerProps.ref, async () => {
//   let response = await getPosts();
//   let result = await response.json();
//   for (let json of result) {
//     posts.value.push(new Post(json));
//   }
// })

// const userinfo = useUserInfoStore();
// const me = await userinfo.get(true);
//
// onMounted(() => {
//   window.addEventListener("scroll", onScroll);
// });
//
// onUnmounted(() => {
//   window.removeEventListener("scroll", onScroll);
// });

</script>

<style lang="scss" scoped>

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.more {
  height: 200px;
  width: 100%;
  background-color: red;
}

@media (max-width: 480px) {
  .wall {
    columns: 2;
  }
}

@media (min-width: 480px) {
  .wall {
    columns: 3;
  }
}


@media (min-width: 720px) {
  .wall {
    columns: 4;
  }
}

@media (min-width: 1080px) {
  .wall {
    columns: 6;
  }
}


.wall {
  width: 100%;
  user-select: none;
  column-gap: 0.5rem;
  padding: 0.5rem;

  &__post {
    width: 100%;
    margin-bottom: 0.5rem;
    break-inside: avoid;
    page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
  }
}
</style>