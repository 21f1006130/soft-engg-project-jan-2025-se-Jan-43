import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCourseModuleStore = defineStore('course-module-store', () => {
  const isModuleLoading = ref(false)

  return { isModuleLoading }
})
