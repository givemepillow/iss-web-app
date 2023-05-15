<template>
  <div class="post-statistics">
    <div class="post-statistics__item">
      <span class="post-statistics__number">{{ props.views }}</span>
      <img :src="eyeIcon" alt="" class="post-statistics__icon">
    </div>
    <div class="post-statistics__item">
      <span class="post-statistics__number">{{ props.downloads }}</span>
      <img :src="downloadsIcon" alt="" class="post-statistics__icon">
    </div>
    <div class="post-statistics__item">
      <span class="post-statistics__number">{{ props.marks }}</span>
      <img :src="markIcon" alt="" class="post-statistics__icon">
    </div>
  </div>
</template>

<script setup>
import markIcon from "@/assets/icons/mark.svg";
import eyeIcon from "@/assets/icons/eye.svg";
import downloadsIcon from "@/assets/icons/dowloads.svg";

const props = defineProps({
  downloads: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  marks: { type: Number, default: 0 }
});

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
    opacity: 0.5;
  }

  &__number {
    font-size: 11pt;
    opacity: 0.5;
  }
}

</style>