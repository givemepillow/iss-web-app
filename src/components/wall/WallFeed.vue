<template>
  <div ref="container" class="wall-container">
    <WallPost class="post" src="https://i.pinimg.com/originals/9f/fa/d7/9ffad7f894af67cba725584380173586.gif" />
    <WallPost class="post" src="https://i.pinimg.com/564x/dd/ea/ca/ddeaca917772ad3bcf636ab03f79cd2c.jpg" />
    <WallPost class="post" src="https://i.pinimg.com/originals/95/75/92/957592dd6b8a80094888a34e61dd0d40.gif" />
    <WallPost class="post" src="https://i.pinimg.com/originals/9f/fa/d7/9ffad7f894af67cba725584380173586.gif" />
    <WallPost class="post" src="https://i.pinimg.com/originals/13/7e/45/137e45c33cb5939abcd3ff4d8f858c63.gif" />
    <WallPost class="post" src="https://i.pinimg.com/originals/eb/50/87/eb50875a68b04b0480fa929af2c7547c.gif" />
    <WallPost class="post" src="https://i.pinimg.com/564x/d7/9a/d5/d79ad5483a202280cc0673762b08a730.jpg" />
    <WallPost class="post" src="https://i.pinimg.com/564x/e3/73/c4/e373c4fca3a41f839f8812231c9e4f53.jpg" />
    <WallPost class="post" src="https://i.pinimg.com/564x/88/27/fd/8827fd8266f7c902d3a6162cc84a10fc.jpg" />
    <WallPost class="post" src="https://i.pinimg.com/564x/fa/87/b9/fa87b9d73294a0ce12a0677a1f616978.jpg" />
    <WallPost class="post" src="https://i.pinimg.com/originals/b3/9c/0c/b39c0c466fa2e880bcf8b904305041aa.gif" />
    <WallPost class="post" src="https://i.pinimg.com/originals/05/6d/8a/056d8a102432ffe13476a0b783c5116d.gif" />
    <WallPost class="post" src="https://i.pinimg.com/564x/e1/74/6d/e1746d961303421f06276cc0da74cfe0.jpg" />
    <WallPost class="post" src="https://i.pinimg.com/564x/2f/36/91/2f36910096b7a010c9be0f8a5e953378.jpg" />
    <WallPost class="post" src="https://i.pinimg.com/564x/93/e9/58/93e9588ba8d623b5dee30bb56741f090.jpg" />
    <WallPost class="post" src="https://i.pinimg.com/564x/ed/bc/f3/edbcf3ff7c40acc237754e4ac9db0106.jpg" />
    <WallPost class="post" src="https://i.pinimg.com/564x/fd/8f/65/fd8f659018d0cc02607f37d9ac47b5a1.jpg" />
    <WallPost class="post" src="https://i.pinimg.com/originals/34/ce/0b/34ce0b45a78098fe0fdb3329ef5e27b8.gif" />
    <WallPost class="post" src="https://i.pinimg.com/564x/08/62/dc/0862dc7206d76cf46874fb3ecaa07429.jpg" />
  </div>
</template>

<script setup>

import WallPost from "@/components/wall/WallPost.vue";
import { ref } from "vue";

const container = ref(null);

</script>

<style lang="scss" scoped>

@media (max-width: 650px) {
  .wall-container {
    columns: 2;
  }
}

@media (min-width: 650px) {
  .wall-container {
    columns: 5;
  }
}

.wall-container {
  width: 100%;
  column-gap: 0.5em;
  box-sizing: border-box;
  padding: 0.5em;
  user-select: none;

  .post {
    margin-bottom: 0.5em;
  }

}
</style>