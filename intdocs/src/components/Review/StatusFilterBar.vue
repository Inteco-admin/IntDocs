<template>
  <div
    class="flex items-center justify-between mx-4 my-4 text-xs text-gray-400">
    <div>
      <ul class="flex space-x-10 font-semibold uppercase">
        <li v-for="status in statuses">
          <a href="#"
            class="block w-32 pb-3 text-center transition ease-in border-b-4 duration-2 hover:text-gray-900"
            :class="getClasses(status)" :id="status"
            @click.prevent="setStatus(status)">
            {{ status }}
          </a>
        </li>

      </ul>
    </div>
    <div v-if="false">
      <ul class="flex space-x-10 font-semibold uppercase">
        <li>

          <a href="#"
            class="block w-24 pb-3 text-center transition ease-in border-b-4 duration-2 hover:border-gray-700 hover:text-gray-900"
            :class="{
              'border-gray-500 text-gray-900':
                activeFilter === 'Void',
              'border-gray-200 text-gray-500':
                activeFilter !== 'Void',
            }" id="Void" @click.prevent="setStatus(event)">Void
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { GetBorderClass, GetHoverBorderClass } from '../../services/isssuecoloring';
export default {
  data() {
    return {
      activeFilter: "Open",
      statuses: [
        'Open',
        'Final Review',
        'Approved',
        'Approved WC',
        'Reject'
      ]
    };
  },
  methods: {
    setStatus: function (status) {
      this.activeFilter = status
      this.emitter.emit("filter-set", this.activeFilter);
    },
    getClasses(status) {
      const cls = []
      if (status === this.activeFilter) {
        cls.push('text-gray-900')
        cls.push(GetBorderClass(status))
      } else {
        cls.push('text-gray-500')
        cls.push(GetHoverBorderClass(status))
      }
      return cls.join(' ')
    },
  }
}
</script>
