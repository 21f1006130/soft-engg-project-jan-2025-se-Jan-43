import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import CourseView from '@/views/CourseView.vue'
import Courses from '@/components/courses/Courses.vue'
import DashboardView from '@/views/DashboardView.vue'
import StudentForm from '@/components/forms/login/StudentForm.vue'
import AboutCompStudent from '@/components/course_modules/student/AboutComp.vue'
import LectureCompStudent from '@/components/course_modules/student/LectureComp.vue'
import AssignmentCompStudent from '@/components/course_modules/student/AssignmentComp.vue'
import ProgAssignmentCompStudent from '@/components/course_modules/student/ProgAssignmentComp.vue'
import { authenticationGuard, checkIsAuthenticated } from '@/lib/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login/student',
      name: 'home',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      redirect: '/login/student',
      children: [{ path: 'student', component: StudentForm }],
    },
    {
      path: '/dashboard/student',
      name: 'student_dashboard',
      component: DashboardView,
      children: [{ path: '', name: 'student_dashboard_default', component: Courses }],
    },
    {
      path: '/dashboard/student/courses/:course_id',
      name: 'student_course_view',
      component: CourseView,
      redirect: (to) => {
        return { path: `/dashboard/student/courses/${to.params.course_id}/about` }
      },
      children: [
        { path: 'about', component: AboutCompStudent },
        { path: 'lecture/:lecture_id', component: LectureCompStudent },
        { path: 'assignment', component: AssignmentCompStudent },
        { path: 'prog_assignment/:prog_assignment_id', component: ProgAssignmentCompStudent },
      ],
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.fullPath.startsWith('/login')) {
    next()
  } else {
    if (authenticationGuard(router)) {
      next()
    } else {
      router.push('/login')
    }
  }
})

export default router
