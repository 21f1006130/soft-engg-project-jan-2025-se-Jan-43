<template>
  <header>
    <nav>
      <ContainerComponent class="border-b-2 px-6 py-6 flex gap-4 justify-between items-center">
        <slot name="sidebar_trigger"> </slot>
        <div class="logo">
          <img :src="props.logoSrc" class="aspect-auto h-16" alt="IITM Logo" />
        </div>
        <div class="profile z-50">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" class="relative h-12 w-12 rounded-full">
                <Avatar class="h-12 w-12 p-2 border-2 border-gray-300">
                  <AvatarImage src="/user.svg" alt="User Avatar" />
                  <AvatarFallback class="text-xl"> U </AvatarFallback>
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
              <RouterLink to="/dashboard/student">
                <DropdownMenuItem class="px-4 py-2 flex items-center"
                  ><Gauge /> Dashboard
                </DropdownMenuItem>
              </RouterLink>
              <DropdownMenuSeparator />
              <RouterLink @click="logOut" to="/login/student">
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
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut, Gauge, AlignJustify } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ContainerComponent from './ContainerComponent.vue'
const props = defineProps({
  logoSrc: String,
})

function logOut() {
  sessionStorage.removeItem('accessToken')
  sessionStorage.removeItem('isAuthenticated')
  sessionStorage.removeItem('userEmail')
}
const userEmail = sessionStorage.getItem('userEmail')
</script>

<style scoped></style>
