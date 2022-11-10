<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Issue } from '../../types/intIssue';
import { GetBGClass } from '../../services/isssuecoloring'

const props = defineProps<{
  issue: Issue
}>()

const router = useRouter()

const showIssue = () => {
  router.push({
    name: "issue-show",
    params: { issuename: props.issue.name },
  });
};
const showIssueOnModel = () => {

}
</script>


<template>
  <q-card transition="" class="shadow-1" bordered @click="showIssue()">
    <q-card-section horizontal>
      <div class="text-overline q-px-sm"
        :class="GetBGClass(issue.workflow_state)">
        {{ issue.name }}
      </div>
      <q-card-section class="full-width q-pa-none">
        <q-card-section class="q-py-xs">
          <div class="text-h5 q-mb-xs">
            {{ issue.title }}
          </div>
          <div class="text-caption ellipsis-2-lines">
            {{ issue.description }}
          </div>
          <div class="text-caption text-weight-bold">
            by {{ issue.owner }}
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="around">
          <router-link :to="{
            name: 'issue-show',
            params: { issuename: issue.name },
          }">
            <q-btn flat round dense icon="article"></q-btn>
          </router-link>
          <q-btn v-if="issue.pdfcoords" flat round dense icon="my_location"
            @click="showIssueOnModel">
          </q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>