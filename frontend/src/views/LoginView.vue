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
      <Tabs :default-value="currentSelection">
        <TabsList class="grid w-full shadow border grid-cols-1 min-[300px]:grid-cols-3 mb-2">
          <RouterLink tabindex="-1" class="block" draggable="false" to="/login/student">
            <TabsTrigger class="w-full py-2" value="student">Student</TabsTrigger>
          </RouterLink>
          <RouterLink tabindex="-1" class="block" draggable="false" to="/login/faculty">
            <TabsTrigger class="w-full py-2" value="faculty">Faculty</TabsTrigger>
          </RouterLink>
          <RouterLink tabindex="-1" class="block" draggable="false" to="/login/admin">
            <TabsTrigger class="w-full py-2" value="admin">Admin</TabsTrigger>
          </RouterLink>
        </TabsList>
        <div class="router_wrapper">
          <RouterView class="shadow" />
        </div>
      </Tabs>
    </main>
  </ContainerComponent>
</template>
