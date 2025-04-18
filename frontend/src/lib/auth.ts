import { type Ref } from 'vue'
import router from '@/router'
import { getURL } from '@/lib/utils'
import { FETCH_POST } from './api'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'
import { h } from 'vue'
export async function loginStudent(values: any, form: any, isLoading: Ref<boolean>) {
  try {
    const response = await FETCH_POST('/auth/login', values, false)
    if (!response.ok) {
      // form.setFieldValue('invalid',true )
      form.setErrors({
        invalid: ['Invalid email or password.'],
      })
      throw new Error('Invalid credentials')
    }
    const data = await response.json()

    sessionStorage.setItem('accessToken', data.access_token)
    sessionStorage.setItem('isAuthenticated', 'true')
    sessionStorage.setItem('userEmail', values.email)

    // store.accessToken = data.access_token
    // store.isAuthenticated = true

    router.push({ name: 'student_dashboard_default' })
  } catch (error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}
export async function registerStudent(values: any, form: any, isLoading: Ref<boolean>) {
  try {
    const body = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
    }
    const response = await FETCH_POST('/auth/register', body, false)
    if (!response.ok) {
      // form.setFieldValue('invalid',true )
      if (response.status === 400) {
        form.setErrors({
          invalid: ['Email already registered.'],
        })
      } else {
        form.setErrors({
          invalid: ['An unknown error occurred'],
        })
      }
      throw new Error('Registration was unsuccessful.')
    }
    const data = await response.json()

    const { toast } = useToast()

    toast({
      title: 'Success',
      description:
        'User has been registered successfully. Please login using your registered email.',
      variant: 'default',
      action: h(
        ToastAction,
        {
          altText: 'Close',
        },
        {
          default: () => {
            return 'Close'
          },
        },
      ),
    })
    router.push({ name: 'login' })
  } catch (error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}
