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
          <div class="flex items-center gap-2 font-semibold">
            <Dialog>
              <DialogTrigger as-child>
                <Button class="flex items-center text-foreground text-md" variant="link"
                  ><Plus class="text-sm" />Add week
                </Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle class="text-center"> Add week</DialogTitle>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                  <div class="flex items-center gap-4">
                    <Label for="name" class="text-right"> Title: </Label>
                    <Input id="name" default-value="" class="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit"> <Plus class="text-sm" /> <span>Add</span> </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
import CourseModule from '@/components/course_modules/faculty/CourseModuleFaculty.vue'
import { RouterView } from 'vue-router'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<style scoped></style>
