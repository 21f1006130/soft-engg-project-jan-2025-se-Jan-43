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
      <CourseHeader />
    </SidebarProvider>
  </ContainerComponent>
</template>

<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Sidebar, SidebarInset } from '@/components/ui/sidebar'
import CourseHeader from '@/components/utils/CourseModulesHeader.vue'

import ContainerComponent from '@/components/utils/ContainerComponent.vue'
import CourseModules from '@/components/course_modules/student/CourseModuleStudent.vue'
</script>

<style scoped></style>
