<template>
  <q-page>
    <status-filters-bar />

    <q-tabs v-model="tab" class="text-grey" active-color="primary"
      indicator-color="primary" align="justify" narrow-indicator>
      <q-tab name="list" label="Все согласования" />
      <q-tab name="my" label="Мои согласования" />
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel name="list">
        <review-list-view :loading="loading" :reviews="paginateAndFilteredDocs"
          @review-search-changed="onReviewSearchChanged" />
      </q-tab-panel>

      <q-tab-panel name="my">
        <user-review-list />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useReviews } from '../composables/useReviews';
import { useProjectStore } from "../store/ProjectStore.js";
import ReviewListView from "../components/Review/ReviewListView.vue";
import StatusFiltersBar from "../components/Review/StatusFilterBar.vue"
import UserReviewList from "../components/Review/UserReviewList.vue";

export default defineComponent({
  components: {
    ReviewListView,
    StatusFiltersBar,
    UserReviewList
  },
  setup: function () {
    const tab = ref('list');
    const { loadDocs, loading, docs } = useReviews();
    const { activeProject } = storeToRefs(useProjectStore());


    const activeStatusFilter = ref("Open");
    const search = ref("");

    const filteredDocs = computed(() => {
      const DocsFilterByStatus =
        activeStatusFilter.value === "all"
          ? docs.value
          : docs.value.filter(
            (el) => el.workflow_state === activeStatusFilter.value
          );

      return search.value === ""
        ? DocsFilterByStatus
        : DocsFilterByStatus.filter((x) =>
          x.displayname.toLowerCase().includes(search.value.toLowerCase())
        );
    });

    const paginateAndFilteredDocs = computed(() => {
      return filteredDocs.value;
    });

    const onSetFilter = (filterName) => {
      activeStatusFilter.value = filterName;
    };

    const onReviewSearchChanged = (input) => {
      search.value = input;
    };

    const emitter: any = inject("emitter");

    onMounted(() => {
      emitter.on("filter-set", onSetFilter);
    });

    watchEffect(async () => {
      if (activeProject.value.name) {
        loadDocs(activeProject.value.name)
      }
    });

    return {
      loading,
      paginateAndFilteredDocs,
      onReviewSearchChanged,
      search,
      tab
    }
  }
})
</script>