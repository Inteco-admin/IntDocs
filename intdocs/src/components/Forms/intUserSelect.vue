<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UsersService from '../../services/UsersService';
import { SelectDTO } from '../../types/SelectDTO';
import { useSelectFilter } from '../../composables/useSelectFilter';

const emit = defineEmits(['user-changed'])

const users = ref<SelectDTO[]>([])
const filteredOptions = ref([])
const selectedType = ref<SelectDTO>(null)
const route = useRoute()
const router = useRouter()

onMounted(() => {
  UsersService.getAllForSelect()
    .then((res) => {
      users.value = res
      if (route.query.user)
        selectedType.value = users.value.find(x => x.id === route.query.user)
    })
})

watch(selectedType, (newValue) => {
  router.push({
    query: {
      ...route.query,
      user: newValue ? newValue.id : undefined
    }
  })
  emit('user-changed', newValue)
})

const filterFunction = useSelectFilter(filteredOptions, users)

</script>
  
  
<template>
  <q-select :options="filteredOptions" v-model="selectedType" clearable
    option-label="name" option-value="value" dense options-dense filled
    use-input input-debounce="3" @filter="filterFunction"
    label="Автор замечания" />
</template>