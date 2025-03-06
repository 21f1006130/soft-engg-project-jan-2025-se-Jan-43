<template>
  <RouterLink class="group" :to="props.href">
    <Card
      class="border shadow max-w-[600px] rounded-md"
      style="background-image: url('/CourseThumbnail.svg')"
    >
      <CardContent class="min-h-56 bg-cover rounded-t-md grid items-center">
        <h3 class="font-bold tracking-normal text-2xl text-center text-primary-foreground">
          {{ props.title }}
        </h3>
      </CardContent>
      <!-- <CardContent> </CardContent> -->
    </Card>
  </RouterLink>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  title: string
  href: string
}>()
</script>

<style scoped></style>
