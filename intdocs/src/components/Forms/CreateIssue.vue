<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent
    v-model="modalCreateIssue">
    <q-card class="q-dialog-plugin" style="max-width: 850px; width: 800px">
      <q-form ref="createIssueFrom">
        <q-card-section class="font-semibold text-left uppercase bg-draft">
          Новое замечание
        </q-card-section>

        <q-tabs v-model="tab">
          <q-tab label="Основное" name="basic" />
          <q-tab label="Стройконтроль" name="osk" />
        </q-tabs>
        <q-separator />

        <q-tab-panels v-model="tab" animated class="my-tab">
          <q-tab-panel name="basic">
            <q-card-section class="mt-5">
              <q-input class="mb-2" v-model="subject" outlined dense
                label="Заголовок" stack-label
                :rules="[(val) => !!val || 'Обязательное поле']" />
              <q-select class="mb-2" v-model="type" filled emit-value dense
                :options-dense="true" :options="issueTypes" option-label="name"
                option-value="type" :label="'Тип замечания'"
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
                <q-file v-model="files" label="Вложения" filled append dense
                  max-files="4" counter use-chips multiple
                  accept=".png, .jpg, .jpeg">
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
                <div class="items-start q-gutter-sm row" v-if="files.length">
                  <q-img style="height: 140px; max-width: 150px"
                    v-for="(file, index) in files" :key="file"
                    :src="genImg(file)" fit="scale-down" spinner-color="red"
                    loading="lazy" class="shadow-1">
                    <div class="text-center absolute-bottom">
                      {{ file.name }}
                    </div>
                  </q-img>
                </div>
              </div>
            </q-card-section>
          </q-tab-panel>
          <q-tab-panel name="osk">
            <q-card-section class="mt-5">
              <q-select class="mb-6" v-model="subCompany" filled emit-value
                dense :options-dense="true" :options="intSubCompany"
                option-label="name" option-value="type" :label="'Подрядчик'" />
              <int-tree-select @osk-classifier-changed="oskClassifierChange" />
              <q-input class="mb-6" v-model="oskLocation" outlined dense
                label="Этаж/Оси/Помещение" stack-label />
              <q-input class="mb-6" v-model="oskEquipment" outlined dense
                label="Инж. оборудование/Документация" stack-label />
            </q-card-section>
          </q-tab-panel>
        </q-tab-panels>

        <!-- buttons example -->
        <q-card-actions align="right" class="">
          <q-btn color="primary" label="Сохранить" @click="onOKClick" />
          <q-btn color="negative" label="Отмена" @click="onCancelClick" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import api from "../../services/api";
import { AddAttachment } from "../../services/frappeapi";
import { mapStores } from "pinia";
import { useUserStore } from "../../store/UserStore";
import { useProjectStore } from "../../store/ProjectStore";
import intGroupService from "../../services/intGroupService";
import intSubCompanyService from "../../services/intSubCompanyService";
import { ref } from "vue";
import intTreeSelect from "../Forms/intTreeSelect.vue";

export default {
  components: {
    intTreeSelect,
  },
  props: {
    modalCreateIssue: {
      type: Boolean,
    },
    modelName: {
      type: String,
      required: false
    },
    elementID: {
      type: String,
      required: false
    }
  },
  setup() {
    return {
      tab: ref("basic"),
    };
  },
  data() {
    return {
      subCompany: "",
      issueTypes: [],
      subject: "",
      type: "",
      description: "",
      date: "",
      intGroups: [],
      intSubCompany: [],
      files: [],
      assign: "",
      oskLocation: "",
      oskSubsystem: "",
      oskEquipment: "", // define options
      oskClassifier: "",
      hiddenData: "",
      divid: "",
    };
  },

  emits: [
    // REQUIRED
    "ok",
    "hide",
  ],
  beforeUpdate() {
    this.emitter.off("createIssue", (e) => this.handleEvent(e));
  },
  mounted() {
    this.emitter.on("createIssue", (e) => this.handleEvent(e));
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
  },
  computed: {
    ...mapStores(useUserStore, useProjectStore),
    doc() {
      return this.$route.params.doc;
    },
  },

  methods: {
    oskClassifierChange(data) {
      this.oskSubsystem = data.name;
    },
    handleEvent(e) {
      this.divid = e["divid"];
      this.hiddenData = e;
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
      this.$emit("hide");
    },

    onOKClick() {
      this.$refs.createIssueFrom.validate().then((success) => {
        if (success) {
          api
            .post(
              "resource/intIssue",
              JSON.stringify({
                title: this.subject,
                description: this.description,
                workflow_state: "Open",
                type: this.type.id,
                project: this.projectsStore.activeProject.name,
                duedate: this.date,
                intassign: this.assign.id,
                customassign: this.subCompany.id,
                osklocation: this.oskLocation,
                osksubsystem: this.oskSubsystem,
                oskequipment: this.oskEquipment,
                pdfcoords: this.hiddenData["data-3DData"],
                pdfcamera: this.hiddenData["data-viewstate"],
                pdfpage: this.hiddenData["data-pdfpage"],
                doc: this.doc,
                modelid: this.elementID,
                modelname: this.modelName
              })
            )
            .then((res) => {
              if (res.status === 200) {
                if (this.files) {
                  AddAttachment(res.data.data.name, this.files);
                }
                this.resetFormData();
                this.$emit("ok");
                this.emitter.emit("issue-added");
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
      this.description = "";
      this.files = [];
    },

    onCancelClick() {
      // we just need to hide the dialog
      const pushpin = document.getElementById(this.divid);
      if (pushpin) {
        pushpin.remove();
      }
      this.resetFormData();
      this.hide();
    },

    genImg(srcfile) {
      console.log(srcfile);
      return URL.createObjectURL(srcfile);
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