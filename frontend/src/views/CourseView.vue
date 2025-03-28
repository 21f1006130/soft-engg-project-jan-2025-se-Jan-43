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
              <CourseModules />
            </nav>
          </aside>
        </Sidebar>
      </SidebarInset>
      <div class="bg-muted w-full">
        <header class="bg-background sticky top-0">
          <CourseHeader />
        </header>

        <main>
          <RouterView class="px-8" />
          <!-- <div v-show="store.isModuleLoading">...loading</div>
          <RouterView v-show="!store.isModuleLoading" class="px-8" /> -->
        </main>
      </div>
    </SidebarProvider>
    <ChatBot />
  </ContainerComponent>
</template>

<script setup lang="ts">
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarInset } from '@/components/ui/sidebar'
import CourseHeader from '@/components/utils/CourseHeader.vue'
import { RouterView } from 'vue-router'
import ContainerComponent from '@/components/utils/ContainerComponent.vue'
import CourseModules from '@/components/course_modules/student/CourseModuleStudent.vue'
import ChatBot from '@/components/utils/ChatBot.vue'
import { useCourseModuleStore } from '@/stores/store'

const store = useCourseModuleStore()
</script>

<style scoped></style>
