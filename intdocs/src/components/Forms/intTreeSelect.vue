<template>
  <q-input v-model="selected" dense filled outlined stack-label class="mb-6"
    placeholder="Выберете тип работ" @input="isShow = !isShow">
    <q-popup-proxy fit v-model="isShow">
      <q-tree accordion selected-color="primary" v-model:selected="selected" :nodes="options"
        node-key="displayname" label-key="displayname" @update:selected="handleUpdate"></q-tree>
    </q-popup-proxy>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import intOskClassifierService from "../../services/intOskClassifierService";
import { intOskClassifier } from "../../types/intOskClassifier";

export default defineComponent({
  emits: ["osk-classifier-changed"],
  setup(props, { emit }) {
    const selected = ref("");
    const isShow = ref(false);

    const handleUpdate = () => {
      isShow.value = false;
      const eventData = oskClassifiers.value.filter((el) => {
        return el.displayname === selected.value;
      })[0];
      emit("osk-classifier-changed", eventData);
    };

    const buildTree = (parentId, data) => {
      let newData = [];

      if (data.parents && data.parents[parentId]) {
        for (var itemId of data.parents[parentId]) {
          let newObject = data.item[itemId];

          newObject.children = buildTree(itemId, data);

          newData.push(newObject);
        }
      }

      return newData;
    };

    let options = ref([]);

    const oskClassifiers = ref<intOskClassifier[]>([]);
    onMounted(() => {
      intOskClassifierService.getAll().then((res) => {
        oskClassifiers.value = res.data.data;
        const itemGroup = {
          item: {},
          parents: {},
        };
        oskClassifiers.value.forEach((e) => {
          itemGroup.item[e.name] = e;

          if (itemGroup.parents[e.parent_intoskclassifier]) {
            itemGroup.parents[e.parent_intoskclassifier].push(e.name);
          } else {
            itemGroup.parents[e.parent_intoskclassifier] = [e.name];
          }
        });

        const result = buildTree("", itemGroup);

        options.value = [...result];
        // console.log(options.value);
      });
    });
    return {
      isShow,
      options,
      selected,
      handleUpdate,
    };
  },
});
</script>

<style>

</style>