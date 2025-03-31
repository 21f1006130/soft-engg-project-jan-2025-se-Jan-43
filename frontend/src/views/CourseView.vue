<template>
  <ContainerComponent class="relative">
    <SidebarProvider style="--sidebar-width: 25rem; --sidebar-width-mobile: 25rem">
      <SidebarInset class="hidden md:block bg-muted border-r-2">
        <div class="px-2 py-2 sticky top-0">
          <SidebarTrigger class="h-auto w-auto my-4" />
        </div>

        <Sidebar>
          <aside class="border-r bg-muted h-full overflow-y-auto">
            <nav class="grid items-start px-2 text-md font-medium lg:px-4 divide-y">
              <CourseModuleView />
            </nav>
          </aside>
        </Sidebar>
      </SidebarInset>
      <div class="bg-muted w-full">
        <header class="bg-background sticky top-0 z-50">
          <CourseHeader />
        </header>

        <main>
          <ProgAssignmentSkeleton
            v-if="store.isModuleLoading && path.includes('prog_assignment')"
          />
          <AssignmentSkeleton v-else-if="store.isModuleLoading && path.includes('assignment')" />
          <LectureSkeleton v-else-if="store.isModuleLoading && path.includes('lecture')" />
          <RouterView v-show="!store.isModuleLoading" class="px-6" />
        </main>
      </div>
    </SidebarProvider>
    <ChatBot />
  </ContainerComponent>
</template>

<script setup lang="ts">
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarInset } from '@/components/ui/sidebar'
import CourseHeader from '@/components/utils/CourseHeader.vue'
import AssignmentSkeleton from '@/components/skeletons/AssignmentSkeleton.vue'
import LectureSkeleton from '@/components/skeletons/LectureSkeleton.vue'
import ProgAssignmentSkeleton from '@/components/skeletons/ProgAssignmentSkeleton.vue'
import { RouterView, useRoute } from 'vue-router'
import ContainerComponent from '@/components/utils/ContainerComponent.vue'
import CourseModuleView from '@/views/CourseModuleView.vue'
import ChatBot from '@/components/utils/ChatBot.vue'
import { useCourseModuleStore } from '@/stores/store'
import { ref, watch } from 'vue'

const store = useCourseModuleStore()
const route = useRoute()
const path = ref(route.fullPath)

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    path.value = newPath
  },
)
</script>

<style scoped></style>
