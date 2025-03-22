<template>
  <div class="bg-muted w-full">
    <header class="bg-background sticky top-0">
      <nav>
        <ContainerComponent class="border-b-2 px-8 py-6 flex gap-4 justify-between items-center">
          <SidebarTrigger class="md:hidden h-auto w-auto my-4">
            <AlignJustify class="scale-150" />
          </SidebarTrigger>
          <div class="logo">
            <img src="/IITM-Logo-small.png" class="aspect-auto h-16" alt="IITM Logo" />
          </div>
          <div class="profile">
            <!-- <span class="me-4 hidden min-[625px]:inline-block">ts_21f1003245</span> -->
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="relative h-12 w-12 rounded-full">
                  <Avatar class="h-12 w-12 border">
                    <AvatarImage src="/avatars/01.png" alt="User Avatar" />
                    <AvatarFallback class="text-xl">TU</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-fit" align="end">
                <DropdownMenuLabel class="font-normal flex p-4">
                  <div class="flex flex-col space-y-1">
                    <p class="text-sm font-medium leading-none">Test User</p>
                    <p class="text-sm leading-none text-muted-foreground">
                      ts_21f1003245@ds.study.iitm.ac.in
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
    <main>
      <RouterView class="px-8" />
    </main>
  </div>
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
import SidebarTrigger from '../ui/sidebar/SidebarTrigger.vue'
import { RouterView } from 'vue-router'
import ContainerComponent from './ContainerComponent.vue'

function logOut() {
  sessionStorage.removeItem('accessToken')
  sessionStorage.removeItem('isAuthenticated')
}
</script>

<style scoped></style>
