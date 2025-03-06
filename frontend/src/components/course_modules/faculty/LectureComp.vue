<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="text-foreground px-0" variant="link"><Edit /> Edit </Button>
    </DialogTrigger>
    <DialogContent class="max-w-[60%] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>Edit Lecture Information</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4 pt-0 px-6">
        <div class="grid gap-4 py-4">
          <div class="flex flex-col items-start gap-4">
            <Label for="title" class="text-right"> Title: </Label>
            <Input id="title" default-value="Lecture 1" class="col-span-3" />
          </div>
          <div class="flex flex-col items-start gap-4">
            <Label for="title" class="text-right"> Video URL: </Label>
            <Input
              id="title"
              default-value="https://www.youtube.com/embed/hKm_rh1RTJQ?si=nSG4C70EQelPuY8F"
              class="col-span-3"
            />
          </div>
          <div class="flex flex-col items-start gap-4">
            <Label for="description" class="text-right"> Description: </Label>
            <Textarea
              default-value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque molestias quaerat excepturi magnam iste? Placeat nobis culpa officiis quibusdam dignissimos vero ullam eius, mollitia dicta molestiae dolores! Animi, dignissimos repudiandae. "
              id="description"
            ></Textarea>
          </div>
        </div>
      </div>
      <DialogFooter class="p-6 pt-0">
        <Button type="submit"> Save changes </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  <h1 class="text-2xl font-semibold mb-4">Lecture 1</h1>
  <iframe
    width="1200"
    height="600"
    src="https://www.youtube.com/embed/hKm_rh1RTJQ?si=nSG4C70EQelPuY8F"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
  <div class="video-description mt-4 max-w-[1200px]">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque molestias quaerat excepturi
    magnam iste? Placeat nobis culpa officiis quibusdam dignissimos vero ullam eius, mollitia dicta
    molestiae dolores! Animi, dignissimos repudiandae.
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Textarea } from '@/components/ui/textarea'
</script>

<style scoped></style>
