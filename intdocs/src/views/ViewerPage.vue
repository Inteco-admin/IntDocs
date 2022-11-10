<template>
  <!-- <q-layout view="hHh LpR fFf" container class="bg-grey-3"> -->
  <!-- <q-header class="bg-grey-3 text-grey-9" reveal height-hint="60">
      <q-toolbar class="GPLAY__toolbar text-grey-6">
        <q-btn flat dense round @click="toggleLeftDrawer" aria-label="Menu"
          icon="menu" class="q-mr-sm" />

        <div class="q-pr-lg" v-if="$q.screen.gt.xs">
          <h3>
            <router-link :to="{ name: 'browser' }">Home</router-link>
          </h3>
        </div>

        <q-space />

        <div class="items-center q-pl-md q-gutter-sm row no-wrap">
          <q-btn round dense flat color="grey-8" size="14px" icon="settings">
            <q-tooltip>Settings</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header> -->

  <q-drawer v-model="leftDrawerOpen" show-if-above bordered
    class="bg-grey-3 text-grey-7" :width="350">
    <div class="row full-height no-wrap">
      <div>
        <q-tabs v-model="panel" vertical class="text-teal">
          <q-tab name="pages" icon="description" label="Pages" />
          <q-tab name="issues" icon="warning_amber" label="Issues" />
        </q-tabs>
      </div>
      <div class="fit">
        <q-tab-panels v-model="panel" keep-alive :animated="false"
          class="shadow-1">
          <q-tab-panel name="pages" id="pdf-pages-wrapper">
            <!-- <div class="text-h6">Pages</div> -->
          </q-tab-panel>
          <q-tab-panel name="issues" class="q-gutter-y-sm">
            <div class="text-h6">Issues</div>

            <q-card transition="" class="shadow-1" bordered
              v-for="issue in issues" :key="issue" @click="showIssue(issue)">
              <q-card-section horizontal>
                <div class="text-overline q-px-sm"
                  :class="getClass(issue.workflow_state)">
                  {{ issue.name }}
                </div>
                <q-card-section class="full-width q-pa-none">
                  <q-card-section class="q-py-xs">
                    <div class="text-h5 q-mb-xs">
                      {{ issue.title }}
                    </div>
                    <div class="text-caption ellipsis-2-lines">
                      {{ issue.description }}
                    </div>
                    <div class="text-caption text-weight-bold">
                      by {{ issue.owner }}
                    </div>
                  </q-card-section>
                  <q-separator></q-separator>
                  <q-card-actions align="around">
                    <router-link :to="{
                      name: 'issue-show',
                      params: { issuename: issue.name },
                    }">
                      <q-btn flat round dense icon="article"></q-btn>
                    </router-link>
                    <q-btn v-if="issue.pdfcoords" flat round dense
                      icon="my_location" @click="showIssueClick(issue)">
                    </q-btn>
                  </q-card-actions>
                </q-card-section>
              </q-card-section>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-drawer>

  <!-- <q-page-container> -->
  <q-page>
    <div class="testView">
      <viewer-component v-if="file_type === 'pdf'" :file_id="file_id"
        :issues="issues" />
      <xkt-viewer v-if="file_type === 'xkt'" :issues="issues" />
    </div>

    <!-- Modal For Create Issue -->
    <create-issue :modalCreateIssue="modalCreateIssue"
      @hide="modalCreateIssue = false" />
  </q-page>
  <!-- </q-page-container>
  </q-layout> -->
</template>

<script>
import { ref } from "vue";
import viewerComponent from "../components/viewer/viewer.vue";
import XktViewer from "../components/XKTViewer/XktViewer.vue";
import api from "../services/api";
import CreateIssue from "../components/Forms/CreateIssue.vue";
import { GetBGClass as getClassColor } from "../services/isssuecoloring";

export default {
  name: "ViewerPage",
  components: {
    viewerComponent,
    XktViewer,
    CreateIssue,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const storage = ref(0.26);
    const issues = ref([]);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      leftDrawerOpen,
      storage,
      issues,
      toggleLeftDrawer,
      panel: ref("pages"),
      file_path: ref(""),
      file_type: ref(""),
      modalCreateIssue: ref(false),
    };
  },
  beforeUnmount() {
    this.emitter.off("createIssue", this.showCreateIssue);
    this.emitter.off("issue-added", this.fetchData);
  },

  mounted() {
    this.emitter.on("createIssue", this.showCreateIssue);
    this.emitter.on("issue-added", this.fetchData);

    this.fetchData();
  },
  computed: {
    file_id() {
      return this.$route.params.file;
    },
    doc() {
      return this.$route.params.doc;
    },
  },
  methods: {
    fetchData() {
      api
        .get(
          'resource/intIssue?fields=["*"]&filters=[["doc","=","' +
          this.doc +
          '"]]&order_by=creation%20desc'
        )
        .then((responce) => {
          console.log("[ViewerPage.vue] mounted data: ", responce.data.data);
          this.issues = [...responce.data.data];
        });
      api.get(`resource/File/${this.file_id}`).then((res) => {
        const filename = res.data.data.file_name;
        const filenameArray = filename.split(".");
        this.file_type = filenameArray[filenameArray.length - 1];
        console.log("[ViewerPage.vue] mounted file_type: ", this.file_type);
      });
    },
    showCreateIssue() {
      this.modalCreateIssue = true;
    },
    getClass(state) {
      return getClassColor(state);
    },

    showIssue(issue) {
      this.emitter.emit("issue-show", issue);
    },
    showIssueClick(issue) {
      this.emitter.emit("issue-show-click", issue);
    },
  },
};
</script>

<style scoped>
/*:deep() .issue_Draft {
  @apply bg-draft;
  color: white;
}*/

:deep() .issue_Approved {
  background-color: rgb(74 222 128);
  color: white;
}

:deep() .issue_Submited {
  background-color: rgb(250 204 21);
  color: white;
}

:deep() .testView {
  width: 100%;
  height: 100%;
  position: absolute;
}

:deep() .viewer-ext-docbrowser-thumbnail {
  border: 1px solid black;
  background-color: #e8e8e8;
  margin: 6px auto;
  cursor: pointer;
  position: relative;
  text-align: center;
  text-align: -webkit-center;
}

:deep() .viewer-ext-docbrowser-thumbnail-label {
  background: #c7c7d4;
  color: #0a131c;
  position: absolute;
  width: 100%;
  bottom: 5px;
}

:deep() .viewer-ext-docbrowser-thumbnail:hover>div {
  display: none;
}

:deep() .viewer-ext-docbrowser-thumbnail.active>div {
  background: lightsalmon;
}

:deep() .viewer-ext-docbrowser-thumbnail.active {
  border-color: lightsalmon;
}

:deep() .q-tab__label {
  font-size: 10px !important;
}

:deep() .tabsDiv {
  width: 50px;
  height: 100%;
  border: 1px solid black;
}

:deep() .tabsContentDiv {
  width: 50px;
  height: 100%;
  border: 1px solid black;
}

:deep() .GPLAY__toolbar {
  height: 60px;
}

:deep() .GPLAY__logo {
  width: 183px;
  height: 39px;
}

:deep() .GPLAY__toolbar-input-container {
  min-width: 100px;
  width: 55%;
}

:deep() .GPLAY__toolbar-input-btn {
  border-radius: 0;
  max-width: 60px;
  width: 100%;
}

:deep() .GPLAY__drawer-link .q-item__section--avatar {
  margin: -8px 0 -8px -16px;
  padding: 8px 0 8px 16px;
}

:deep() .GPLAY__drawer-link .q-item__section--main {
  margin: -8px -16px -8px 16px;
  padding: 8px 16px 8px 2px;
  font-size: 18px;
  font-weight: 300;
}

:deep() .GPLAY__drawer-item {
  padding: 6px 12px 6px 23px;
}

:deep() .GPLAY__sticky {
  min-height: 49px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.GPLAY__sticky-help {
  border: 1px solid #ccc;
  padding-left: 8px;
  padding-right: 8px;
}

:deep() .GPLAY__sticky-settings {
  padding-left: 17px;
  padding-right: 17px;
  border: 1px solid #ccc;
}
</style>
