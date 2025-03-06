<template>
  <div class="max-h-[750px] overflow-y-auto">
    <h1 class="text-xl mb-4 font-semibold">Assignment</h1>
    <div class="space-y-4">
      <div v-for="n in 8" :key="n" class="p-6 bg-background">
        <p>
          Q{{ n }}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eum aliquam
          animi tempora iure laborum rem illo nemo in maxime, commodi mollitia cumque odio ratione
          facere dolorem quibusdam quam odit?
        </p>
        <Input
          class="border-0 border-b border-foreground rounded-none focus-visible:ring-0 active:ring-0"
          placeholder="Answer here"
        />
      </div>
    </div>
    <Button class="my-10 bg-foreground rounded-none" type="submit">Submit Answer</Button>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import Button from '@/components/ui/button/Button.vue'
</script>

<style scoped></style>
