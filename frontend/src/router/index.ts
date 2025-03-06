import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import AdminForm from '@/components/forms/login/AdminForm.vue'
import FacultyForm from '@/components/forms/login/FacultyForm.vue'
import StudentForm from '@/components/forms/login/StudentForm.vue'
import DashboardView from '@/views/DashboardView.vue'
import CourseContainer from '@/components/utils/CourseContainer.vue'
import AdminView from '@/views/AdminDashboardView.vue'

import SideBarStudent from '@/components/course_modules/student/SideBar.vue'
import AboutCompStudent from '@/components/course_modules/student/AboutComp.vue'
import LectureCompStudent from '@/components/course_modules/student/LectureComp.vue'
import AssignmentCompStudent from '@/components/course_modules/student/AssignmentComp.vue'

import SideBarFaculty from '@/components/course_modules/faculty/SideBar.vue'
import AboutCompFaculty from '@/components/course_modules/faculty/AboutComp.vue'
import LectureCompFaculty from '@/components/course_modules/faculty/LectureComp.vue'
import AssignmentCompFaculty from '@/components/course_modules/faculty/AssignmentComp.vue'

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
      children: [
        { path: 'student', component: StudentForm },
        { path: 'faculty', component: FacultyForm },
        { path: 'admin', component: AdminForm },
      ],
    },
    {
      path: '/dashboard/student',
      name: 'student_dashboard',
      component: DashboardView,
      children: [
        { path: '', name: 'student_dashboard_default', component: CourseContainer },
        {
          path: 'course-se',
          component: SideBarStudent,
          redirect: '/dashboard/student/course-se/about',
          children: [
            { path: 'about', component: AboutCompStudent },
            { path: 'lecture', component: LectureCompStudent },
            { path: 'assignment', component: AssignmentCompStudent },
          ],
        },
      ],
    },
    {
      path: '/dashboard/faculty',
      name: 'faculty_dashboard',
      component: DashboardView,
      children: [
        { path: '', name: 'faculty_dashboard_default', component: CourseContainer },
        {
          path: 'course-se',
          component: SideBarFaculty,
          redirect: '/dashboard/faculty/course-se/about',
          children: [
            { path: 'about', component: AboutCompFaculty },
            { path: 'lecture', component: LectureCompFaculty },
            { path: 'assignment', component: AssignmentCompFaculty },
          ],
        },
      ],
    },
    {
      path: '/dashboard/admin',
      name: 'admin_dashboard',
      component: AdminView,
    },
  ],
})

export default router
