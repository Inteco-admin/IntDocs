<script setup lang="ts">
import { Todo } from '../../types/Todo';
import { TodoDefinitions } from "./TodoDefinitions"

defineProps<{
  todos: Todo[]
}>()

</script>

<template>
  <q-table title="Согласования" :rows="todos" :columns="TodoDefinitions" row-key="name" />
</template>