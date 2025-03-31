<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RouterView, RouterLink } from 'vue-router'
import router from '@/router'
import { configure } from 'vee-validate'
import ContainerComponent from '@/components/utils/ContainerComponent.vue'
// Sets validation modes for vee-validate useform context
configure({
  validateOnBlur: false, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
})
const currentSelection = router.currentRoute.value.path.split('/')[2]
</script>

<template>
  <ContainerComponent class="px-6">
    <div class="logo pt-32 flex items-center justify-center">
      <img
        class="aspect-auto max-h-16 min-w-32"
        src="/IITM-Logo.svg"
        alt="IIT Madras Online Degree"
      />
    </div>

    <main class="mt-12 mx-auto max-w-[400px]">
      <div class="router_wrapper">
        <RouterView class="shadow" />
      </div>
    </main>
  </ContainerComponent>
</template>
