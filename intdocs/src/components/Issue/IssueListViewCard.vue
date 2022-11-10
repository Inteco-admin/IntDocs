<template>
  <tr class="bg-white border-b cursor-pointer hover:bg-gray-50">
    <td class="flex items-center px-6 py-4">
      <div class="w-32 p-2 text-center text-white rounded-full"
        :class="setClassByStatus">
        {{ issue.workflow_state }}
      </div>
    </td>
    <td class="px-6 py-2">
      {{ issue.name }}
    </td>
    <td class="px-6 py-2">
      {{ issue.typename }}
    </td>
    <th scope="row"
      class="px-6 py-2 overflow-hidden font-medium text-gray-900  text-ellipsis whitespace-nowrap">
      {{ issue.title }}
    </th>
    <td class="px-6 py-2" :class="isOverdue">
      {{ issue.duedate }}
    </td>
    <td class="px-6 py-2">
      {{ intgroup }}
    </td>
    <td class="px-6 py-2">
      {{ issue.docname }}
    </td>
  </tr>
</template>

<script lang="ts">
import { GetHoverBorderClass } from "../../services/isssuecoloring";
import { PropType, defineComponent, Prop } from "vue";
import { Issue } from "../../types/intIssue";
import { intGroup } from "../../types/intGroup";
export default defineComponent({
  props: {
    issue: {
      required: true,
      type: Object as PropType<Issue>,
    },
    groups: {
      type: Array as PropType<intGroup[]>,
    },
  },

  mounted() { },
  computed: {
    setClassByStatus(): string {
      return GetHoverBorderClass(this.issue.workflow_state);
    },
    isOverdue(): string {
      const day = 24 * 60 * 60 * 1000;
      if (Date.parse(this.issue.duedate) < Date.now() - day) {
        return "text-red-500";
      }
    },
    intgroup(): string {
      if (this.groups.length > 0) {
        const temp = this.groups.filter((x) => x.name === this.issue.intassign);
        if (temp.length > 0) return temp[0].displayname;
      }
    },
  },
});
</script>