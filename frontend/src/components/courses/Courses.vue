<template>
  <main>
    <ContainerComponent class="py-8 px-6">
      <h1 class="text-4xl font-bold tracking-tight">Current Courses</h1>
      <div
        class="current_courses_wrapper mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        <CourseCard
          v-for="course in courses"
          :title="course['title']"
          :href="dashboardPath + course['course_id']"
        />
      </div>
    </ContainerComponent>
  </main>
</template>

<script setup lang="ts">
import router from '@/router'
import ContainerComponent from '@/components/utils/ContainerComponent.vue'
import CourseCard from '@/components/utils/CourseCard.vue'
import { ref, onBeforeMount } from 'vue'
import { checkIsAuthenticated } from '@/lib/utils'
import { getStudentCourses } from '@/lib/api'

const courses = ref([])
const dashboardPath = '/dashboard/student/courses/'

onBeforeMount(() => {
  checkIsAuthenticated()
  getStudentCourses(courses, router)
})
</script>
<style scoped></style>
