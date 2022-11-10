<template>
  <div class="q-gutter-md">
    <q-select v-model="model" use-input input-debounce="3" filled emit-value
      dense :options-dense="true" :options="localOptions" option-label="name"
      option-value="name" :label="label" @update:modelValue="handleUpdate"
      :rules="rules" @filter="filterFn">
      <template v-if="model" v-slot:append>
        <q-icon name="cancel" @click.stop="clearSelect"
          class="cursor-pointer" />
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    options: Array,
    label: String,
    rules: Array,
  },
  emits: ["value-changed"],

  setup(props, { emit }) {
    const model = ref(null);
    let localOptions = ref([]);
    const handleUpdate = () => {
      emit("value-changed", model.value);
    };
    const clearSelect = () => {
      model.value = null;
      emit("value-changed", model.value);
    };
    // watch(model, (model, prevModel) => {
    //   emit("issue-type-changed", model);
    // });

    const filterFn = (val, update) => {
      if (val === "") {
        update(() => {
          localOptions.value = [...props.options];

          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        localOptions.value = props.options.filter(
          (v: any) => v.value.toLowerCase().indexOf(needle) > -1
        );
      });
    };
    return {
      localOptions,
      filterFn,
      model,
      handleUpdate,
      clearSelect,
    };
  },
});
</script>
