<template>
  <div>
    <Dialog>
      <DialogTrigger as-child>
        <Button class="text-foreground px-0" variant="link"><Edit /> Edit </Button>
      </DialogTrigger>
      <DialogContent class="max-w-[60%] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
        <DialogHeader class="p-6 pb-0">
          <DialogTitle>Edit Course Description</DialogTitle>
          <DialogDescription> Make changes to the course description here. </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4 pt-0 px-6">
          <div class="grid gap-4 py-4">
            <div class="flex flex-col items-start gap-4">
              <Label for="title" class="text-right"> Title: </Label>
              <Input id="title" default-value="About the course" class="col-span-3" />
            </div>
            <div class="flex flex-col items-start gap-4">
              <Label for="description" class="text-right"> Description: </Label>
              <Textarea
                class="h-52"
                default-value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eveniet aperiam, veniam magni minima quidem molestiae atque placeat consequuntur in hic incidunt, vitae tenetur repellendus quod maiores, ex eum laboriosam quae? Dolores reiciendis voluptate cupiditate odit voluptas amet tempore non debitis voluptatibus optio et possimus, velit delectus, id facilis, labore quam aut. Quis minus, quo earum repellat iure, perferendis officiis perspiciatis possimus amet reiciendis id unde aliquid quasi dolore quod eligendi ipsam cumque itaque distinctio incidunt voluptates deserunt natus! Repudiandae iusto vitae molestiae sit quod veritatis quia nisi, reprehenderit explicabo corporis magni ipsa alias architecto voluptates! Quibusdam impedit animi rem. "
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
    <h1 class="text-2xl font-semibold">About the course</h1>
    <p class="mt-4 max-w-5xl">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eveniet aperiam, veniam
      magni minima quidem molestiae atque placeat consequuntur in hic incidunt, vitae tenetur
      repellendus quod maiores, ex eum laboriosam quae? Dolores reiciendis voluptate cupiditate odit
      voluptas amet tempore non debitis voluptatibus optio et possimus, velit delectus, id facilis,
      labore quam aut. Quis minus, quo earum repellat iure, perferendis officiis perspiciatis
      possimus amet reiciendis id unde aliquid quasi dolore quod eligendi ipsam cumque itaque
      distinctio incidunt voluptates deserunt natus! Repudiandae iusto vitae molestiae sit quod
      veritatis quia nisi, reprehenderit explicabo corporis magni ipsa alias architecto voluptates!
      Quibusdam impedit animi rem.
    </p>
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Textarea } from '@/components/ui/textarea'
</script>

<style scoped></style>
