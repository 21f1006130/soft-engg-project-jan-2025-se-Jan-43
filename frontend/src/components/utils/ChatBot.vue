<template>
  <div class="fixed bottom-0 md:bottom-2 left-1/2 -translate-x-1/2" style="z-index: 0">
    <Popover v-model:open="popoverOpen">
      <PopoverTrigger>
        <div class="flex flex-col gap-2">
          <Button class="self-center px-4 py-6">
            <BotIcon :style="{ width: '28px', height: '28px' }" />
          </Button>
          <span class="text-primary font-bold">AI BOT</span>
        </div>
      </PopoverTrigger>
      <PopoverContent class="bg-transparent w-auto shadow-none border-0">
        <div class="flex gap-2">
          <Button @click="startNewChat"><PlusCircle /> New</Button>
          <Button @click="continueChat"><PlayCircle /> Continue</Button>
        </div>
      </PopoverContent>
    </Popover>
  </div>
  <Dialog class="bg-transparent" v-model:open="modalOpen">
    <DialogContent
      class="text-muted p-0 border-0 gap-0 bg-transparent w-[calc(100%-2rem)] sm:w-full h-auto"
    >
      <DialogHeader class="header bg-primary p-4 text-muted rounded-t-2xl">
        <DialogTitle>
          <div class="flex gap-2 items-center justify-center">
            <img class="h-12 w-12" src="/IITM-Logo.png" alt="IITM Logo" />
            <h2 class="font-bold text-center">IITM Chat Bot</h2>
          </div>
        </DialogTitle>
      </DialogHeader>
      <DialogDescription class="p-0 bg-transparent w-full">
        <deep-chat
          tabindex="0"
          :chatStyle="deepchatStyles.chatStyle"
          :textInput="deepchatStyles.textInput"
          :messageStyles="deepchatStyles.messageStyles"
          :avatars="deepchatStyles.avatars"
          :speechToText="deepchatStyles.speechToText"
          :submitButtonStyles="deepchatStyles.submitButtonStyles"
          :demo="false"
          :introMessage="{
            text: 'Hi I am your AI assistant. Please type your query using the input box below.',
          }"
          :connect="{
            handler: handleDeepChatMessage,
          }"
          :loadHistory="loadHistory"
        >
        </deep-chat>
      </DialogDescription>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import 'deep-chat'
import { deepchatStyles } from '@/lib/utils'
import { ref } from 'vue'
import { BotIcon, PlusCircle, PlayCircle, X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

import { handleDeepChatMessage, getDeepChatHistory } from '@/lib/student'
import { FETCH_GET } from '@/lib/student'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type historyMessage = {
  text: string
  role: string
}
const modalOpen = ref(false)
const popoverOpen = ref(false)

function startNewChat(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  localStorage.removeItem('deepchat_id')
  popoverOpen.value = false
  modalOpen.value = true
}
function continueChat(e: Event) {
  e.preventDefault()
  e.stopPropagation()

  popoverOpen.value = false
  modalOpen.value = true
}

async function loadHistory() {
  const chat_id = localStorage.getItem('deepchat_id') || ''
  const history: historyMessage[] = []
  // history.push({
  //   // text: 'Please type your query or question as a prompt using the input box below.',
  //   text: 'Please type your query.',
  //   role: 'ai',
  // })
  if (chat_id === '') {
    return history
  }
  const data = await FETCH_GET(`/chat/conversations/${chat_id}`)
  data.messages.forEach((message: any) => {
    if (message.sender === 'user') {
      history.push({ text: message.message_text, role: 'user' })
    } else if (message.sender === 'model') {
      history.push({ text: message.message_text, role: 'ai' })
    }
  })
  return history
}
</script>
<style></style>
