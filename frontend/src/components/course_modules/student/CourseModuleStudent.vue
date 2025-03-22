<template>
  <h3 class="font-bold text-center py-4 flex gap-2">
    <span class="flex-grow">{{ courseData?.course_title }}</span>
    <SidebarTrigger class="hidden md:block ml-auto h-auto w-auto" />
  </h3>
  <Accordion type="single" collapsible v-model:model-value="activeAccordionValue">
    <!-- <AccordionItem value="About">
      <AccordionTrigger>
        <span class="flex items-center gap-2 ps-2">
          <Circle
            stroke-width="0px"
            fill="white"
            height="8"
            width="8"
            class="flex-shrink-0 me-2 outline outline-4 rounded-full outline-gray-300"
          />
          Course Introduction
        </span>
      </AccordionTrigger>
      <AccordionContent class="divide-y">
        <RouterLink
          :to="'/dashboard/student/courses/' + courseId + '/about'"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ms-2"
        >
          <Circle
            stroke-width="0px"
            fill="white"
            height="8px"
            width="8px"
            class="flex-shrink-0 ps-2 outline outline-4 rounded-full outline-gray-300"
          />About the course
        </RouterLink>
        <RouterLink
          :to="'/dashboard/student/courses/' + courseId + '/about'"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ms-2"
        >
          <Circle
            stroke-width="0px"
            fill="white"
            height="8px"
            width="8px"
            class="flex-shrink-0 ps-2 outline outline-4 rounded-full outline-gray-300"
          />General Instructions
        </RouterLink>
      </AccordionContent>
    </AccordionItem> -->
    <AccordionItem
      v-for="week in courseData?.weeks"
      :key="week.week_number"
      :value="`Week ${week.week_number}`"
    >
      <AccordionTrigger class="hover:no-underline">
        <span class="flex items-center gap-2 ps-4 font-semibold"
          ><Circle
            stroke-width="0px"
            fill="white"
            height="8"
            width="8"
            class="flex-shrink-0 me-2 outline outline-4 rounded-full outline-gray-300"
          />Week {{ week['week_number'] }}</span
        >
      </AccordionTrigger>
      <AccordionContent class="divide-y">
        <RouterLink
          v-for="content in week.contents"
          :to="'/dashboard/student/courses/' + courseId + '/lecture/' + content.content_id"
          :key="content.content_id"
        >
          <div
            class="flex ps-4 items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary ms-2"
            :class="{
              'shadow-[-5px_0px_0px_rgb(218,165,32)]':
                activeLectureId === content.content_id.toString(),
            }"
          >
            <Circle
              stroke-width="0px"
              fill="white"
              height="8"
              width="8"
              class="flex-shrink-0 me-2 outline outline-4 rounded-full"
              :class="{
                'outline-[rgb(218,165,32)]': activeLectureId === content.content_id.toString(),
                'outline-gray-300': activeLectureId !== content.content_id.toString(),
              }"
            />
            <div>
              <p>{{ content['lecture_title'] }}</p>

              <p class="text-xs mt-2 opacity-80">Video</p>
            </div>
          </div>
        </RouterLink>

        <RouterLink
          :to="
            '/dashboard/student/courses/' +
            courseId +
            '/prog_assignment/' +
            progAssignments[week.week_number - 1].prog_assignment_id
          "
          v-if="courseId === 'CS1002'"
        >
          <div
            class="flex ps-4 items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary ms-2"
            :class="{
              'shadow-[-5px_0px_0px_rgb(218,165,32)]':
                activeProgAssignmentId ===
                progAssignments[week.week_number - 1].prog_assignment_id.toString(),
            }"
          >
            <Circle
              stroke-width="0px"
              fill="white"
              height="8"
              width="8"
              class="flex-shrink-0 me-2 outline outline-4 rounded-full"
              :class="{
                'outline-[rgb(218,165,32)]':
                  activeProgAssignmentId ===
                  progAssignments[week.week_number - 1].prog_assignment_id.toString(),
                'outline-gray-300':
                  activeProgAssignmentId !==
                  progAssignments[week.week_number - 1].prog_assignment_id.toString(),
              }"
            />
            <div>
              <p>GrPA</p>

              <p class="text-xs mt-2 opacity-80">Assignment</p>
            </div>
          </div>
        </RouterLink>

        <RouterLink
          v-if="assignments?.length !== 0"
          v-for="(assignment, index) in assignments[week.week_number - 1].assignments"
          :to="
            '/dashboard/student/courses/' +
            courseId +
            '/assignment' +
            '?week=' +
            week.week_number +
            '&id=' +
            (index + 1)
          "
          :key="assignment.assignment_id"
        >
          <div
            class="flex ps-4 items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary ms-2"
            :class="{
              'shadow-[-5px_0px_0px_rgb(218,165,32)]': isAssignmentActive(week),
            }"
          >
            <Circle
              stroke-width="0px"
              fill="white"
              height="8"
              width="8"
              class="flex-shrink-0 me-2 outline outline-4 rounded-full"
              :class="{
                'outline-[rgb(218,165,32)]': isAssignmentActive(week),
                'outline-gray-300': !isAssignmentActive(week),
              }"
            />
            <div>
              <p>GA</p>

              <p class="text-xs mt-2 opacity-80">Assignment</p>
            </div>
          </div>
        </RouterLink>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Circle } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'

import { onBeforeMount, ref, watch } from 'vue'
import { checkIsAuthenticated } from '@/lib/utils'
import type { Assignments, CourseData, ProgAssignment } from '@/lib/types'
import { getCourseAssignments, getCourseLectures, getCourseProgAssignments } from '@/lib/student'
import { SidebarTrigger } from '@/components/ui/sidebar'

const route = useRoute()
const courseId = route.params.course_id
const lectureId = route.params.lecture_id
const assignmentId = route.params.assignment_id
const progAssignmentId = route.params.prog_assignment_id

const activeAccordionValue = ref('')
const activeLectureId = ref(lectureId)
const activeAssignmentId = ref(assignmentId)
const activeProgAssignmentId = ref(progAssignmentId)
const activeParams = ref(route.query)

const assignments = ref<Assignments>([])
const courseData = ref<CourseData>()
const progAssignments = ref<ProgAssignment[] | []>([])

function isAssignmentActive(week: any) {
  return (
    activeParams.value.week &&
    activeParams.value.id &&
    parseInt(activeParams.value.week as string) == week.week_number
  )
}

watch(
  () => route.query,
  (newQuery, oldQuery) => {
    activeParams.value = newQuery
  },
)

watch(
  () => route.params.lecture_id,
  (newId, oldId) => {
    activeLectureId.value = newId
  },
)
watch(
  () => route.params.assignment_id,
  (newId, oldId) => {
    activeAssignmentId.value = newId
  },
)
watch(
  () => route.params.prog_assignment_id,
  (newId, oldId) => {
    activeProgAssignmentId.value = newId
  },
)
onBeforeMount(() => {
  checkIsAuthenticated()
  getCourseLectures(courseData, courseId, lectureId, activeAccordionValue)
  getCourseAssignments(assignments, courseId)
  getCourseProgAssignments(progAssignments, courseId, progAssignmentId, activeAccordionValue)

  if (activeParams.value.week && activeParams.value.id) {
    activeAccordionValue.value = `Week ${activeParams.value.week as string}`
  }
})
</script>

<style scoped></style>
