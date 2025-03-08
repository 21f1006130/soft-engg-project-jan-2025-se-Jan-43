import { getURL } from '@/lib/utils'
import type { Ref } from 'vue'
import { checkResponse } from '@/lib/utils'

export async function getStudentCourses(courses: Ref<any>, router: any) {
  try {
    const response = await fetch(getURL('/courses/'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
      },
    })
    checkResponse(response, router)

    const data = await response.json()
    courses.value = data
  } catch (e) {
    console.error(e)
    console.log('Failed to fetch courses.')
  }
}

export async function getCourseLectures(
  lectures: Ref<any>,
  courseId: string | string[],
  router: any,
) {
  try {
    const response = await fetch(getURL(`/courses/${courseId}/contents`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
      },
    })
    checkResponse(response, router)

    const data = await response.json()
    lectures.value = data
    console.log(data)
  } catch (e) {
    console.error(e)
    console.log('Failed to fetch Lectures.')
  }
}
