<template>
  <!-- {{ title }} -->
  <Accordion type="single" class="w-full" collapsible default-value="About">
    <AccordionItem value="About">
      <AccordionTrigger>
        <span class="flex items-center gap-2"
          ><Circle stroke-width="3px" height="10" width="10" />Course Introduction</span
        >
      </AccordionTrigger>
      <AccordionContent class="divide-y">
        <RouterLink
          to="/dashboard/student/course-se/about"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ms-2"
        >
          <Circle stroke-width="3px" height="9" width="9" />About the course
        </RouterLink>
        <RouterLink
          to="/dashboard/student/course-se/about"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ms-2"
        >
          <Circle stroke-width="3px" height="9" width="9" />General Instructions
        </RouterLink>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem v-for="week in 10" :key="week" :value="`Week ${week}`">
      <AccordionTrigger>
        <span class="flex items-center gap-2"
          ><Circle stroke-width="3px" height="10" width="10" />Week {{ week }}</span
        >
      </AccordionTrigger>
      <AccordionContent class="divide-y">
        <RouterLink
          to="/dashboard/student/course-se/lecture"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ms-2"
          v-for="lecture in 10"
          :key="lecture"
        >
          <Circle stroke-width="3px" height="9" width="9" />Lecture {{ lecture }}
        </RouterLink>
        <RouterLink
          to="/dashboard/student/course-se/assignment"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ms-2"
        >
          <Circle stroke-width="3px" height="9" width="9" />Practice Assignment
        </RouterLink>
        <RouterLink
          to="/dashboard/student/course-se/assignment"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ms-2"
        >
          <Circle stroke-width="3px" height="9" width="9" />Graded Assignment
        </RouterLink>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
import { Circle } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
// const props = defineProps<{
//   title: string
//   href: string
// }>()

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
</script>

<style scoped></style>
