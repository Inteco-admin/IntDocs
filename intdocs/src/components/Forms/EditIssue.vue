<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent
    v-model="modalEditIssue">
    <q-card class="q-dialog-plugin" style="max-width: 850px; width: 800px">
      <q-form ref="editIssueForm">
        <q-card-section class="font-semibold text-left uppercase bg-draft">
          Редактирование замечания
        </q-card-section>

        <q-card-section>
          <q-tabs v-model="tab">
            <q-tab label="Основное" name="basic" />
            <q-tab label="Стройконтроль" name="osk" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated class="my-tab">
            <q-tab-panel name="basic">
              <q-card-section class="mt-5">
                <q-input class="mb-2" v-model="title" outlined dense
                  label="Заголовок" stack-label
                  :rules="[(val) => !!val || 'Обязательное поле']" />
                <q-select class="mb-2" v-model="type" filled emit-value dense
                  :options-dense="true" :options="issueTypes"
                  option-label="name" option-value="type"
                  :label="'Тип замечания'"
                  :rules="[(val) => !!val || 'Обязательное поле']" />
                <q-select class="mb-2" v-model="assign" filled emit-value dense
                  :options-dense="true" :options="intGroups" option-label="name"
                  option-value="type" :label="'Назначено'"
                  :rules="[(val) => !!val || 'Обязательное поле']" />

                <q-input class="mb-2" v-model="description" outlined dense
                  type="textarea" label="Описание" stack-label />

                <div class="w-full mt-5" style="">
                  <q-input class="" filled v-model="date" dense
                    label="Укажите дату устранения">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale"
                          transition-hide="scale">
                          <q-date v-model="date" mask="YYYY-MM-DD">
                            <div class="items-center justify-end row">
                              <q-btn v-close-popup label="Close" color="primary"
                                flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="w-full mt-5" style="">
                  <q-file v-model="files" label="Вложения" filled dense
                    max-files="4" counter use-chips multiple
                    accept=".png, .jpg, .jpeg">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </div>
              </q-card-section>
            </q-tab-panel>
            <q-tab-panel name="osk">
              <q-card-section class="mt-5">
                <q-select class="mb-6" v-model="subCompany" filled emit-value
                  dense :options-dense="true" :options="intSubCompany"
                  option-label="name" option-value="type"
                  :label="'Подрядчик'" />
                <treeselect v-model="value" :normalizer="
                  (node) => {
                    return {
                      id: node.name,
                      label: node.displayname,
                      children:
                        node.child && (node.child.length > 0) ? node.child : undefined,
                    };
                  }
                " :multiple="false" :options="options" :clearable="true"
                  :searchable="true" :close-on-select="true"
                  placeholder="Подсистема" class="mb-6" />
                <q-input class="mb-6" v-model="oskLocation" outlined dense
                  label="Этаж/Оси/Помещение" stack-label />

                <q-input class="mb-6" v-model="oskEquipment" outlined dense
                  label="Инж. оборудование/Документация" stack-label />
              </q-card-section>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>

        <!-- buttons example -->
        <q-card-actions align="right">
          <q-btn color="primary" label="Сохранить" @click="onOKClick" />
          <q-btn color="negative" label="Отмена" @click="onCancelClick" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import api from "../../services/api";
import intGroupService from "../../services/intGroupService";
import { AddAttachment } from "../../services/frappeapi";
import intSubCompanyService from "../../services/intSubCompanyService";
import intOskClassifierService from "../../services/intOskClassifierService";
import { ref } from "vue";
// import the component
import Treeselect from "vue3-treeselect";
// import the styles
import "vue3-treeselect/dist/vue3-treeselect.css";

export default {
  components: {
    Treeselect,
  },
  props: {
    modalEditIssue: {
      type: Boolean,
    },
    issue: {},
  },
  setup() {
    return {
      tab: ref("basic"),
    };
  },
  data() {
    return {
      subCompany: "",
      intSubCompany: [],
      issueTypes: [],
      intGroups: [],
      title: "",
      type: {},
      assign: {},
      description: "",
      date: "",
      files: [],
      oskLocation: "",
      oskSubsystem: "",
      oskEquipment: "",
      value: null,
      // define options
      options: [],
    };
  },

  emits: [
    // REQUIRED
    "ok",
    "hide",
  ],
  mounted() {
    api.get('resource/intIssueType?fields=["*"]').then((res) => {
      res.data.data.forEach((x) => {
        this.issueTypes.push({
          name: x.displayname,
          value: x.displayname,
          id: x.name,
        });
      });
    });

    intGroupService.getAll().then((res) => {
      res.data.data.forEach((x) => {
        this.intGroups.push({
          name: x.displayname,
          value: x.displayname,
          id: x.name,
        });
      });
    });
    intSubCompanyService.getAll().then((res) => {
      res.data.data.forEach((x) => {
        this.intSubCompany.push({
          name: x.displayname,
          value: x.displayname,
          id: x.name,
        });
      });
    });
    intOskClassifierService.getAll().then((res) => {
      const tempOptions = res.data.data;
      const itemGroup = {
        item: {},
        parents: {},
      };
      tempOptions.forEach((e) => {
        itemGroup.item[e.name] = e;

        if (itemGroup.parents[e.parent_intoskclassifier]) {
          itemGroup.parents[e.parent_intoskclassifier].push(e.name);
        } else {
          itemGroup.parents[e.parent_intoskclassifier] = [e.name];
        }
      });

      const result = this.buildTree("", itemGroup);
      this.options = result;
    });
  },

  methods: {
    buildTree(parentId, data) {
      let newData = [];

      if (data.parents && data.parents[parentId]) {
        for (var itemId of data.parents[parentId]) {
          let newObject = data.item[itemId];

          newObject.child = this.buildTree(itemId, data);

          newData.push(newObject);
        }
      }

      return newData;
    },
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      if (this.files) this.files = null;
      this.$emit("hide");
    },

    onOKClick() {
      this.$refs.editIssueForm.validate().then((success) => {
        if (success) {
          api
            .put(
              `resource/intIssue/${this.issue.name}`,
              JSON.stringify({
                title: this.title,
                description: this.description,
                duedate: this.date,
                type: this.type.id,
                intassign: this.assign.id,
                customassign: this.subCompany.id ? this.subCompany.id : "",
                osklocation: this.oskLocation,
                osksubsystem: this.value,
                oskequipment: this.oskEquipment,
              })
            )
            .then((res) => {
              if (res.status === 200) {
                if (this.files) {
                  AddAttachment(this.issue.name, this.files);
                  this.$emit("ok");
                } else {
                  this.$emit("ok");
                }
                this.resetFormData();
                this.hide();
              }
            });
        } else {
          console.log("fail");
          return;
        }
      });
    },

    resetFormData() {
      this.subject = "";
      this.type = "";
      this.localDescription = "";
      this.files = null;
      this.subCompany = "";
    },

    onCancelClick() {
      // we just need to hide the dialog
      this.hide();
    },
  },
  watch: {
    issue: function (value) {
      this.title = value.title;
      this.description = value.description;

      this.type = this.issueTypes.filter((x) => {
        return x.id === value.type;
      })[0];

      this.intGroups.forEach((x) => {
        if (x.id === value.intassign) {
          this.assign = x;
        }
      });

      this.intSubCompany.forEach((x) => {
        if (x.id === value.customassign) {
          this.subCompany = x;
        }
      });

      this.date = value.duedate;
      this.oskLocation = value.osklocation;
      this.oskSubsystem = value.osksubsystename;
      this.oskEquipment = value.oskequipment;
      this.value = value.osksubsystem;
    },
  },
};
</script>

<style scoped>
.my-tab {
  height: 75% !important;
}

.q-card__actions {
  padding: 0 1.9rem;
}
</style>