<template>
  <div class="px-6">
    <Skeleton class="h-7 w-[11ch] text-3xl my-6 bg-gray-300" />
    <div class="space-y-4">
      <Skeleton v-for="idx in 7" :key="idx" class="h-40 my-6 w-full bg-gray-300" />
      <Skeleton class="h-10 w-[8ch] text-3xl my-6 bg-gray-300" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<style scoped></style>
