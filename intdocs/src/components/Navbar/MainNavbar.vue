<template>
  <nav class="bg-white shadow">
    <div class="container px-6 mx-auto">
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-gray-700">
          <a class="text-2xl font-bold text-gray-800 transition-colors duration-200 transform lg:text-3xl hover:text-gray-700"
            href="#">
            IntDocs
          </a>
        </div>

        <q-tabs inline-label class="items-end text-gray-900 bg-white">
          <q-route-tab name="docs" label="Документы" to="/browser" />
          <q-route-tab name="issues" label="Замечания" to="/issues" />
          <q-route-tab name="reviews" label="Согласования" to="/reviews" />
          <q-btn-dropdown auto-close stretch flat label="Сервисы">
            <q-list>
              <q-item clickable href="http://osk.corp.local/">
                <q-item-section>Поэлементная приемка</q-item-section>
              </q-item>
              <q-item clickable
                href="https://rep.inteco.ru/powerbi/?id=ebf189df-62d4-4eb0-a6e8-08e3c3a87ce4">
                <q-item-section>Отчет о выполнении</q-item-section>
              </q-item>

              <q-item clickable
                href="https://rep.inteco.ru/powerbi/?id=7cc9783a-4f83-4e40-82df-9453783ea958">
                <q-item-section>Статистика по замечаниям</q-item-section>
              </q-item>
              <q-route-tab name="sandbox" label="Тест замечаний на модели"
                to="/sandbox" />


            </q-list>
          </q-btn-dropdown>
        </q-tabs>
        <div class="flex items-center mt-4 md:mt-0">
          <div class="text-gray-700 project">
            {{ activeProject.displayname }}
          </div>
          <div class="project-drop">
            <div class="px-4">
              <q-btn-dropdown color="primary" label="Сменить проект">
                <q-list>
                  <q-item v-for="project in projects" :key="project.name"
                    clickable v-close-popup @click="onItemClick(project.name)">
                    <q-item-section>
                      <q-item-label>{{ project.displayname }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>
          <button
            class="mx-4 text-gray-600 transition-colors duration-200 transform md:block hover:text-gray-700 focus:text-gray-700 focus:outline-none"
            aria-label="show notifications">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>

          <button type="button" class="flex items-center focus:outline-none"
            aria-label="toggle profile dropdown">
            <div
              class="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full ">
              <img src="
                  https://www.gravatar.com/avatar/default?s=250&d=mp" />
              class="object-cover w-full h-full" alt="avatar">
            </div>

            <h3 class="mx-2 text-sm font-medium text-gray-700">
              {{ user.name }}
            </h3>
          </button>
        </div>
      </div>







    </div>



  </nav>
</template>

<script lang="ts">
import { useUserStore } from "../../store/UserStore";
import { useProjectStore } from "../../store/ProjectStore";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const projectStore = useProjectStore();
    const { projects, activeProject } = storeToRefs(projectStore);

    userStore.fetchUser();
    projectStore.fetchProjects();

    const onItemClick = (name) => {
      console.log(name);
      projectStore.setActive(name);
    };

    const route = useRoute();

    const activeItem = computed(() => route.name);

    return {
      onItemClick,
      activeProject,
      projects,
      user,
      activeItem,
    };
  },
});
</script>

<style>
.fix-me {
  color: #757575 !important;
}
</style>