<template>
  <header>
    <nav>
      <ContainerComponent class="border-b-2 py-6 px-6 flex gap-4 justify-between items-center">
        <div class="logo">
          <img src="/IITM-Logo.svg" class="aspect-auto h-16 min-w-72" alt="IITM Logo" />
        </div>
        <div class="profile">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" class="relative h-12 w-12 rounded-full">
                <Avatar class="h-12 w-12 border">
                  <AvatarImage src="/avatars/01.png" alt="User Avatar" />
                  <AvatarFallback class="text-xl">{{
                    userEmail?.charAt(0).toUpperCase()
                  }}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="min-w-64" align="end">
              <DropdownMenuLabel class="font-normal flex p-4">
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium leading-none">User</p>
                  <p class="text-sm leading-none text-muted-foreground">
                    {{ userEmail }}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <RouterLink :to="dashboardPath">
                <DropdownMenuItem class="px-4 py-2 flex items-center"
                  ><Gauge /> Dashboard
                </DropdownMenuItem>
              </RouterLink>
              <DropdownMenuSeparator />
              <RouterLink @click="logOut" :to="logoutPath">
                <DropdownMenuItem class="px-4 py-2 flex items-center"
                  ><LogOut /> Log out
                </DropdownMenuItem>
              </RouterLink>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ContainerComponent>
    </nav>
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
