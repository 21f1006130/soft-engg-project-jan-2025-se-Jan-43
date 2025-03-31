<template>
  <RouterLink class="group" :to="props.href">
    <Card class="border-0 max-w-[600px] rounded-md">
      <CardHeader
        class="min-h-56 bg-cover rounded-t-md"
        style="background-image: url('/CourseThumbnail.svg')"
      >
        <CardTitle class="font-light tracking-normal text-primary-foreground">{{
          props.title
        }}</CardTitle>
      </CardHeader>
      <!-- <CardContent> </CardContent> -->
      <CardFooter class="border rounded-b-md flex justify-end items-center px-6 py-2">
        <span
          class="text-[#A0332D] group-hover:text-[#D6A64F] tracking-tight text-md font-semibold"
          variant="link"
          >Go to course page ></span
        >
      </CardFooter>
    </Card>
  </RouterLink>
</template>

<script setup lang="ts">
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  title: string
  href: string
}>()
</script>

<style scoped></style>
