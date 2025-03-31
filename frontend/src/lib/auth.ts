import { type Ref } from 'vue'
import router from '@/router'
import { getURL } from '@/lib/utils'
import { FETCH_POST } from './api'
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
