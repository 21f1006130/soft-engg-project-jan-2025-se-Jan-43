<template>
  <header>
    <nav>
      <ContainerComponent class="border-b-2 py-4 px-6 flex gap-4 justify-between items-center">
        <div class="logo">
          <img src="/IITM-Logo.svg" class="aspect-auto h-16 min-w-72" alt="IITM Logo" />
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
              <RouterLink :to="dashboardPath">
                <DropdownMenuItem class="px-4 py-2 flex items-center"
                  ><Gauge /> Dashboard
                </DropdownMenuItem>
              </RouterLink>
              <DropdownMenuSeparator />
              <RouterLink :to="logoutPath">
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

  <Popover>
    <PopoverTrigger as-child style="position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9998">
      <Button><Bot /></Button>
    </PopoverTrigger>
    <PopoverContent class="shadow-none p-0 border-0 h-0 w-fit">
      <ChatBot />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import router from '@/router'
import ChatBot from '@/components/utils/ChatBot.vue'
const dashboardPath = '/dashboard/' + router.currentRoute.value.path.split('/')[2]
const logoutPath = '/login/' + router.currentRoute.value.path.split('/')[2]
import { ref } from 'vue'

import ContainerComponent from '@/components/utils/ContainerComponent.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Bot, LogOut, Gauge } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
