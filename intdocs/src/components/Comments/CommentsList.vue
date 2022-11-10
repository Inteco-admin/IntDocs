<template>
  <div class="comment-list">
    <comments-item
      v-for="comment in comments"
      :key="comment"
      :comment="comment"
    />
  </div>
</template>

<script>
import CommentsItem from "./CommentsItem.vue";

export default {
  components: { CommentsItem },
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>