<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import intIssueService from '../../services/intIssueService';
import { Issue } from '../../types/intIssue';
import ModelIssueCard from './ModelIssueCard.vue';

defineProps<{
  filteredIssues: Issue[]
}>()

</script>

<template>
  <ul>
    <ModelIssueCard v-for="iss in filteredIssues" :key="iss.name"
      :issue="iss" />
  </ul>
</template>