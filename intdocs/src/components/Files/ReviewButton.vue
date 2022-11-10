<template>
  <q-btn v-if="pending" color="primary" @click="$emit('onClick')"
    label="На согласование" />
  <span v-else>{{ status }}</span>
</template>

<script>
import { computed } from "vue";
import { isPending } from "@/utils/status";

export default {
  props: ['status'],
  setup(props) {
    const pending = computed(() => isPending(props.status));

    return {
      pending
    }
  }
}
</script>