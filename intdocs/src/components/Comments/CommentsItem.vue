<template>
  <div class="max-w-lg mx-auto my-12 shadow-md">
    <div class="mb-2">
      <label for="comment" class="text-lg text-gray-600">
        {{ comment.owner }}
      </label>
      <div
        class="w-full h-20 p-2 border rounded  focus:outline-none focus:ring-gray-300 focus:ring-1"
        name="comment"
      >
        {{ comment.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>