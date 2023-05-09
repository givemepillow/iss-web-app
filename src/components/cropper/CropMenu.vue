<template>
  <div class="container">
    <div class="line" @click="onClick(0)">
      <IconButton :padding="3" :alpha="0" :size="30" :src="originalIcon" />
      Original
    </div>
    <div class="line" @click="onClick(1)">
      <IconButton :padding="4" :alpha="0" :size="30" :src="squareIcon" />
      1:1
    </div>
    <div class="line" @click="onClick(4/5)">
      <IconButton :padding="5" :alpha="0" :size="30" :src="rectangleIcon" style="transform: rotate(90deg)" />
      4:5
    </div>
    <div class="line" @click="onClick(16/9)">
      <IconButton :padding="5"  :alpha="0" :size="30" :src="rectangleIcon" />
      16:9
    </div>
  </div>

</template>

<script setup>
import originalIcon from "@/assets/icons/original.svg";
import squareIcon from "@/assets/icons/square.svg";
import rectangleIcon from "@/assets/icons/rectangel.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const emit = defineEmits(["ratioChange"]);

function onClick(v) {
  emit("ratioChange", v);
}

</script>

<style lang="scss" scoped>
.container {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.line {
  display: flex;
  align-items: center;
  padding: 5px;
}

.line:hover {
  opacity: 0.6;
  cursor: default;
}
</style>