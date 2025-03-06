<template>
  <div class="max-h-[750px] overflow-y-auto">
    <h1 class="text-xl mb-4 font-semibold">Assignment</h1>
    <div class="space-y-4">
      <div v-for="n in 8" :key="n" class="p-6 bg-background">
        <Dialog>
          <DialogTrigger as-child>
            <Button class="text-foreground px-0" variant="link"><Edit /> Edit </Button>
          </DialogTrigger>
          <DialogContent class="max-w-[60%] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
            <DialogHeader class="p-6 pb-0">
              <DialogTitle>Edit Question</DialogTitle>
            </DialogHeader>
            <div class="grid gap-4 py-4 pt-0 px-6">
              <div class="grid gap-4 py-4">
                <div class="flex flex-col items-start gap-4">
                  <Label for="question" class="text-right"> Question: </Label>
                  <Input
                    id="question"
                    default-value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eum aliquam animi tempora iure laborum rem illo nemo in maxime, commodi mollitia cumque odio ratione facere dolorem quibusdam quam odit? "
                    class="col-span-3"
                  />
                </div>
                <div class="flex flex-col items-start gap-4">
                  <Label for="answer" class="text-right"> Answer </Label>
                  <Input id="answer" default-value="xxxxx" class="col-span-3" />
                </div>
              </div>
            </div>
            <DialogFooter class="p-6 pt-0">
              <Button type="submit"> Save changes </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <p>
          Q{{ n }}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eum aliquam
          animi tempora iure laborum rem illo nemo in maxime, commodi mollitia cumque odio ratione
          facere dolorem quibusdam quam odit?
        </p>
        <!-- <Input
          class="border-0 border-b border-foreground rounded-none focus-visible:ring-0 active:ring-0"
          placeholder="Answer here"
        /> -->
        <p class="mt-2">Answer: xxxxx</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
</script>

<style scoped></style>
