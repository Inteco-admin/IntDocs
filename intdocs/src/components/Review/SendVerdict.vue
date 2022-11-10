<script setup lang="ts">
import { useDialogPluginComponent } from "quasar"
import { ref } from "vue";
import api from "../../services/api";
import { Todo } from "../../types/Todo";

const emit = defineEmits([...useDialogPluginComponent.emits, 'todo-closed'])
const props = defineProps<{
  todo: Todo
}>()

const text = ref('')
const verdict = ref('')
const verdictOptions: string[] = [
  'Согласовано', 'Согласованно с замечаниями', 'Не согласовано'
]

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel }
  = useDialogPluginComponent()

const onOKClick = () => {
  if (text.value.length === 0 || verdict.value.length === 0) return
  // TODO: logic for update todo data and change todo workflow_status

  const options = {
    data: {
      assigmentverdict: verdict.value,
      assigmentverdictcomment: text.value,
      status: 'Closed'
    }
  }

  api.put(`/resource/ToDo/${props.todo.name}`, options)
    .finally(() => {
      onDialogOK()
      emit('todo-closed')
    })
}
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-subtitle1">Комментарий</div>
        <q-input v-model="text" filled type="textarea" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-select v-model="verdict" filled emit-value dense :options-dense="true"
          :options="verdictOptions" label="Решение" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>