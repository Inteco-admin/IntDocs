<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';
import todoService from '../../services/todoService';
import { useUserStore } from '../../store/UserStore';
import { Todo } from '../../types/Todo';
import { UserReviewListDefinitions } from './UserReviewListDefinitions';

const todos = ref<Todo[]>([])
const { user } = useUserStore()

const router = useRouter()

onMounted(() => {
  todoService.getListByUser(user.email).then((res) => todos.value = res.data.data)
})

const rowClickHandle = (evt: Event, row: any, index: number) => {
  api.get(`resource/intReview/${row.reference_name}`)
    .then(res => {
      console.log(res.data.data.doc)
      router.push({
        name: "review-show",
        params: {
          reviewname: res.data.data.doc
        }
      })
    })
}
</script>

<template>
  <q-table title="Согласования" :rows="todos"
    :columns="UserReviewListDefinitions" row-key="name"
    @row-click="rowClickHandle" />
</template>