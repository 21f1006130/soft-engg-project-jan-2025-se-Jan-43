<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <div class="wrapper leading-7 min-h-screen bg-background">
    <RouterView />
  </div>
  <Toaster />
</template>

<style scoped></style>
