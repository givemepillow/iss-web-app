<template>
  <TheWall :posts="posts"/>
</template>

<script setup>
import TheWall from "@/components/common/TheWall.vue";
import { ref } from "vue";
import { getPosts } from "@/services/api";
import Post from "@/models/post";

const posts = ref([]);


let response = await getPosts();
let result = await response.json();
for (let json of result) {
  posts.value.push(new Post(json));
}

</script>

<style scoped>

</style>