<template>
  <main>
    <ContainerComponent class="py-8 px-6">
      <h1 class="text-4xl font-bold tracking-tight">Current Courses</h1>
      <div
        class="current_courses_wrapper mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        <CourseCard title="Software Engineering" :href="dashboardPath + '/course-se/'" />
        <CourseCard title="Sample Course" :href="dashboardPath + '/#'" />
        <CourseCard title="Sample Course" :href="dashboardPath + '/#'" />
        <CourseCard title="Sample Course" :href="dashboardPath + '/#'" />
      </div>
    </ContainerComponent>
  </main>
</template>

<script setup lang="ts">
import router from '@/router'
const dashboardPath = '/dashboard/' + router.currentRoute.value.path.split('/')[2]
import ContainerComponent from '@/components/utils/ContainerComponent.vue'
import CourseCard from '@/components/utils/CourseCard.vue'
</script>
<style scoped></style>
