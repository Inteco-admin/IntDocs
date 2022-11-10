<template>
  <nav
    class="flex items-center justify-between mx-4 my-4 text-xs text-gray-400">
    <div>
      <ul class="flex space-x-10 font-semibold uppercase">
        <li>
          <a href="#"
            class="block w-32 pb-3 text-center transition ease-in border-b-4 duration-2 hover:border-blue-500 hover:text-gray-900"
            :class="{
              'border-blue-500 text-gray-900':
                activeFilter === 'all',
              'border-gray-200 text-gray-500':
                activeFilter !== 'all',
            }" id="all" @click.prevent="setStatus">All Items
          </a>
        </li>
        <li>
          <a href="#"
            class="block w-32 pb-3 text-center transition ease-in border-b-4 duration-2 hover:border-open hover:text-gray-900"
            :class="{
              'border-open text-gray-900':
                activeFilter === 'Open',
              'border-gray-200 text-gray-500':
                activeFilter !== 'Open',
            }" id="Open" @click.prevent="setStatus">Open
          </a>
        </li>
        <li>
          <a href="#"
            class="block w-32 pb-3 text-center transition ease-in border-b-4 duration-2 hover:border-notapproved hover:text-gray-900"
            :class="{
              'border-notapproved text-gray-900':
                activeFilter === 'Not Approved',
              'border-gray-200 text-gray-500':
                activeFilter !== 'Not Approved',
            }" id="Not Approved" @click.prevent="setStatus">Not Approved
          </a>
        </li>
        <li>
          <a href="#"
            class="block w-32 pb-3 text-center transition ease-in border-b-4 duration-2 hover:border-indispute hover:text-gray-900"
            :class="{
              'border-indispute text-gray-900':
                activeFilter === 'In Disput',
              'border-gray-200 text-gray-500':
                activeFilter !== 'In Disput',
            }" id="In Disput" @click.prevent="setStatus">In Disput
          </a>
        </li>
        <li>
          <a href="#"
            class="block w-32 pb-3 text-center transition ease-in border-b-4 duration-2 hover:border-inwork hover:text-gray-900"
            :class="{
              'border-inwork text-gray-900':
                activeFilter === 'In Work',
              'border-gray-200 text-gray-500':
                activeFilter !== 'In Work',
            }" id="In Work" @click.prevent="setStatus">In Work
          </a>
        </li>
        <li>
          <a href="#"
            class="block w-32 pb-3 text-center transition ease-in border-b-4 duration-2 hover:border-ready hover:text-gray-900"
            :class="{
              'border-ready text-gray-900':
                activeFilter === 'Ready to inspect',
              'border-gray-200 text-gray-500':
                activeFilter !== 'Ready to inspect',
            }" id="Ready to inspect" @click.prevent="setStatus">
            Ready to inspect
          </a>
        </li>
      </ul>
    </div>
    <div>
      <ul class="flex space-x-10 font-semibold uppercase">
        <li>

          <a href="#"
            class="block w-24 pb-3 text-center transition ease-in border-b-4 duration-2 hover:border-gray-700 hover:text-gray-900"
            :class="{
              'border-gray-500 text-gray-900':
                activeFilter === 'Void',
              'border-gray-200 text-gray-500':
                activeFilter !== 'Void',
            }" id="Void" @click.prevent="setStatus">Void
          </a>
        </li>
        <li>
          <a href="#"
            class="block w-24 pb-3 text-center transition ease-in border-b-4 duration-2 hover:border-gray-700 hover:text-gray-900"
            :class="{
              'border-gray-500 text-gray-900':
                activeFilter === 'Closed',
              'border-gray-200 text-gray-500':
                activeFilter !== 'Closed',
            }" id="Closed" @click.prevent="setStatus">Closed
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      activeFilter: "all",
    };
  },
  mounted() {
    if (this.$route.query.filter) {
      this.activeFilter = this.$route.query.filter
    }
  },
  methods: {
    setStatus(event) {
      // console.log(event.target.id);
      this.activeFilter = event.target.id;
      this.emitter.emit("filter-set", this.activeFilter);
    },
  },
  computed: {
  },
};
</script>
