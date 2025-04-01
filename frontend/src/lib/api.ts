import { getURL } from '@/lib/utils'
import type { Ref } from 'vue'
import { checkResponse } from '@/lib/utils'
import { marked } from 'marked'
import type { Signals } from 'deep-chat/dist/types/handler'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'
import { h } from 'vue'
import type { historyMessage } from './types'
function headers() {
  return {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
  }
}
function handleBackendProblem() {
  const { toast } = useToast()

  toast({
    title: 'Error!',
    description: 'An unknown error occurred.',
    variant: 'destructive',
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
}
export async function FETCH_GET(url: string) {
  try {
    const res = await fetch(getURL(url), {
      method: 'GET',
      headers: headers(),
    })
    checkResponse(res)
    return await res.json()
  } catch (e) {
    handleBackendProblem()
    throw e
  }
}
export async function FETCH_POST(url: string, body: any, checkRes = true) {
  try {
    const res = await fetch(getURL(url), {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    })
    if (checkRes) {
      checkResponse(res)
    }
    return res
  } catch (e) {
    handleBackendProblem()
    throw e
  }
}
export async function getStudentCourses(courses: Ref<any>) {
  try {
    const data = await FETCH_GET('/courses/')
    courses.value = data
  } catch (e) {
    console.error(e)
  }
}

export async function getCourseLectures(
  courseData: Ref<any>,
  courseId: any,
  lectureId: any,
  activeAccordionValue: Ref<any>,
) {
  try {
    const data = await FETCH_GET(`/courses/${courseId}/contents`)
    courseData.value = data

    data.weeks.some((week: any) => {
      const isActiveWeek = week.contents.some((content: any) => {
        return content.content_id.toString() === lectureId
      })

      if (isActiveWeek) {
        activeAccordionValue.value = `Week ${week.week_number}`
        return true
      }
    })
  } catch (e) {
    console.error(e)
  }
}

export async function getLecture(
  lectureData: Ref<any>,
  videoURL: Ref<any>,
  courseId: any,
  lectureId: any,
) {
  try {
    const data = await FETCH_GET(`/courses/${courseId}/contents/${lectureId}`)
    lectureData.value = data
    videoURL.value = 'https://www.youtube.com/embed/' + data['lecture_url'].split('?v=')[1]
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function getCourseAssignments(assignments: Ref<any>, courseId: any) {
  if (courseId === 'CS1002') return
  try {
    const data = await FETCH_GET(`/assignments/course/${courseId}`)
    assignments.value = data
  } catch (e) {
    console.error(e)
  }
}

export async function getCourseAssignment(
  assignment: Ref<any>,
  courseId: any,
  week: any,
  assignmentId: any,
) {
  try {
    const data = await FETCH_GET(`/assignments/course/${courseId}`)
    assignment.value = data[parseInt(week) - 1]['assignments'][parseInt(assignmentId) - 1]
  } catch (e) {
    console.error(e)
  }
}

export async function getCourseAssignmentSubmission(
  activeAssignmentSubmissions: Ref<any>,
  assignment_id: any,
) {
  try {
    const data = await FETCH_GET(`/assignments/submission/${assignment_id}`)
    if (data.message) {
      activeAssignmentSubmissions.value = []
    } else {
      activeAssignmentSubmissions.value = data
    }
  } catch (e) {
    console.error(e)
  }
}

export async function getCourseAssignmentSubmissionGrade(
  activeAssignmentGrade: Ref<any>,
  assignment_id: any,
) {
  try {
    const data = await FETCH_GET(`/assignments/grade/${assignment_id}`)
    activeAssignmentGrade.value = data
  } catch (e) {
    console.error(e)
  }
}

export async function submitAssignment(data: any, assignment_id: any) {
  const res = await FETCH_POST(`/assignments/submit`, {
    assignment_id: assignment_id,
    answers: data,
  })
  return res
}

export async function getCourseProgAssignments(
  progAssignments: Ref<any>,
  courseId: any,
  progAssignmentId: any,
  activeAccordionValue: Ref<any>,
) {
  if (courseId !== 'CS1002') return
  try {
    const data = await FETCH_GET('/programming_assignments/')
    progAssignments.value = data

    data.some((assignment: any, index: any) => {
      if (assignment.prog_assignment_id.toString() === progAssignmentId) {
        activeAccordionValue.value = `Week ${index + 1}`
      }
    })
  } catch (e) {
    console.error(e)
  }
}

export async function getCourseProgAssignment(
  progAssignment: Ref<any>,
  progAssignmentId: any,
  activeProgDescr: any,
) {
  try {
    const data = await FETCH_GET(`/programming_assignments/${progAssignmentId}`)
    progAssignment.value = data
    activeProgDescr.value = marked.parse(data.description)
  } catch (e) {
    console.error(e)
  }
}

export async function getCourseProgAssignmentSubmission(
  activeProgAssignmentGrade: Ref<any>,
  prog_assignment_id: any,
) {
  try {
    activeProgAssignmentGrade.value = {
      prog_submission_id: 0,
      prog_assignment_id: 0,
      student_id: 0,
      code: '',
      score: -9999,
    }
    const data = await FETCH_GET('/programming_assignments/grades')
    data.some((grade: any) => {
      if (grade.prog_assignment_id.toString() === prog_assignment_id) {
        activeProgAssignmentGrade.value = grade
      }
    })
  } catch (e) {
    console.error(e)
  }
}

export async function submitProgAssignment(data: any, prog_assignment_id: any) {
  const res = await FETCH_POST(`/programming_assignments/${prog_assignment_id}/submit`, {
    code: data[1],
  })
  return res
}

async function CHAT_START(body: any, signals: Signals) {
  const res = await FETCH_POST(`/chat/start`, { message: body.messages[0].text })
  const data = await res.json()

  localStorage.setItem('deepchat_id', data.conversation.conversation_id)
  signals.onResponse({ text: data.ai_message.message_text })
  return res
}

async function CHAT_CONTINUE(body: any, chat_id: any, signals: Signals) {
  const res = await FETCH_POST(`/chat/continue/${chat_id}`, { message: body.messages[0].text })
  const data = await res.json()

  signals.onResponse({ text: data.ai_message.message_text })
  return res
}

export async function getDeepChatHistory(history: Ref<any>) {
  try {
    const chat_id = localStorage.getItem('deepchat_id') || ''
    const history: historyMessage[] = []
    if (chat_id === '') {
      return history
    }
    const data = await FETCH_GET(`/chat/conversations/${chat_id}`)
    data.messages.forEach((message: any) => {
      if (message.sender === 'user') {
        history.push({ text: message.message_text, role: 'user' })
      } else if (message.sender === 'model') {
        history.push({ text: message.message_text, role: 'ai' })
      }
    })
    return history
  } catch (error) {
    console.error(error)
  }
}

export async function handleDeepChatMessage(body: any, signals: Signals) {
  const chat_id = localStorage.getItem('deepchat_id') || ''
  if (chat_id !== '') {
    try {
      let res = await CHAT_CONTINUE(body, chat_id, signals)
      if (res.status === 404) {
        res = await CHAT_START(body, signals)
      }
      console.log(await res.json())
    } catch (e) {
      signals.onResponse({ error: 'Error' }) // displays an error message
    }
  } else {
    try {
      const res = await CHAT_START(body, signals)
    } catch (e) {
      signals.onResponse({ error: 'Error' })
    }
  }
}
