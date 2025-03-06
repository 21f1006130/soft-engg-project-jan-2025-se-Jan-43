<template>
  <Card>
    <form @submit="onSubmit" novalidate>
      <!-- <StudentForm> -->
      <CardHeader>
        <CardTitle>Student Login</CardTitle>
        <CardDescription> Login with your student email id. </CardDescription>
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
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter>
        <Button class="py-5 w-full" type="submit">
          <LoaderCircle class="animate-spin" v-if="isLoading" /> Sign In</Button
        >
      </CardFooter>
      <!-- </StudentForm> -->
    </form>
  </Card>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-vue-next'
// import { useToast } from '@/components/ui/toast/use-toast'
import router from '@/router'

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
// import { h } from 'vue'
const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, 'Email should not be blank.').email('Invalid email address.'),
    password: z.string().min(1, 'Password should not be blank.'),
  }),
)

const StudentForm = useForm({
  validationSchema: formSchema,
})

// const { toast } = useToast()
const onSubmit = StudentForm.handleSubmit((values) => {
  isLoading.value = true
  // const vnode = h('div', {
  //   innerHTML: `<div>Login Details: Email: ${values.email} Password: ${values.password}</div>`,
  // })
  setTimeout(() => {
    isLoading.value = false
    router.push('/dashboard/student')
    // toast({
    //   title: 'Login Successful',
    //   description: vnode,
    // })
  }, 1000)
  console.log('Student Form submitted!', values)
})

const isLoading = ref(false)
</script>

<style scoped></style>
