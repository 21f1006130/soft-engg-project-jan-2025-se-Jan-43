<template>
  <div>
    <Dialog v-model:open="postSubmissionModal.open">
      <DialogContent>
        <DialogHeader v-if="postSubmissionModal.success">
          <DialogTitle>Success!</DialogTitle>
          <DialogDescription>
            Your code was submitted successfully.
            {{ activeProgAssignmentSubmission.score }}
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
    <div>
      <h2 class="text-2xl pt-6 font-bold">GrPA</h2>
      <h3 class="text-2xl pt-2 pb-6 font-semibold">
        {{ activeProgAssignment?.title }}
      </h3>
      <p class="max-w-[150ch] mb-6">
        <MDParser :md="activeProgDescr" />
      </p>
      <div class="max-w-[100ch]">
        <p class="mb-2 font-semibold">Paste your code below.</p>
        <form action="#" @submit="submitCode">
          <Textarea
            v-model="activeProgAssignmentSubmission.code"
            name="code"
            :disabled="activeProgAssignmentSubmission.score >= 0"
            class="font-mono p-8 h-72 bg-gray-200"
          />

          <p class="mt-4 font-bold" v-if="activeProgAssignmentSubmission.score >= 0">
            Final Score: {{ activeProgAssignmentSubmission.score }}%
          </p>
          <LoadingButton
            :is-loading="isCodeSubmitting"
            :disabled="isCodeSubmitting || activeProgAssignmentSubmission.score >= 0"
            class="mt-8 mb-8 bg-foreground rounded-none"
            type="submit"
            >Submit Code</LoadingButton
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import LoadingButton from '@/components/utils/LoadingButton.vue'
import {
  getCourseProgAssignment,
  submitProgAssignment,
  getCourseProgAssignmentSubmission,
} from '@/lib/student'
import MDParser from '@/components/utils/MDParser.vue'
import type { ProgAssignment, ProgAssignmentGrade } from '@/lib/types'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { onBeforeMount } from 'vue'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { checkResponse } from '@/lib/utils'
import { useCourseModuleStore } from '@/stores/store'

const isCodeSubmitting = ref(false)
const route = useRoute()
const activeProgAssignmentId = ref(route.params.prog_assignment_id)
const activeProgAssignment = ref<ProgAssignment>()
const activeProgDescr = ref('')
const activeProgAssignmentSubmission = ref<ProgAssignmentGrade>({
  prog_submission_id: 0,
  prog_assignment_id: 0,
  student_id: 0,
  code: '',
  score: -9999,
})
const store = useCourseModuleStore()
const postSubmissionModal = ref({ open: false, success: true })

async function submitCode(e: Event) {
  try {
    e.preventDefault()
    if (activeProgAssignmentSubmission.value.score >= 0) return
    const code = [...new FormData(e.target as HTMLFormElement).entries()][0]
    isCodeSubmitting.value = true

    const res = await submitProgAssignment(code, activeProgAssignmentId.value)
    checkResponse(res)
    postSubmissionModal.value.open = true

    if (res.ok) {
      postSubmissionModal.value.success = true
      const data = await res.json()
      activeProgAssignmentSubmission.value = data
      isCodeSubmitting.value = false
    } else {
      postSubmissionModal.value.success = false
      isCodeSubmitting.value = false
    }
  } catch (e) {
    postSubmissionModal.value.success = false
    console.error(e)
    isCodeSubmitting.value = false
  }
}

watch(
  () => route.params.prog_assignment_id,
  (newId, oldId) => {
    activeProgAssignmentId.value = newId
    store.isModuleLoading = true
    getCourseProgAssignment(activeProgAssignment, activeProgAssignmentId.value, activeProgDescr)
      .then(() => {
        getCourseProgAssignmentSubmission(
          activeProgAssignmentSubmission,
          activeProgAssignmentId.value,
        )
      })
      .finally(() => {
        store.isModuleLoading = false
      })
  },
)

onBeforeMount(() => {
  store.isModuleLoading = true
  getCourseProgAssignment(activeProgAssignment, activeProgAssignmentId.value, activeProgDescr)
    .then(() => {
      getCourseProgAssignmentSubmission(
        activeProgAssignmentSubmission,
        activeProgAssignmentId.value,
      )
    })
    .finally(() => {
      store.isModuleLoading = false
    })
})
</script>

<style scoped></style>
