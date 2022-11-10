<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSelectFilter } from '../../composables/useSelectFilter';
import intIssueTypeService from '../../services/intIssueTypeService';
import { SelectDTO } from '../../types/SelectDTO';

const emit = defineEmits(['type-changed'])

const types = ref<SelectDTO[]>([])
const filteredOptions = ref([])
const selectedType = ref<SelectDTO>(null)
const route = useRoute()
const router = useRouter()

onMounted(() => {
  intIssueTypeService.getAllForSelect()
    .then((res) => {
      types.value = res
      if (route.query.type)
        selectedType.value = types.value.find(x => x.id === route.query.type)
    })
})

watch(selectedType, (newValue) => {
  router.push({
    query: {
      ...route.query,
      type: newValue ? newValue.id : undefined
    }
  })
  emit('type-changed', newValue)
})

const filterFunction = useSelectFilter(filteredOptions, types)

</script>


<template>
  <q-select :options="filteredOptions" v-model="selectedType" clearable
    option-label="name" option-value="value" dense options-dense filled
    use-input input-debounce="3" @filter="filterFunction"
    label="Тип замечания" />
</template>