<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  label: String,
  required: Boolean
})

const emit = defineEmits(
  ['new-value']
)

const modelValue = ref('')
watch(modelValue, (newValue) => {
  emit('new-value', newValue)
})
</script>

<template>
  <q-input class="mb-2" v-model="modelValue" outlined dense :label="label" stack-label
    :rules="required? [(val: string) => !!val || 'Обязательное поле']: []" />
</template>