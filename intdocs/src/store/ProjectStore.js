import { defineStore } from "pinia";
import { setCookie, getCookie } from "../services/cookieManager";
import intProjectService from "../services/intProjectService";

export const useProjectStore = defineStore('projects', {
  state: () => {
    return {
      projects: []
    }

  },
  actions: {
    async fetchProjects() {
      const projects = (await intProjectService.getAll()).data.data

      const projectsWithStatus = projects
        .map(
          x => Object.assign(x, { active: false })
        )

      this.projects = projectsWithStatus
      const project = getCookie('activeProject')
      if (project) {
        this.setActive(project)
      } else {
        this.setActive('init')
      }
    },
    setActive(name) {
      if (name === 'init') {
        this.projects[0].active = true
        setCookie('activeProject', this.projects[0].name)
        window.location.replace('/')
        return
      }
      setCookie('activeProject', name)
      this.projects = this.projects.map(x => {
        if (x.name === name) {
          x.active = true
          return x
        }
        else {
          x.active = false
          return x
        }

      })

    }

  },
  getters: {
    activeProject: (state) => {
      if (state.projects.length > 0) {
        return state.projects.find(project => project.active === true)
      }
      return 'Loading...'
    }
  }

})