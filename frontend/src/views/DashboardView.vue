<template>
  <header>
    <Header logoSrc="/IITM-Logo.svg" />
  </header>
  <RouterView />
  <ChatBot />
</template>

<script setup lang="ts">
import router from '@/router'
import ChatBot from '@/components/utils/ChatBot.vue'
const dashboardPath = '/dashboard/' + router.currentRoute.value.path.split('/')[2]
const logoutPath = '/login/' + router.currentRoute.value.path.split('/')[2]

import ContainerComponent from '@/components/utils/ContainerComponent.vue'
import Header from '@/components/utils/Header.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut, Gauge } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RouterView } from 'vue-router'

function logOut() {
  sessionStorage.removeItem('accessToken')
  sessionStorage.removeItem('isAuthenticated')
  sessionStorage.removeItem('userEmail')
}

const userEmail = sessionStorage.getItem('userEmail')
</script>

<style scoped></style>
