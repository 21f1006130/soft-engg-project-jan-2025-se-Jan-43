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
          to="/dashboard/faculty/course-se/about"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ms-2"
        >
          <Circle stroke-width="3px" height="9" width="9" />About the course
        </RouterLink>
        <RouterLink
          to="/dashboard/faculty/course-se/about"
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
        <Dialog>
          <DialogTrigger as-child>
            <Button class="flex items-center" variant="link"
              ><Plus class="text-sm me-1" />Add chapter
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle class="text-center"> Add new chapter</DialogTitle>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right"> Name </Label>
                <Input id="name" default-value="" class="col-span-3" />
              </div>
              <FormField v-slot="{ componentField }" name="chapter">
                <FormItem class="grid grid-cols-4 items-center gap-4">
                  <FormLabel class="text-right">Email</FormLabel>

                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger class="col-span-3">
                        <SelectValue placeholder="Select the type of chapter." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Lecture"> Lecture </SelectItem>
                        <SelectItem value="Assignment"> Assignment </SelectItem>
                        <SelectItem value="Other"> Other </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <DialogFooter>
              <Button type="submit"> <Plus class="text-sm" /> <span>Add</span> </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <RouterLink
          to="/dashboard/faculty/course-se/lecture"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ms-2"
          v-for="lecture in 10"
          :key="lecture"
        >
          <Circle stroke-width="3px" height="9" width="9" />Lecture {{ lecture }}
        </RouterLink>
        <RouterLink
          to="/dashboard/faculty/course-se/assignment"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ms-2"
        >
          <Circle stroke-width="3px" height="9" width="9" />Practice Assignment
        </RouterLink>
        <RouterLink
          to="/dashboard/faculty/course-se/assignment"
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

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
</script>

<style scoped></style>
