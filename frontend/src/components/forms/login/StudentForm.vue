<template>
  <Card>
    <form @submit="onSubmit" novalidate>
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
        <ErrorMessage class="text-sm text-destructive font-medium" name="invalid" as="p" />
      </CardContent>
      <CardFooter>
        <LoadingButton class="w-full" :isLoading="isLoading" type="submit">Sign In</LoadingButton>
      </CardFooter>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import LoadingButton from '@/components/utils/LoadingButton.vue'
import { LoaderCircle } from 'lucide-vue-next'
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
import { ErrorMessage } from 'vee-validate'
import { loginStudent } from '@/lib/auth'

const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, 'Email should not be blank.').email('Invalid email address.'),
    password: z.string().min(1, 'Password should not be blank.'),
    invalid: z.boolean({ message: 'Invalid email or password.' }).optional(),
  }),
)

const StudentForm = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: 'test@gmail.com',
    password: 'password',
  },
})

const onSubmit = StudentForm.handleSubmit((values) => {
  isLoading.value = true
  loginStudent(values, StudentForm, isLoading)
})

const isLoading = ref(false)
</script>

<style scoped></style>
