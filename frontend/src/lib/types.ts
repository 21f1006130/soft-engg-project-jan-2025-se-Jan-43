export type Assignments =
  | [
      {
        week_number: number
        assignments: [
          {
            assignment_id: number
            questions: [
              {
                question_id: number
                question_text: string
                option_a: string
                option_b: string
                option_c: string
                option_d: string
              },
            ]
          },
        ]
      },
    ]
  | []

export type CourseData = {
  course_id: string
  course_title: string
  weeks: [
    {
      week_number: number
      contents: [
        {
          content_id: number
          lecture_title: string
          lecture_url: string
          transcript_url: string
        },
      ]
    },
  ]
}
export type ActiveAssignment = {
  assignment_id: number
  questions: [
    {
      question_id: number
      question_text: string
      option_a: string
      option_b: string
      option_c: string
      option_d: string
    },
  ]
}
export type LectureData = {
  content_id: number
  lecture_title: string
  lecture_url: string
  transcript_url: string
}
export type ProgAssignment = {
  prog_assignment_id: number
  course_id: string
  title: string
  description: string
}
export type ProgAssignmentGrade = {
  prog_submission_id: number
  prog_assignment_id: number
  student_id: number
  code: string
  score: number
}
export type historyMessage = {
  text: string
  role: string
}
