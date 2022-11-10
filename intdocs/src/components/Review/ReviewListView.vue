<template>
  <div class="flex items-center justify-between filters">
    <div class="w-1/4 p-4">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
          <svg class="w-5 h-5 text-gray-500" fill="currentColor"
            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd" />
          </svg>
        </div>
        <input type="text" id="table-search" class="
            h-10
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-primary focus:border-primary focus:outline-primary
            block
            w-full
            pl-10
            p-2.5
          " placeholder="Search for items" v-model="search"
          @input="onSearchChange" />
      </div>
    </div>
  </div>

  <div class="q-pa-md">
    <q-table title="Согласования" :rows="reviews" :columns="ColumnsDefinitions"
      row-key="name" :loading="loading"
      rows-per-page-label="Количество согласований на странице"
      :rows-per-page-options="[10, 20, 50]">
      <template v-slot:body="props">
        <q-tr :props="props" @click="showReview(props.row)"
          class="cursor-pointer">
          <q-td key="status" :props="props"
            class="flex items-center justify-start">
            <div class="w-4 h-4 mr-2 rounded-full"
              :class="GetBGClass(props.row.workflow_state)" />
            {{ props.row.workflow_state }}
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.displayname }}
          </q-td>
          <q-td key="id" :props="props" :class="isOverdue(props.row.duedate)">
            {{ props.row.creation ? moment(props.row.creation).fromNow() : "-" }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useRouter } from 'vue-router'
import { ColumnsDefinitions } from './ColumnsDefinitions'
import { GetBGClass } from "../../services/isssuecoloring.js";
import { Review } from "../../types/intReview";
import moment from "moment"
import "moment/dist/locale/ru";


export default defineComponent({
  props: {
    reviews: {
      type: Object as PropType<Review[]>,
      required: true
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  emits: ["review-search-changed"],
  setup(_, { emit }) {
    const search = ref('');

    const router = useRouter()

    const onSearchChange = () => {
      emit("review-search-changed", search.value);
    };

    const showReview = (review) => {
      router.push({
        name: "review-show",
        params: { reviewname: review.name },
      });
    }

    const isOverdue = (date: string): string => {
      const day = 24 * 60 * 60 * 1000;
      if (Date.parse(date) < Date.now() - day) {
        return "text-red-500";
      }
    };

    return {
      isOverdue,
      moment,
      GetBGClass,
      search,
      onSearchChange,
      ColumnsDefinitions,
      showReview
    }
  }
})
</script>