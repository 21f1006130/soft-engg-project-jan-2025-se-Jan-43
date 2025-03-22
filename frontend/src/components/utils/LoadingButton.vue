<template>
  <Button class="py-5" type="submit">
    <LoaderCircle class="animate-spin" v-if="props.isLoading" />
    <slot></slot>
  </Button>
</template>

<script setup lang="ts">
import { Button } from '../ui/button'
import { LoaderCircle } from 'lucide-vue-next'
const props = defineProps({
  isLoading: Boolean,
})
</script>

<style scoped></style>
