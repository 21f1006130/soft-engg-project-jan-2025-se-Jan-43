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
  <!-- <deep-chat
    :demo="true"
    style="position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9999"
    :textInput="{ placeholder: { text: 'Welcome to the demo!' } }"
    :history="history"
  /> -->
  <!-- This example is for Vanilla JS and should be tailored to your framework (see Frameworks) -->

  <Popover>
    <PopoverTrigger as-child style="position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9998">
      <Button><Bot /></Button>
    </PopoverTrigger>
    <PopoverContent class="shadow-none p-0 border-0 h-0 w-fit">
      <deep-chat
        style="
          border-radius: 10px;
          border-color: #dcdcdc;
          /* background-color: #fcf4f3; */
          background-color: #f1f5f9;
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
          position: fixed;
          bottom: 4rem;
          right: 1rem;
          z-index: 9999;
          max-width: 400px;
        "
        :textInput="{
          styles: {
            container: {
              borderRadius: '20px',
              border: '1px solid #969696',
              boxShadow: 'unset',
              width: '78%',
              marginLeft: '-15px',
            },
            text: { padding: '10px', paddingLeft: '15px', paddingRight: '34px' },
          },
          placeholder: { text: 'Enter a prompt here', style: { color: '#bcbcbc' } },
        }"
        :messageStyles="{
          default: {
            shared: {
              bubble: {
                maxWidth: '100%',
                backgroundColor: 'unset',
                marginTop: '10px',
                marginBottom: '10px',
              },
            },
            user: { bubble: { marginLeft: '0px', color: 'black' } },
            ai: { innerContainer: { borderRadius: '15px', backgroundColor: 'white' } },
          },
        }"
        :avatars="{
          default: {
            styles: { position: 'left', container: { marginLeft: '12px', marginRight: '5px' } },
          },
          ai: {
            src: '/googleBardLogo.png',
            styles: { position: 'left', avatar: { paddingTop: '6px' } },
          },
        }"
        :speechToText="{
          button: {
            default: {
              container: {
                default: {
                  bottom: '1em',
                  right: '0.6em',
                  borderRadius: '20px',
                  width: '1.9em',
                  height: '1.9em',
                },
              },
              svg: { styles: { default: { bottom: '0.35em', left: '0.35em' } } },
            },
            position: 'inside-right',
          },
        }"
        :submitButtonStyles="{
          position: 'outside-right',
          submit: {
            container: {
              default: {
                bottom: '0.9em',
                borderRadius: '25px',
                padding: '6px 5px 4px',
                backgroundColor: '#f3f6fc',
              },
              hover: { backgroundColor: '#b0deff4f' },
              click: { backgroundColor: '#b0deffb5' },
              loading: {},
            },
            svg: {
              content:
                '<?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?> <svg viewBox=&quot;0 0 24 24&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><path d=&quot;m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z&quot;/></svg>',
              styles: {
                default: {
                  width: '1.5em',
                  filter:
                    // 'brightness(0) saturate(100%) invert(10%) sepia(86%) saturate(6044%) hue-rotate(205deg) brightness(100%) contrast(100%)',
                    'brightness(0) saturate(100%) invert(58%) sepia(53%) saturate(6828%) hue-rotate(214deg) brightness(100%) contrast(100%)',
                },
              },
            },
          },
          loading: {
            svg: {
              styles: {
                default: {
                  filter:
                    'brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%) contrast(96%)',
                },
              },
            },
          },
          stop: {
            container: { hover: { backgroundColor: '#ededed' } },
            svg: {
              styles: {
                default: {
                  filter:
                    'brightness(0) saturate(100%) invert(59%) sepia(0%) saturate(0%) hue-rotate(348deg) brightness(96%) contrast(93%)',
                },
              },
            },
          },
        }"
        :history="history"
        demo="true"
      ></deep-chat>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import router from '@/router'
const dashboardPath = '/dashboard/' + router.currentRoute.value.path.split('/')[2]
const logoutPath = '/login/' + router.currentRoute.value.path.split('/')[2]
import 'deep-chat'
import { ref } from 'vue'

const history = ref([
  { text: 'Hey, What is 1+1?', role: 'user' },
  { text: 'The answer to 1+1 is 2.', role: 'ai' },
  { text: 'Can you give some tips on effective learning?', role: 'user' },
  {
    text: 'Sure, Divide your studies into managable chunks instead of doing it all at once. ',
    role: 'ai',
  },
])
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
