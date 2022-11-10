<template>
  <q-page :style-fn="myTweak">
    <div class="w-full">
      <status-filters-bar />
      <issue-list-view :issues="paginateAndFilteredIssue"
        @issue-type-changed="onTypeFilterChanged"
        @issue-user-changed="onUserFilterChanged"
        @issue-search-changed="onIssueSearchChanged" />
    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="50"
      :offset="[100, 100]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts">
import StatusFiltersBar from "../components/StatusFilters/StatusFiltersBar.vue";
import CreateIssue from "../components/Forms/CreateIssue.vue";
import IssueListView from "../components/Issue/IssueListView.vue";
import MainNavbar from "../components/Navbar/MainNavbar.vue";
import { Issue } from "../types/intIssue";
import { loadIssues } from "../services/typedfrappe";
import {
  ref,
  onMounted,
  inject,
  computed,
  onBeforeUnmount,
  watchEffect,
  defineComponent,
} from "vue";
import { useProjectStore } from "../store/ProjectStore.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {
    StatusFiltersBar,
    CreateIssue,
    IssueListView,
    MainNavbar,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const myTweak = (offset) => {
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh" };
    };

    const issues = ref<Issue[]>([]);
    const fetchData = async () => {
      issues.value = [...(await loadIssues(activeProject.value.name)).data];
    };

    const { activeProject } = storeToRefs(useProjectStore());
    watchEffect(() => {
      if (activeProject.value.name) {
        fetchData();
      }
    });
    const activeStatusFilter = ref("all");
    const activeTypeFilter = ref("all");
    const activeUserFilter = ref("all");
    const search = ref("");

    const filteredIssue = computed(() => {
      const IssueFilterByStatus =
        activeStatusFilter.value === "all"
          ? issues.value
          : issues.value.filter(
            (el) => el.workflow_state === activeStatusFilter.value
          );
      const IssueFilterByType =
        activeTypeFilter.value === "all"
          ? IssueFilterByStatus
          : IssueFilterByStatus.filter(
            (el) => el.type === activeTypeFilter.value
          );

      const IssueFilterByUser =
        activeUserFilter.value === "all"
          ? IssueFilterByType
          : IssueFilterByType.filter(
            (el) => el.owner === activeUserFilter.value
          );

      const IssueFilterBySearch =
        search.value === ""
          ? IssueFilterByUser
          : IssueFilterByUser.filter((x) =>
            x.title.toLowerCase().includes(search.value.toLowerCase())
          );

      return IssueFilterBySearch;
    });

    const paginateAndFilteredIssue = computed(() => {
      return filteredIssue.value;
    });

    const onIssueAdded = () => {
      fetchData();
    };
    const onSetFilter = (filterName) => {
      activeStatusFilter.value = filterName;
      router.push({ query: { ...route.query, filter: filterName } })
    };

    const onTypeFilterChanged = (data) => {
      activeTypeFilter.value = data;
    };
    const onUserFilterChanged = (data) => {
      activeUserFilter.value = data;
      router.push({ query: { ...route.query, user: data } })
    };
    const onIssueSearchChanged = (input) => {
      search.value = input;
      router.push({ query: { ...route.query, search: input } })
    };

    const issueCount = computed(() => {
      return filteredIssue.value.length;
    });

    const emitter: any = inject("emitter");
    onMounted(() => {
      emitter.on("filter-set", onSetFilter);
      emitter.on("issue-added", onIssueAdded);
      activeStatusFilter.value = route.query.filter ? route.query.filter as string : "all"
      activeUserFilter.value = route.query.user ? route.query.user as string : "all"
      activeTypeFilter.value = route.query.type ? route.query.type as string : "all"
      // fetchData(); must be removed, now trigger for loading issue - setup active project
    });
    onBeforeUnmount(() => {
      emitter.off("filter-set", onSetFilter);
      emitter.off("issue-added", onIssueAdded);
    });
    return {
      myTweak,
      paginateAndFilteredIssue,

      issueCount,
      issues,
      onTypeFilterChanged,
      onUserFilterChanged,
      onIssueSearchChanged,
      filteredIssue,
      activeStatusFilter,
      activeTypeFilter,
      activeUserFilter,
      search,
    };
  },
});
</script>
