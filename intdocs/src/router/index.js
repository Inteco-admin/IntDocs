import { createRouter, createWebHistory } from "vue-router";
import IssueIndex from "../views/IssueIndex.vue";
import IssueShow from "../views/IssueShow.vue";
import ReviewIndex from "../views/ReviewIndex.vue";
import ReviewShow from "../views/ReviewShow.vue";
import ViewerPage from "../views/ViewerPage.vue"
// import ViewerModel from "../views/ViewerModel.vue"
import FilesView from "../views/FilesView.vue"
import Sandbox from "../views/Sandbox.vue"

const routes = [
  {
    path: "/",
    redirect: '/issues'
  },
  {
    path: "/issues/:issuename",
    name: "issue-show",
    component: IssueShow,
  },
  {
    path: "/issues",
    name: "issue-index",
    component: IssueIndex,
  },
  {
    path: "/reviews",
    name: "review-index",
    component: ReviewIndex,
  },
  {
    path: "/reviews/:reviewname",
    name: "review-show",
    component: ReviewShow,
  },
  {
    path: "/viewer/?doc=:doc&file=:file",
    name: "viewer",
    component: ViewerPage,
  },
  {
    path: "/browser",
    name: "browser",
    component: FilesView,
  },
  {
    path: "/sandbox",
    name: "sandbox",
    component: Sandbox,
  },

  // ...authRoutes,
];

const router = createRouter({
  base: "/",
  history: createWebHistory(),
  routes,
});

export default router;
