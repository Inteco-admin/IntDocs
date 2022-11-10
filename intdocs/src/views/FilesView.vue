<template>
  <!-- <q-layout view="lhr lpR lfr" container> -->

    <!-- <q-header elevated class="text-white bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          File Browse
        </q-toolbar-title>
      </q-toolbar>
    </q-header> -->

    <!-- <q-page-container> -->
      <q-page class="row no-wrap">
        <div class="col-3 q-pa-sm"
          style="min-width: 320px; /*background-color: #dadada;*/">
          <!-- <div class="text-h5">Разделы</div> -->
          <q-scroll-area class="fit">
            <q-toolbar class="bg-blue-grey-1 q-my-md shadow-1">
              <q-toolbar-title>Разделы</q-toolbar-title>
            </q-toolbar>
            <q-tree :nodes="tree" node-key="name" label-key="displayname"
              children-key="child" selected-color="secondary"
              :selected="selectedTreeNode" @update:selected="updateSelected" />
          </q-scroll-area>
        </div>
        <div class="col q-pa-sm" style="/*background-color: #e1e1e1;*/">
          <q-scroll-area class="fit">
            <q-toolbar class="text-black bg-blue-grey-1 q-my-md shadow-1">
              <q-toolbar-title>Файлы</q-toolbar-title>
            </q-toolbar>
            <div id="filelist" class="q-p-xs" style="overflow-wrap: anywhere;">
              <q-table flat bordered binary-state-sort :rows="rows"
                :columns="columns" row-key="name" separator="none"
                selection="multiple" v-model:selected="selectedRows"
                :pagination="initialPagination"
                :rows-per-page-options="[10, 20, 50]" :loading="tableLoading"
                no-data-label="Пока пусто">
                <template v-slot:top-left>
                  <div class="q-pr-md q-gutter-sm">
                    <q-btn :disable="btnUploadFilesDisable"
                      :color="btnUploadFilesDisable === true ? 'grey-8' : 'primary'"
                      icon="upload" label="Загрузка" @click="btnUploadClick">
                    </q-btn>
                    <!-- <q-btn :disable="btnMoveFilesDisable"
                      :color="btnMoveFilesDisable === true ? 'grey-8' : 'primary'" icon="move_up"
                      label="Переместить" @click="btnMoveClick"></q-btn> -->
                    <q-btn :disable="btnDeleteFilesDisable"
                      :color="btnDeleteFilesDisable === true ? 'grey-8' : 'primary'"
                      icon="delete" label="Удалить" @click="btnDeleteClick">
                    </q-btn>
                  </div>
                </template>
                <template v-slot:top-right>
                  <q-btn flat icon="refresh" @click="refreshKniga"></q-btn>
                </template>
                <!-- Кнопка для отправки на согласование -->
                <template v-slot:body-cell-status="props">
                  <q-td :props="props">
                    <ReviewButton @onClick="openSendToReviewModal(props.row)"
                      :status="props.row.workflow_state" />
                  </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <q-btn flat round @click="viewFile(props)"
                      icon="visibility"></q-btn>
                  </q-td>
                </template>
                <template v-slot:loading>
                  <q-inner-loading showing color="primary" />
                </template>
                <template v-slot:no-data="{message}">
                  <div class="full-width row flex-center q-gutter-sm">
                    <q-icon size="2em" name="sentiment_dissatisfied" />
                    <span>
                      {{message}}
                    </span>
                  </div>
                </template>
              </q-table>
            </div>
          </q-scroll-area>
        </div>

        <q-dialog v-model="modalUploadFile" @hide="onDialogHide">
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
              <div class="text-h6">Загрузка файла</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="w-full mt-5" style="">
                <q-file v-model="files" label="Документ" :loading="isUploading"
                  filled dense max-files="5" counter multiple use-chips
                  accept=".pdf" :input-style="{ height: '100px' }">
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn color="primary" label="Сохранить" @click="onOKClick" />
              <q-btn color="negative" label="Отмена" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Модальное окно для отправки на согласование -->
        <send-to-review :model-value="!!modalSendDoc" :doc="modalSendDoc"
          @hide="modalSendDoc = null" @submitted-to-review="submitHandler" />
      </q-page>
    <!-- </q-page-container>
  </q-layout> -->
</template>

<script>
import api from "../services/api";
import { AddFiles, deleteIntDoc } from "../services/frappeapi";
import { mapStores } from "pinia";
import { useProjectStore } from "../store/ProjectStore";
import { useQuasar } from 'quasar';
import ReviewButton from "@/components/Files/ReviewButton.vue";
import SendToReview from "@/components/Forms/SendToReview.vue";

window.api = api
const columns = [
  { name: 'name', required: true, label: 'Название', align: 'left', field: row => row.displayname, format: val => `${val}`, sortable: true },
  { name: 'file', required: true, label: 'File', align: 'left', field: row => row.filepdf, format: val => `${val}`, sortable: true },
  //{ name: 'amended_from', required: true, label: 'Amended From', align: 'left', field: row => row.amended_from, format: val => `${val}`, sortable: true },
  //{ name: 'razdel', required: true, label: 'Razdel', align: 'left', field: row => row.razdel, format: val => `${val}`, sortable: true },
  //{ name: 'project_name', required: true, label: 'Project Name', align: 'left', field: row => row.project_name, format: val => `${val}`, sortable: true },
  { name: 'status', label: 'Статус', field: '', align: 'center' },
  { name: 'actions', label: 'Actions', field: '', align: 'center' },
]

const initialPagination = {
  sortBy: 'name',
  rowsPerPage: 50
}


export default {
  components: { ReviewButton, SendToReview },
  data() {
    return {
      selectedTreeNode: [],
      selectedRows: [],
      tree: [],
      columns,
      initialPagination,
      tableLoading: false,
      rows: [],
      btnMoveFilesDisable: true,
      btnDeleteFilesDisable: true,
      btnUploadFilesDisable: false,
      currentSection: null,
      modalUploadFile: false,
      fileName: null,
      files: null,
      isUploading: false,
      modalSendDoc: null,
    };
  },

  setup() {
    //const $q = useQuasar();
  },

  mounted() {
    api.get('/resource/intSection?fields=["*"]&limit=100').then(
      (response) => {
        var itemGroup = {
          item: {},
          parents: {}
        }
        var results = [...response.data.data];
        results.forEach((res) => {
          if (res.name == "\\") return;
          res.icon = 'folder';
          itemGroup.item[res.name] = res;
          if (itemGroup.parents[res.parent_intsection]) {
            itemGroup.parents[res.parent_intsection].push(res.name)
          } else {
            itemGroup.parents[res.parent_intsection] = [res.name]
          }
        });

        this.tree = this.buildTree('int-sec-0026-system_all', itemGroup);
      }
    ).then(() => {
      if (Object.keys(this.selectedTreeNode).length === 0) {

        if (this.$route.query.folder) {
          this.openSection(this.$route.query.folder)
          this.selectedTreeNode = this.$route.query.folder
        }
        else {
          this.selectedTreeNode = this.tree[0].name;
          this.openSection(this.selectedTreeNode);
        }
      }
    });
  },
  methods: {
    openSendToReviewModal(doc) {
      this.modalSendDoc = doc?.name
    },

    buildTree(parentId, data) {
      let newData = []

      if (data.parents && data.parents[parentId]) {
        for (var itemId of data.parents[parentId]) {
          let newObject = data.item[itemId]
          newObject.child = this.buildTree(itemId, data)
          newData.push(newObject)
        }
      }

      return newData
    },
    updateSelected(key) {
      if (key !== null) {
        this.selectedTreeNode = key
      }
      this.openSection(this.selectedTreeNode);
    },
    openSection(intRazdel) {
      //set table loading state
      let myInterceptor = api.interceptors.request.use((request) => {
        this.tableLoading = true; //set table loading state
        return request;
      }, function (error) {
        return Promise.reject(error);
      });

      api.get('resource/intDoc?fields=["*"]&filters=[["section","=","' + intRazdel + '"],["project","=","' + this.projectsStore.activeProject.name + '"]]&limit=0&order_by=name%20asc').then(
        (response) => {
          //var results = [...responce.data.data];
          this.rows = [...response.data.data];
          // console.log('[FilesView.vue] showKniga rows: ', this.rows)
          this.selectedRows = [];
          this.tableLoading = false;
          this.currentSection = intRazdel;
          this.$router.push({ path: '/browser', query: { folder: intRazdel } })
          api.interceptors.request.eject(myInterceptor)
        }
      ).catch(
        (error) => {
          this.$q.notify({
            position: "center",
            message: "Ошибка: " + error.code + '<br />' + error.message,
            type: "negative",
            group: false,
            html: true,
            progress: true,
          })
          this.tableLoading = false;
          //console.log(error.toJSON());
        }
      )
    },
    viewFile(data) {
      // console.log("[FilesView.vue] viewFile", data);
      api.get(`resource/intDoc/${data.key}`).then(res => {
        const file_name = res.data.data.filepdf
        if (file_name) {
          this.$router.push({
            name: "viewer",
            params: {
              file: file_name,
              doc: data.key
            },
          });
        } else {
          this.$q.notify({
            type: "warning",
            position: "top",
            message: "Похоже нет файла",
          })
        }
      })
    },
    btnMoveClick() {
      if (this.selectedRows.length > 0) {
        (this.selectedRows).forEach((row) => {
          console.log(row);
        })
      }
    },
    btnDeleteClick() {
      if (this.selectedRows.length > 0) {
        this.$q.dialog({
          title: "Удаление",
          message: 'Вы точно хотите удалить ' + this.selectedRows.length + ' документ(ов)?',
          ok: {
            color: "negative",
          },
          cancel: {
            label: "Отмена",
            flat: true,
          },
          focus: 'cancel',
          persistent: true,
          seamless: true,
        }).onOk(async () => {
          let doctypeToDelete = []
          this.tableLoading = true;
          this.selectedRows.forEach((row) => {
            doctypeToDelete.push({
              "name": row.name,
              "doctype": "intDoc",
              "filepdf": row.filepdf,
            })
          })
          const promises = doctypeToDelete.map(deleteIntDoc)
          await Promise.all(promises)
            .then((results) => {
              console.log(results);
            })
            .catch((res) => {
              this.$q.notify({
                type: "negative",
                position: "top",
                message: res.statusText,
                caption: 'Code: ' + res.status
              })
            })
          this.refreshKniga();
        }).onCancel(() => {
          console.log('cancel')
        })
      }
    },
    btnUploadClick() {
      this.modalUploadFile = true;
    },

    async onOKClick() {
      this.isUploading = true;
      let models = { "project": this.projectsStore.activeProject.name, "section": this.currentSection }
      const promisesUpload = this.files.map((files) => AddFiles(models, files))
      await Promise.all(promisesUpload)
        .catch((res) => {
          this.$q.notify({
            type: "negative",
            position: "top",
            message: res.statusText,
            caption: 'Code: ' + res.status
          })
        })
      this.refreshKniga();
      this.isUploading = false;
      this.modalUploadFile = false;
    },

    // moved to watch()

    // selectedRowActions(data) {
    //   if (data.length > 0) {
    //     this.btnMoveFilesDisable = false;
    //     this.btnDeleteFilesDisable = false;
    //   } else {
    //     this.btnMoveFilesDisable = true;
    //     this.btnDeleteFilesDisable = true;
    //   }
    // },

    refreshKniga() {
      this.selectedRows = [];
      this.openSection(this.selectedTreeNode);
    },
    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      if (this.files) this.files = null;
      if (this.fileName) this.fileName = null;
    },
    submitHandler() {
      console.log('submitted...')
      setTimeout(() => {
        this.$forceUpdate()

      }, 200)
    }
  },
  watch: {
    'projectsStore.activeProject.name'(newValue) {
      this.refreshKniga()
    },

    'selectedRows'(newValue) {
      if (newValue.length > 0) {
        this.btnDeleteFilesDisable = false;
      } else {
        this.btnDeleteFilesDisable = true;
      }
    }
  },
  computed: {
    ...mapStores(useProjectStore),
  },
};
</script>

<style scoped>
:deep() .q-tree__node--selected {
  background-color: white;
}
</style>