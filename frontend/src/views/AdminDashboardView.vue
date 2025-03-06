<template>
  <header>
    <nav>
      <ContainerComponent class="border-b-2 py-4 px-4 flex gap-4 justify-between items-center">
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
                  <AvatarFallback class="text-xl"><UserPlus2 /></AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-fit" align="end">
              <DropdownMenuLabel class="font-normal flex p-4">
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium leading-none">Test Admin</p>
                  <p class="text-sm leading-none text-muted-foreground">
                    tadmin_@ds.study.iitm.ac.in
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <RouterLink to="/dashboard/admin">
                <DropdownMenuItem class="px-4 py-2"><Gauge />Dashboard </DropdownMenuItem>
              </RouterLink>
              <DropdownMenuSeparator />
              <RouterLink to="/login/admin">
                <DropdownMenuItem class="px-4 py-2"><LogOut />Log out </DropdownMenuItem>
              </RouterLink>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ContainerComponent>
    </nav>
  </header>
  <main>
    <ContainerComponent>
      <h1 class="font-bold mt-12 text-center text-4xl tracking-tight">Usage Report</h1>
      <div class="mt-12 grid grid-cols-2 grid-rows-2 max-w-4xl mx-auto gap-8">
        <AdminFunction href="#" title="Students registered" />
        <AdminFunction href="#" title="Chatbot clicks" />
        <AdminFunction href="#" title="Type of daily user: New/ Repeat" />
        <AdminFunction href="#" title="Time of usage of bot" />
      </div>
    </ContainerComponent>
  </main>
</template>

<script setup lang="ts">
import ContainerComponent from '@/components/utils/ContainerComponent.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserPlus2, LogOut, Gauge } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import AdminFunction from '@/components/utils/AdminFunction.vue'
</script>
<style scoped></style>
