<template>
  <q-dialog :model-value="modelValue" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="max-width: 450px; width: 100%">
      <q-form ref="createIssueFrom">
        <q-card-section class="font-semibold text-left uppercase bg-draft">
          Отправить на согласование
        </q-card-section>

        <q-card-section>
          <q-input class="mb-6" outlined v-model="displayname" dense
            label="Название" :rules="[(val) => !!val || 'Обязательное поле']" />
          <q-select filled emit-value dense v-model="process"
            :options-dense="true" :options="processList"
            option-label="displayname" option-value="type" :label="'Процесс'"
            :rules="[(val) => !!val || 'Обязательное поле']" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="primary" label="Отправить" @click="sendReviewHandler" />
          <q-btn color="negative" label="Отмена" @click="onDialogHide" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, watchEffect } from 'vue';
import { useProjectStore } from '../../store/ProjectStore.js'
import { useReviews } from "../../composables/useReviews";
import { useProcess } from "../../composables/useProcess";
import { storeToRefs } from "pinia";
import { ReviewProcess } from '../../types/intReviewProcess'
import createFormData from "../../utils/createFormData";
import api from '../../services/api.js';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    doc: {
      type: String,
      default: null
    }
  },
  emits: ['hide', 'submitted-to-review'],
  setup(props, { emit }) {
    const process = ref<ReviewProcess>(null);
    const displayname = ref('');
    const loading = ref(false);
    const { activeProject } = storeToRefs(useProjectStore());
    const { createReview, assignUserToReview } = useReviews();
    const { fetchProcess, fetchProcessList, processList } = useProcess();

    const sendReviewHandler = async () => {
      loading.value = true;

      const payload = {
        displayname: displayname.value,
        project: activeProject.value.name,
      };

      const formData = createFormData({
        action: 'Save',
        doc: JSON.stringify({
          ...payload,
          doctype: 'intReview',
          doc: props.doc,
        })
      });

      try {
        const { name } = await createReview(formData);
        const { users } = await fetchProcess(process.value.name);
        const emails = users.map(user => user.user);
        await assignUserToReview({ name, users: emails });

        await api.post("method/frappe.model.workflow.apply_workflow", {
          doc: {
            ...payload,
            doctype: 'intDoc',
            name: props.doc,
          },
          action: 'Start',
        })
        resetFormData();
        onDialogHide();
      } catch (e) {

      }
      finally {
        loading.value = false
        emit('submitted-to-review')
      }
    };

    const resetFormData = () => {
      displayname.value = "";
    };

    const onDialogHide = () => {
      emit('hide');
    };

    watchEffect(() => {
      if (activeProject.value.name)
        fetchProcessList(activeProject.value.name)
    }
    )

    return {
      onDialogHide,
      processList,
      sendReviewHandler,
      process,
      displayname
    }
  }
})
</script>