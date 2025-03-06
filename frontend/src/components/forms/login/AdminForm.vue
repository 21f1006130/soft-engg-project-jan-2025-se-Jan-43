<template>
  <Card>
    <form @submit="onSubmit" novalidate>
      <!-- <StudentForm> -->
      <CardHeader>
        <CardTitle>Admin Login</CardTitle>
        <CardDescription> Login with your admin email id. </CardDescription>
      </CardHeader>
      <CardContent class="space-y-2">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem class="mb-3">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input class="mt-0" type="text" placeholder="Email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Password" v-bind="componentField" />
            </FormControl>
            <FormMessage class="mt-10" />
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter>
        <Button class="py-5 w-full" type="submit"
          ><LoaderCircle class="animate-spin" v-if="isLoading" />Sign In</Button
        >
      </CardFooter>
      <!-- </StudentForm> -->
    </form>
  </Card>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import router from '@/router'
import { useForm } from 'vee-validate'
import * as z from 'zod'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-vue-next'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'

const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, 'Email should not be blank.').email('Invalid email address.'),
    password: z.string().min(1, 'Password should not be blank.'),
  }),
)

const AdminForm = useForm({
  validationSchema: formSchema,
})
const isLoading = ref(false)
const onSubmit = AdminForm.handleSubmit((values) => {
  isLoading.value = true
  // const vnode = h('div', {
  //   innerHTML: `<div>Login Details: Email: ${values.email} Password: ${values.password}</div>`,
  // })
  setTimeout(() => {
    isLoading.value = false
    router.push('/dashboard/admin')
    // toast({
    //   title: 'Login Successful',
    //   description: vnode,
    // })
  }, 1000)
  console.log('Admin Form submitted!', values)
})
</script>

<style scoped></style>
