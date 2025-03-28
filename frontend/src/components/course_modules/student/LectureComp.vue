<template>
  <div class="px-6 py-6">
    <h1 class="text-2xl font-semibold mb-4">{{ lectureData?.lecture_title }}</h1>
    <iframe
      @load="
        () => {
          store.isModuleLoading = false
        }
      "
      style="aspect-ratio: 16/9; width: 100%; max-width: 800px"
      :src="videoURL"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, ref, watch } from 'vue'
import { checkIsAuthenticated } from '@/lib/utils'
import type { LectureData } from '@/lib/types'
import { getLecture } from '@/lib/student'
import { useCourseModuleStore } from '@/stores/store'

const route = useRoute()
const courseId = route.params.course_id
const lectureId = route.params.lecture_id

const videoURL = ref('')
const lectureData = ref<LectureData>()
const store = useCourseModuleStore()
watch(
  () => route.params.lecture_id,
  (newId, oldId) => {
    checkIsAuthenticated()
    store.isModuleLoading = true
    getLecture(lectureData, videoURL, courseId, newId).catch(() => {
      store.isModuleLoading = false
    })
  },
)

onBeforeMount(() => {
  checkIsAuthenticated()
  store.isModuleLoading = true
  getLecture(lectureData, videoURL, courseId, lectureId).catch(() => {
    store.isModuleLoading = false
  })
})
</script>

<style scoped></style>
