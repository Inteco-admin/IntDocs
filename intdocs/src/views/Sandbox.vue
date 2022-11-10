<script lang="ts" setup>
import { onMounted, ref } from "vue";
import XktViewer from "../components/XKTViewer/XktViewer.vue";
import ModelIssueList from "../components/XKTViewer/ModelIssueList.vue"
import CreateIssue from "../components/Forms/CreateIssue.vue";
import intIssueService from "../services/intIssueService";
import { Issue } from "../types/intIssue";

const filteredIssues = ref<Issue[]>()
onMounted(async () => {
  filteredIssues.value = (await intIssueService.getListByModel()).data.data
})
const modalCreateIssue = ref(false)
const pickedElement = ref(null)

const openCreateIssueModal = () => {
  modalCreateIssue.value = true;
}
const pickResultHandler = (result) => {
  if (result) {
    console.log(result)
    pickedElement.value = result
  } else {
    console.log('nothing')
    pickedElement.value = null
  }
}
const fetchIssue = async () =>
  filteredIssues.value = (await intIssueService.getListByModel()).data.data


</script>

<template>
  <q-page class="row no-wrap">
    <div class="col-2">
      <div class="flex issue-controls">
        <button :disabled="!pickedElement"
          class="w-full py-2 text-white rounded-md bg-primary hover:opacity-80"
          @click="openCreateIssueModal">
          New issue
        </button>
      </div>
      <model-issue-list :filtered-issues="filteredIssues" />
    </div>
    <div class="col">
      <xkt-viewer :issues="filteredIssues" @element-picked="pickResultHandler"
        @element-nothing="pickResultHandler" />
    </div>
  </q-page>
  <!-- Modal For Create Issue -->
  <create-issue :modalCreateIssue="modalCreateIssue"
    @hide="modalCreateIssue = false" :elementID="pickedElement"
    :modelName="'model_kr_vr4.xkt'" @ok="fetchIssue" />
</template>

