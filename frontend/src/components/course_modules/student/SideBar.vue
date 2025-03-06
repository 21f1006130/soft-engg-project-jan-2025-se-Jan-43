<template>
  <ContainerComponent>
    <!-- <SidebarProvider>
        <Sidebar>
          <SidebarHeader>Software Engineering</SidebarHeader>
          <SidebarContent> asdasd</SidebarContent>
        </Sidebar>
      </SidebarProvider> -->
    <div class="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]">
      <aside class="hidden border-r bg-muted/40 md:block">
        <div class="flex overflow-y-auto h-full max-h-[750px] flex-col gap-2">
          <div class="flex h-14 items-center border-b py-4 px-4 lg:h-[60px] lg:px-6">
            <div class="flex items-center gap-2 font-semibold">
              <span class="">Software Engineering</span>
            </div>
          </div>
          <div class="flex-1">
            <nav class="grid items-start px-2 text-md font-medium lg:px-4 divide-y">
              <CourseModule />
            </nav>
          </div>
        </div>
      </aside>
      <main class="p-8 bg-muted">
        <RouterView />
      </main>
    </div>
  </ContainerComponent>
</template>

<script setup lang="ts">
import ContainerComponent from '@/components/utils/ContainerComponent.vue'
import CourseModule from '@/components/course_modules/student/CourseModuleStudent.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
