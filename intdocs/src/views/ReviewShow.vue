<template>
  <div class="layout">
    <router-link :to="{ name: 'review-index' }"
      class="flex items-center mt-10 font-semibold hover:underline">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15 19l-7-7 7-7" />
      </svg>
      <span class>All Reviews</span>
    </router-link>

    <q-card v-if="review" class="mt-6 my-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <q-card-section horizontal class="flex justify-between">
          <q-card-section v-if="review">
            <div class="text-gray-500 ">Создано: {{ review.owner }}
              {{ convertDate(review.creation) }}</div>
          </q-card-section>
          <q-card-section class="flex items-center justify-end space-x-4">
            <div
              class="px-4 py-2 text-sm font-bold text-center uppercase rounded-full h-9 w-44"
              :class="GetBGClass(doc.workflow_state)">
              {{ doc.workflow_state }}
            </div>

          </q-card-section>
        </q-card-section>

        <div v-if="review" class="text-h5 q-mt-sm q-mb-xs">
          {{ review.displayname }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="flex items-center justify-center text-center"
        v-if="linkedFile">
        <q-btn flat icon="attachment" @click="openFile">
          <span class="px-2">{{ linkedFile.displayname }}</span>
        </q-btn>
      </q-card-section>
      <q-separator v-if="linkedFile" />

      <q-card-section>
        <todo-table :todos="todos" />
      </q-card-section>

      <q-card-section v-if="todoForEdit" class="flex items-center justify-end">
        <q-btn color="primary" label="Start review" @click="sendVerdict=true" />
      </q-card-section>

      <q-card-actions
        v-if="actions.length > 0 && doc.workflow_state === 'Final Review'"
        horizontal class="flex justify-between">
        <q-card-section class="flex space-x-5">
          <q-btn v-for="action in actions" :key="action" flat
            @click.prevent="actionClick(action.action)">
            {{ action.action }}
          </q-btn>
        </q-card-section>
      </q-card-actions>

    </q-card>
    <send-verdict v-model="sendVerdict" :todo="todoForEdit"
      @todo-closed="updateTodoList" />
  </div>
</template>


<script lang="ts">
import { computed, defineComponent, onMounted, ref, watchEffect } from 'vue';
import { useReviews } from '../composables/useReviews';
import { GetBGClass } from "../services/isssuecoloring.js";
import { useRoute, useRouter } from 'vue-router';
import moment from "moment";
import api from '../services/api.js';
import "moment/dist/locale/ru";
import { useTodos } from '../composables/useTodos';
import TodoTable from '../components/Review/TodoTable.vue';
import SendVerdict from '../components/Review/SendVerdict.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/UserStore';

export default defineComponent({
  components: {
    TodoTable,
    SendVerdict
  },
  setup() {
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)
    const sendVerdict = ref(false)
    const route = useRoute();
    const router = useRouter();
    const linkedFile = ref(null);
    const { fetchReview, review, loading, doc, fetchDoc } = useReviews();
    const reviewname = computed(() => route.params.reviewname);
    const { todos, fetchReferenceTodo } = useTodos();
    const actions = ref([])

    const convertDate = date => {
      return moment(date).fromNow()
    }

    onMounted(async () => {
      await fetchDoc(reviewname.value)
      await fetchReview(doc.value.name);

    });

    const openFile = () => {
      router.push({
        name: "viewer",
        params: {
          doc: linkedFile.value?.name,
          file: linkedFile.value?.filepdf,
        },
      });
    };

    watchEffect(() => {
      if (doc.value?.name) {
        api
          .get(`resource/intDoc/${doc.value.name}`)
          .then((res) => {
            linkedFile.value = res.data.data
          });

        api
          .get(
            `method/frappe.model.workflow.get_transitions?doc={"name":"${doc.value.name}","doctype":"intDoc"}`
          )
          .then((res) => (actions.value = res.data.message))
          .catch(() => (actions.value = []));
      }
      if (review.value?.name) {
        fetchReferenceTodo(review.value.name)
      }
    });

    const todoForEdit = computed(() => {
      if (todos.value.length > 0)
        return todos.value.filter(todo => todo.allocated_to === user.value.email && todo.status === "Open")[0]
    })

    const updateTodoList = async () => {
      await fetchReferenceTodo(review.value.name)
      const closedTodo = todos.value.filter(todo => todo.status == "Closed").length
      const allTodo = todos.value.length
      if (closedTodo == allTodo && doc.value.workflow_state == "Open") {
        const options = {
          data: {
            workflow_state: 'Final Review',
          }
        }

        api.put(`/resource/intDoc/${doc.value.name}`, options)
          .finally(() => {
            fetchDoc(reviewname.value)
          })

      }
    }

    const actionClick = (action) => {
      api
        .post("method/frappe.model.workflow.apply_workflow", {
          doc: doc.value,
          action: action,
        })
        .then(() => {
          fetchDoc(reviewname.value)
        });
    }



    moment.locale('ru');

    return {
      actionClick,
      actions,
      todos,
      doc,
      linkedFile,
      GetBGClass,
      review,
      loading,
      convertDate,
      openFile,
      sendVerdict,
      todoForEdit,
      user,
      updateTodoList
    }
  }
});
</script>

<style scoped>
.layout {
  width: 70%;
  margin: 0 auto;
}
</style>