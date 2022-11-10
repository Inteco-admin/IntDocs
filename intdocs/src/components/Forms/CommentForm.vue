<template>
  <!-- comment form -->
  <div class="max-w-lg mx-auto my-12 shadow-md">
    <form action class="w-full p-4" @submit.prevent="AddComment">
      <div class="mb-2">
        <label for="comment" class="text-lg text-gray-600">Add a comment</label>
        <textarea
          v-model="content"
          class="w-full h-20 p-2 border rounded  focus:outline-none focus:ring-gray-300 focus:ring-1"
          name="comment"
          placeholder
        ></textarea>
      </div>
      <button
        class="w-full py-2 text-white rounded-md bg-primary hover:opacity-80"
      >
        Add comment
      </button>
    </form>
  </div>
</template>

<script>
export default {
  emits: {
    "add-comment": null,
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    AddComment() {
      if (this.content != ""){
        this.$emit("add-comment", this.content);
        this.content = "";
      }
    },
  },
};
</script>

<style>
</style>