<template>
  <TheWall ref="wallElement" :me="me" :posts="posts" />
</template>

<script setup>
import TheWall from "@/components/common/TheWall.vue";
import { useUserInfoStore } from "@/stores/userinfo";
import { getPosts } from "@/services/api";
import { onMounted, onUnmounted, ref } from "vue";
import Post from "@/models/post";


const posts = ref([]);
const wallElement = ref(null);
let isNoMore = false;
let isLoading = false;
let response = await getPosts(32, (new Date()).toISOString());
let result = await response.json();
for (let json of result) {
  posts.value.push(new Post(json));
}


async function onScroll() {
  if (isNoMore || isLoading) {
    return;
  }
  isLoading = true;
  let element = wallElement.value;
  if (element.getBoundingClientRect().bottom < (window.innerHeight * 2)) {
    let response = await getPosts(32, posts.value[posts.value.length - 1].createdAt);
    let result = await response.json();
    if (result.length === 0) {
      isNoMore = true;
    }
    for (let json of result) {
      posts.value.push(new Post(json));
    }
    console.log(posts.value.length);
  }
  isLoading = false;
}


const userinfo = useUserInfoStore();
const me = await userinfo.get(true);

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

</script>

<style scoped>

</style>