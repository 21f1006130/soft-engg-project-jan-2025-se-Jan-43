import { type Ref } from 'vue'
import router from '@/router'
import { getURL } from '@/lib/utils'

export async function loginStudent(values: any, store: any, form: any, isLoading: Ref<boolean>) {
  try {
    const response = await fetch(getURL('/auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if (!response.ok) {
      // form.setFieldValue('invalid',true )
      form.setErrors({
        invalid: ['Invalid email or password.'],
      })
      throw new Error('Invalid credentials')
    }
    const data = await response.json()
    store.accessToken = data.access_token
    store.isAuthenticated = true

    router.push({ name: 'student_dashboard_default' })
  } catch (error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}
