<template>
  <div class="px-6">
    <Skeleton class="h-7 my-6 w-[10ch] bg-gray-300" />
    <Skeleton class="h-7 mb-10 w-[40ch] bg-gray-300" />
    <div class="space-y-4">
      <Skeleton class="h-4 w-[80ch] bg-gray-300" />
      <Skeleton class="h-4 w-[30ch] bg-gray-300" />
      <Skeleton class="h-4 w-[50ch] bg-gray-300" />
      <Skeleton class="h-4 w-[60ch] bg-gray-300" />
      <Skeleton class="h-4 w-[35ch] bg-gray-300" />
      <Skeleton class="h-4 w-[60ch] bg-gray-300" />
    </div>
    <Skeleton class="h-4 mt-10 w-[22ch] bg-gray-300" />
    <Skeleton class="h-[288px] mt-4 w-full bg-gray-300" />
    <Skeleton class="h-4 mt-6 w-[16ch] bg-gray-300" />
    <Skeleton class="h-10 mt-10 w-[16ch] bg-gray-300" />
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<style scoped></style>
