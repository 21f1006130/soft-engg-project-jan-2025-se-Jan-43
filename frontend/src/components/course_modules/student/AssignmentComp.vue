<template>
  <div class="py-6">
    <Dialog v-model:open="postSubmissionModal.open">
      <DialogContent>
        <DialogHeader v-if="postSubmissionModal.success">
          <DialogTitle>Success!</DialogTitle>
          <DialogDescription>
            Your code was submitted successfully.
            {{ activeAnswers.score }}
          </DialogDescription>
        </DialogHeader>
        <DialogHeader v-else>
          <DialogTitle>Failure!</DialogTitle>
          <DialogDescription>
            An error occurred while submitting your code. Make sure that the main function is
            defined properly and that there are no errors in your code.
          </DialogDescription>
        </DialogHeader>
        <DialogTrigger as-child>
          <Button>OK</Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
    <h1 class="text-xl mb-4 font-semibold">Week {{ activeParams.week }} - Assignment</h1>
    <form action="#" @submit="submitAnswers">
      <div class="space-y-4">
        <div
          v-for="(question, index) in activeAssignment?.questions"
          :key="question.question_id"
          class="p-6 bg-background"
        >
          <p class="text-sm mb-2">
            <span>{{ index + 1 }}) </span>{{ question.question_text }}
          </p>
          <RadioGroup
            v-if="activeAnswers.score >= 0"
            :disabled="activeAnswers.score >= 0"
            :model-value="getQuestionAnswerFromSubmission(question.question_id)"
          >
            <div class="flex items-center gap-2">
              <RadioGroupItem
                :name="question.question_id.toString()"
                :id="'question-' + question.question_id + '-a'"
                value="a"
              />
              <Label :for="'question-' + question.question_id + '-a'">{{
                question.option_a
              }}</Label>
            </div>
            <div class="flex items-center gap-2">
              <RadioGroupItem
                :name="question.question_id.toString()"
                :id="'question-' + question.question_id + '-b'"
                value="b"
              />
              <Label :for="'question-' + question.question_id + '-b'">{{
                question.option_b
              }}</Label>
            </div>
            <div class="flex items-center gap-2">
              <RadioGroupItem
                :name="question.question_id.toString()"
                :id="'question-' + question.question_id + '-c'"
                value="c"
              />
              <Label :for="'question-' + question.question_id + '-c'">{{
                question.option_c
              }}</Label>
            </div>
            <div class="flex items-center gap-2">
              <RadioGroupItem
                :name="question.question_id.toString()"
                :id="'question-' + question.question_id + '-d'"
                value="d"
              />
              <Label :for="'question-' + question.question_id + '-d'">{{
                question.option_a
              }}</Label>
            </div>
          </RadioGroup>
          <RadioGroup
            v-else
            :disabled="activeAnswers.score >= 0"
            :default-value="getQuestionAnswerFromSubmission(question.question_id)"
          >
            <div class="flex items-center gap-2">
              <RadioGroupItem
                :name="question.question_id.toString()"
                :id="'question-' + question.question_id + '-a'"
                value="a"
              />
              <Label :for="'question-' + question.question_id + '-a'">{{
                question.option_a
              }}</Label>
            </div>
            <div class="flex items-center gap-2">
              <RadioGroupItem
                :name="question.question_id.toString()"
                :id="'question-' + question.question_id + '-b'"
                value="b"
              />
              <Label :for="'question-' + question.question_id + '-b'">{{
                question.option_b
              }}</Label>
            </div>
            <div class="flex items-center gap-2">
              <RadioGroupItem
                :name="question.question_id.toString()"
                :id="'question-' + question.question_id + '-c'"
                value="c"
              />
              <Label :for="'question-' + question.question_id + '-c'">{{
                question.option_c
              }}</Label>
            </div>
            <div class="flex items-center gap-2">
              <RadioGroupItem
                :name="question.question_id.toString()"
                :id="'question-' + question.question_id + '-d'"
                value="d"
              />
              <Label :for="'question-' + question.question_id + '-d'">{{
                question.option_a
              }}</Label>
            </div>
          </RadioGroup>
          <div v-if="activeAnswers.score >= 0" class="mt-4">
            <p class="text-green-600" v-if="getisAnswerCorrectFromSubmission(question.question_id)">
              {{}} Correct
            </p>
            <p class="text-destructive" v-else>{{}} Incorrect</p>
          </div>
        </div>
      </div>
      <p class="mt-4 font-bold" v-if="activeAnswers.score >= 0">
        Final Score: {{ activeAnswers.score.toPrecision(3) }}%
      </p>
      <LoadingButton
        :is-loading="isAnswerSubmitting"
        :disabled="isAnswerSubmitting || activeAnswers.score >= 0"
        class="mt-4 mb-8 bg-foreground rounded-none"
        type="submit"
        >Submit Answer</LoadingButton
      >
    </form>
  </div>
</template>

<script setup lang="ts">
import { useCourseModuleStore } from '@/stores/store'
import LoadingButton from '@/components/utils/LoadingButton.vue'
import Button from '@/components/ui/button/Button.vue'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { ActiveAssignment } from '@/lib/types'
import { useRoute } from 'vue-router'
import {
  getCourseAssignment,
  getCourseAssignmentSubmissionGrade,
  submitAssignment,
} from '@/lib/api'
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { getCourseAssignmentSubmission } from '@/lib/api'
import { checkResponse } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
const postSubmissionModal = ref({ open: false, success: true })
const route = useRoute()

const isAnswerSubmitting = ref(false)

const courseId = route.params.course_id
const query_params = route.query
const activeAssignment = ref<ActiveAssignment>()

const activeCourseId = ref(courseId)
const activeParams = ref(query_params)

const activeAnswers = ref({
  grade_id: -1,
  student_id: -1,
  assignment_id: -1,
  score: -9999,
})

const activeSubmissions = ref<
  {
    question_id: number
    chosen_answer: string
    is_correct: boolean
  }[]
>([])

const store = useCourseModuleStore()

function getQuestionAnswerFromSubmission(question_id: number | any) {
  for (const submission of activeSubmissions.value) {
    if (submission.question_id === question_id) {
      return submission.chosen_answer
    }
  }
  return ''
}

function getisAnswerCorrectFromSubmission(question_id: number | any) {
  let answer = false
  activeSubmissions.value.some((submission) => {
    if (submission.question_id === question_id) {
      answer = submission.is_correct
    }
  })
  return answer
}

async function submitAnswers(e: Event) {
  try {
    e.preventDefault()
    const formAnswers = new FormData(e.target as HTMLFormElement)

    const answers: any = {}
    formAnswers.forEach((value, key) => {
      answers[key.toString()] = value.toString()
    })

    isAnswerSubmitting.value = true

    const res = await submitAssignment(answers, activeAssignment.value?.assignment_id)
    checkResponse(res)
    postSubmissionModal.value.open = true

    if (res.ok) {
      postSubmissionModal.value.success = true
      const data = await res.json()
      activeAnswers.value = data
      await getCourseAssignmentSubmission(activeSubmissions, activeAssignment.value?.assignment_id)
      isAnswerSubmitting.value = false
    } else {
      postSubmissionModal.value.success = false
      isAnswerSubmitting.value = false
    }
  } catch (e) {
    console.error(e)
  }
}

watch(
  () => route.params.course_id,
  (newId, oldId) => {
    activeCourseId.value = newId
    store.isModuleLoading = true

    getCourseAssignment(activeAssignment, courseId, activeParams.value.week, activeParams.value.id)
      .then(() => {
        getCourseAssignmentSubmission(activeSubmissions, activeAssignment.value?.assignment_id)
      })
      .then(() => {
        getCourseAssignmentSubmissionGrade(activeAnswers, activeAssignment.value?.assignment_id)
      })
      .finally(() => {
        store.isModuleLoading = false
      })
  },
)
watch(
  () => route.query,
  (newQuery, oldQuery) => {
    activeParams.value = newQuery
    store.isModuleLoading = true

    getCourseAssignment(activeAssignment, courseId, activeParams.value.week, activeParams.value.id)
      .then(() => {
        getCourseAssignmentSubmission(activeSubmissions, activeAssignment.value?.assignment_id)
      })
      .then(() => {
        getCourseAssignmentSubmissionGrade(activeAnswers, activeAssignment.value?.assignment_id)
      })
      .finally(() => {
        store.isModuleLoading = false
      })
  },
)

onBeforeMount(() => {
  store.isModuleLoading = true
  getCourseAssignment(activeAssignment, courseId, activeParams.value.week, activeParams.value.id)
    .then(() => {
      getCourseAssignmentSubmission(activeSubmissions, activeAssignment.value?.assignment_id)
    })
    .then(() => {
      getCourseAssignmentSubmissionGrade(activeAnswers, activeAssignment.value?.assignment_id)
    })
    .finally(() => {
      store.isModuleLoading = false
    })
})
</script>

<style scoped></style>
