<template>
  <q-dialog v-model="layout" persistent>
    <q-layout view="lhh LpR lff" container style="height: 500px" class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>New Issue</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" @click="dialogClose(divid)" />
        </q-toolbar>
      </q-header>

      <q-footer class="text-white bg-black">
        <q-toolbar inset> </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page padding>
          <q-form action="https://some-url.com" method="post" @submit.prevent="onSubmit">
            <div class="q-gutter-y-md column">
              <q-input v-model="subject" outlined :dense="dense" label="Заголовок" stack-label
                :rules="[(val) => !!val || 'Обязательное поле']" />
              <q-input v-model="description" outlined :dense="dense" type="textarea" label="Описание" stack-label
                :rules="[(val) => !!val || 'Обязательное поле']" />
              <q-select v-model="selectedType" filled emit-value :dense="dense" :options-dense="dense"
                :options="issueTypes" option-label="displayname" option-value="displayname" label="Тип замечания"
                stack-label>
              </q-select>
            </div>
            <!-- ... -->
            <div class="q-pt-md q-gutter-x-sm">
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn label="Cancel" v-close-popup @click="dialogClose(divid)" color="grey-4" text-color="black" />
            </div>
          </q-form>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script>
import { ref, computed } from "vue";
import api from "../../services/api";

export default {
  setup() {
    const moreContent = ref(true);
    const subject = ref("");
    const description = ref("");
    const issueTypes = [];

    return {
      layout: ref(false),
      moreContent,
      contentSize: computed(() => (moreContent.value ? 150 : 5)),
      //message: '',
      dense: ref(true),
      subject: ref(null),
      description: ref(null),
      issueTypes: [],
      selectedType: ref(null),
    };
  },
  mounted() {
    emitter.on("createIssue", (e) => {
      this.layout = true;
      console.log("createIssue", e);
      this.divid = e["divid"];
      this.hiddenData = e;
      //this.saveIssue()
    });

    api.get('resource/intIssueType?fields=["*"]').then(
      (res) => (this.issueTypes = [...res.data.data])
    );
  },
  unmounted() {
    emitter.all.clear();
  },
  methods: {
    dialogClose(divid) {
      console.log(divid);
      document.getElementById(divid).remove();
    },
    onSubmit(evt) {
      var postData = {
        subject: this.subject,
        description: this.description,
        selectedType: this.issueTypes.filter(x => x.displayname === this.selectedType)[0].name,
        pdfcoords: this.hiddenData["data-3DData"],
        pdfcamera: this.hiddenData["data-viewstate"],
        pdfpage: this.hiddenData["data-pdfpage"],
        filelink: this.hiddenData["file_id"],
        project: "a9939820dd-Врубеля 4"
      };
      //console.log('text1:', this.subject)
      //console.log('text2:', this.description)
      this.subject = null;
      this.description = null;
      this.selectedType = null;


      console.log("to POST:", postData);
      api.post(
        "resource/intIssue",
        JSON.stringify({
          title: postData.subject,
          description: postData.description,
          // workflow_state: "Draft",
          // owner: this.$root.$auth.cookie.user_id, # not needed
          type: postData.selectedType,
          pdfcoords: postData.pdfcoords,
          pdfpage: postData.pdfpage,
          pdfcamera: postData.pdfcamera,
          filelink: postData.filelink,
          project: postData.project
        })
      ).then((res) => {
        if (res.status === 200) {
          //this.message = "Успешно добавлено";
          this.subject = null;
          this.description = null;
          this.selectedType = null;
          this.emitter.emit("issue-added");
        }
      });

      this.layout = false;
      //evt.target.submit()
    },
  },
};
</script>