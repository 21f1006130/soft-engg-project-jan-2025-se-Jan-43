<template>
  <div v-html="props.md"></div>
</template>

<script setup lang="ts">
const props = defineProps(['md'])
</script>

<style scoped></style>
