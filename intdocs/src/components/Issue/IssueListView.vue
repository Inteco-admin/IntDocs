<template>
  <div class="flex items-center justify-between filters">
    <div class="w-1/4 p-4">
      <table-search @search-change="onSearchChange" />
    </div>
    <div class="w-1/4 p-4">
      <int-type-select @type-changed="onIssueTypeChanged" />
    </div>
    <div class="w-1/4 p-4">
      <int-user-select @user-changed="onIssueUserChanged" />
    </div>
    <div class="w-1/4 p-2">
      <button
        class="w-full py-2 text-white rounded-md bg-primary hover:opacity-80"
        @click="openCreateIssueModal">
        New issue
      </button>
    </div>
  </div>

  <!-- TABLE OF ISSUE -->
  <div class="q-pa-md">
    <q-table title="Список замечаний" :rows="issues"
      :columns="ColumnsDefinitions" row-key="name"
      rows-per-page-label="Количество замечаний на странице"
      :rows-per-page-options="[10, 20, 50]">
      <template v-slot:body="props">
        <q-tr :props="props" @click="showIssue(props.row)"
          class="cursor-pointer">
          <q-td key="status" :props="props"
            class="flex items-center justify-start">
            <div class="w-4 h-4 mr-2 rounded-full"
              :class="GetBGClass(props.row.workflow_state)">
            </div>
            {{ props.row.workflow_state }}
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="type" :props="props">
            {{ props.row.typename }}
          </q-td>
          <q-td key="title" :props="props">
            {{ props.row.title }}
          </q-td>
          <q-td key="date" :props="props" :class="isOverdue(props.row.duedate)">
            {{ props.row.duedate ? moment(props.row.duedate).fromNow() : "-" }}
          </q-td>
          <q-td key="assign" :props="props">
            {{ props.row.intassingname }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <!-- END TABLE OF ISSUE -->

  <!-- Modal For Create Issue -->
  <create-issue :modalCreateIssue="modalCreateIssue"
    @hide="modalCreateIssue = false" />
</template>

<script lang="ts">

import IssueListViewCard from "./IssueListViewCard.vue";
import { ref, defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import CreateIssue from "../Forms/CreateIssue.vue";
import type { Issue } from "../../types/intIssue";
import { GetBGClass } from "../../services/isssuecoloring";
import moment from "moment";
import "moment/dist/locale/ru";
import { SelectDTO } from "../../types/SelectDTo";
import { ColumnsDefinitions } from "./ColumnsDefinitions";
import IntTypeSelect from "../Forms/intTypeSelect.vue";
import IntUserSelect from "../Forms/intUserSelect.vue";
import TableSearch from "../Forms/TableSearch.vue";

export default defineComponent({
  components: {

    IssueListViewCard,
    CreateIssue,
    IntTypeSelect,
    IntUserSelect,
    TableSearch
  },
  props: {
    issues: {
      type: Object as PropType<Issue[]>,
      required: true,
    },
  },
  emits: ["issue-type-changed", "issue-user-changed", "issue-search-changed"],
  setup(props, { emit }) {
    const router = useRouter();

    const modalCreateIssue = ref(false);

    const onIssueTypeChanged = async (data: SelectDTO) => {
      emit("issue-type-changed", data ? data.id : 'all')
    };

    const onIssueUserChanged = async (data: SelectDTO) => {
      emit("issue-user-changed", data ? data.id : 'all')
    };

    const onSearchChange = (search: string) => {
      emit("issue-search-changed", search);
    };

    const openCreateIssueModal = () => {
      modalCreateIssue.value = true;
    };

    const showIssue = (issue) => {
      router.push({
        name: "issue-show",
        params: { issuename: issue.name },
      });
    };

    const isOverdue = (date: string): string => {
      const day = 24 * 60 * 60 * 1000;
      if (Date.parse(date) < Date.now() - day) {
        return "text-red-500";
      }
    };
    moment.locale("ru");

    return {
      moment,
      isOverdue,
      GetBGClass,
      onIssueTypeChanged,
      onIssueUserChanged,
      onSearchChange,
      openCreateIssueModal,
      showIssue,

      modalCreateIssue,
      props,
      ColumnsDefinitions,
    };
  },
});
</script>

