<template>
  <div class="issue-layout">
    <button @click.prevent="$router.back()"
      class="flex items-center mt-10 font-semibold hover:underline">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15 19l-7-7 7-7" />
      </svg>
      <span class>All Issues</span>
    </button>

    <q-card class="mt-6 my-card" flat bordered>

      <q-card-section class="q-pt-xs">
        <q-card-section horizontal class="flex justify-between">
          <q-card-section>
            <div class="mt-3 text-gray-500">Тип замечания: {{ issue.typename }}
            </div>
            <div class="text-gray-500 ">Создано: {{ issue.owner }}
              {{ issue.creation }}
              ({{ humansReadableDate }})</div>
          </q-card-section>
          <q-card-section class="flex items-center justify-end space-x-4">
            <div
              class="px-4 py-2 text-sm font-bold text-center uppercase rounded-full h-9 w-44"
              :class="get_class">
              {{ issue.workflow_state }}
            </div>

          </q-card-section>
        </q-card-section>

        <div class="text-h5 q-mt-sm q-mb-xs">{{ issue.title }}</div>
        <div class="text-small text-grey-700">
          {{ issue.description }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section v-if="attachments.length">
        <div class="my-3 text-gray-500">Прикрепленные изображения</div>
        <div class="items-start q-gutter-sm row">
          <q-img v-for="item in attachments" :key="item.name"
            :src="'http://vm-srv-bimbom' + item.file_url" fit="scale-down"
            spinner-color="red" loading="lazy"
            style="height: 140px; max-width: 150px" class="shadow-1"
            @click="() => showImg('http://vm-srv-bimbom' + item.file_url)">
          </q-img>
        </div>
      </q-card-section>
      <q-separator v-if="attachments.length" />

      <q-card-section v-if="haveAdditionalInfo">
        <div class="my-3 text-gray-500">Дополнительная информация</div>
        <div v-if="issue.customassign && issue.customassign.length > 0"
          class="mt-3 card__custom-assign">
          <p class="line-clamp-3">Подрядчик: {{ issue.customassingname }}</p>
        </div>
        <div v-if="issue.osklocation && issue.osklocation.length > 0"
          class="mt-3 card__custom-assign">
          <p class="line-clamp-3">
            Этаж/Оси/Помещение: {{ issue.osklocation }}
          </p>
        </div>
        <div v-if="issue.osksubsystem && issue.osksubsystem.length > 0"
          class="mt-3 card__custom-assign">
          <p class="line-clamp-3">Подсистема: {{ issue.osksubsystemname }}</p>
        </div>
        <div v-if="issue.oskequipment && issue.oskequipment.length > 0"
          class="mt-3 card__custom-assign">
          <p class="line-clamp-3">
            Инж. оборудование/Документация: {{ issue.oskequipment }}
          </p>
        </div>
      </q-card-section>
      <q-separator v-if="haveAdditionalInfo" />

      <q-card-section class="flex items-center justify-center text-center"
        v-if="linkedFile">
        <q-btn flat icon="attachment" @click="openFile">
          <span class="px-2">{{ linkedFile.displayname }}</span>
        </q-btn>

      </q-card-section>
      <q-separator v-if="linkedFile" />

      <q-card-actions horizontal class="flex justify-between">
        <q-card-section class="flex space-x-5">
          <q-btn v-for="action in actions" :key="action" flat
            @click.prevent="actionClick(action.action)">
            {{ action.action }}
          </q-btn>
        </q-card-section>
        <q-card-section class="flex space-x-5">
          <q-btn flat round icon="edit" @click="openEditIssueModal" />
          <q-btn flat round :loading="pdfloading" @click="generatePdf"
            icon="print" />
        </q-card-section>
      </q-card-actions>
    </q-card>

    <!-- Model Edit Issue -->
    <edit-issue :modalEditIssue="modalEditIssue" @hide="modalEditIssue = false"
      @ok="onIssueEdited" :issue="issue" :title="issue.title" />

    <comments-list :comments="comments" />
    <comment-form @add-comment="addComment" />
    <vue-easy-lightbox :imgs="lightbox_imgs" :visible="lightbox_visible"
      @hide="lightbox_hide">
    </vue-easy-lightbox>
  </div>
</template>


<script lang="ts">
import api from "../services/api";
import { toRaw, defineComponent } from "vue";
import MainNavbar from "../components/Navbar/MainNavbar.vue";
import CommentForm from "../components/Forms/CommentForm.vue";
import CommentsList from "../components/Comments/CommentsList.vue";
import { GetBGClass } from "../services/isssuecoloring";
import { loadDetails, AddComment, AddAttachment } from "../services/frappeapi";
import EditIssue from "../components/Forms/EditIssue.vue";
import { useUserStore } from "../store/UserStore";
import { mapStores } from "pinia";
import { useProjectStore } from "../store/ProjectStore";
import VueEasyLightbox from "vue-easy-lightbox";
import intIssueService from "../services/intIssueService";
import { Attachment, Doc } from "../types/intIssue";
import moment from "moment";
import "moment/dist/locale/ru";

export default defineComponent({
  components: {
    MainNavbar,
    CommentForm,
    CommentsList,
    EditIssue,
    VueEasyLightbox,
  },
  data() {
    return {
      issue: {} as Doc,
      showMenu: false,
      actions: [],
      windowWidth: 200,
      linkedFile: {} as any,
      comments: [],
      attachments: [] as Attachment[],
      modalEditIssue: false,
      typename: "",
      pdfloading: false,
      lightbox_visible: false,
      lightbox_imgs: null,
    };
  },

  mounted() {
    this.fetchData();
    this.windowWidth = window.innerHeight + 1;
    moment.locale('ru')
  },

  methods: {
    generatePdf() {
      let postData = {
        issue: toRaw(this.issue),
        attachments: toRaw(this.attachments),
        project: toRaw(this.projectsStore.activeProject.displayname),
      };
      console.log(postData);
      const pdfdownload = async () => {
        this.pdfloading = true;
        const response = await fetch("/php/genpdf", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(postData),
        });
        if (!response.ok) {
          this.pdfloading = false;
          throw new Error("Some error happend");
        }

        const blob_data = await response.blob();
        const header_disposition = response.headers
          .get("Content-Disposition")
          .split("=")
          .pop();
        // do something with it
        return { blob_data, header_disposition };
      };

      pdfdownload().then(({ blob_data, header_disposition }) => {
        this.pdfloading = false;
        let filename = header_disposition.slice(1, -1);
        let a = document.createElement("a");
        let url = window.URL.createObjectURL(blob_data);
        a.href = url;
        a.download = filename;
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      });
    },

    menuToggle() {
      this.showMenu = !this.showMenu;
    },

    async fetchData() {
      const name: string = typeof this.$route.params.issuename == "string" ?
        this.$route.params.issuename : this.$route.params.issuename[0];

      const { docs, docinfo } = await intIssueService.showDetails(name)
      this.issue = docs[0]; // wtf?
      this.comments = docinfo.comments;
      this.comments.forEach((element) => {
        element.content = this.strip_tags(element.content);
      });
      this.attachments = docinfo.attachments;

      //check for associated intDoc
      if (this.issue.doc !== undefined) {
        api
          .get(`resource/intDoc/${this.issue.doc}`)
          .then((res) => (this.linkedFile = res.data.data))
          .catch(() => (this.linkedFile = null));
      } else {
        this.linkedFile = null;
      }

      api
        .get(`resource/intIssueType/${this.issue.type}`)
        .then((res) => (this.typename = res.data.data.displayname));

      //check for accessibly workflow actions
      api
        .get(
          `method/frappe.model.workflow.get_transitions?doc={"name":"${name}","doctype":"intIssue"}`
        )
        .then((res) => (this.actions = res.data.message))
        .catch(() => (this.actions = null));
    },

    actionClick(action) {
      api
        .post("method/frappe.model.workflow.apply_workflow", {
          doc: this.issue,
          action: action,
        })
        .then(() => {
          this.fetchData();
          this.$forceUpdate();
        });
    },

    strip_tags(str, allow = '') {
      // making sure the allow arg is a string containing only tags in lowercase ()
      allow = (
        ((allow || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []
      ).join("");

      var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
      var commentsAndPhpTags = /|<\?(?:php)?[\s\S]*?\?>/gi;
      return str
        .replace(commentsAndPhpTags, "")
        .replace(tags, function ($0, $1) {
          return allow.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : "";
        });
    },

    async openFile() {
      const intDoc = await api.get(
        `resource/intDoc/${this.issue.doc}?fields=["*"]`
      );

      this.$router.push({
        name: "viewer",
        params: {
          doc: intDoc.data.data.name,
          file: intDoc.data.data.filepdf,
        },
      });
    },

    async addComment(content) {
      await AddComment(
        this.issue.name,
        content,
        this.userStore.user.email,
        this.userStore.user.given_name
      ).then(() => {
        setTimeout(() => {
          this.fetchData();
          this.$forceUpdate();
        }, 200);
      });
    },

    openEditIssueModal() {
      this.modalEditIssue = true;
    },

    onIssueEdited() {
      console.log("...refresh");
      this.modalEditIssue = false;
      this.fetchData();
      this.$forceUpdate();
    },
    showImg(url) {
      this.lightbox_imgs = url;
      this.disableScrolling();
      this.lightbox_visible = true;
    },
    lightbox_hide() {
      this.enableScrolling();
      this.lightbox_visible = false;
    },
    disableScrolling() {
      let x = window.scrollX;
      let y = window.scrollY;
      window.onscroll = function () {
        window.scrollTo(x, y);
      };
    },
    enableScrolling() {
      window.onscroll = function () { };
    },
  },
  computed: {
    haveAdditionalInfo() {
      return (this.issue.customassign && this.issue.customassign.length > 0) ||
        (this.issue.osklocation && this.issue.osklocation.length > 0) ||
        (this.issue.oskequipment && this.issue.oskequipment.length > 0) ||
        (this.issue.osksubsystem && this.issue.osksubsystem.length > 0)
    },
    humansReadableDate() {
      return moment(this.issue.creation).fromNow()
    },

    get_class() {
      return GetBGClass(this.issue.workflow_state);
    },
    isOverdue() {
      const day = 24 * 60 * 60 * 1000;
      if (Date.parse(this.issue.duedate) < Date.now() - day) {
        return "text-red-500";
      } else {
        return "text-gray-700";
      }
    },
    ...mapStores(useUserStore, useProjectStore),
  },
});
</script>

<style>
.issue-layout {
  width: 70%;
  margin: 0 auto;
}
</style>