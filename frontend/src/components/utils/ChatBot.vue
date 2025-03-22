<template>
  <deep-chat
    style="
      border-radius: 10px;
      border-color: #dcdcdc;
      background-color: rgb(241, 245, 249);
      position: fixed;
      bottom: 4rem;
      right: 1rem;
      z-index: 9999;
      /* width: 350px; */
    "
    :textInput="deepchatStyles.textInput"
    :messageStyles="deepchatStyles.messageStyles"
    :avatars="deepchatStyles.avatars"
    :speechToText="deepchatStyles.speechToText"
    :submitButtonStyles="deepchatStyles.submitButtonStyles"
    :history="history"
    :demo="false"
    :connect="{
      handler: handleDeepChatMessage,
    }"
  ></deep-chat>
</template>

<script setup lang="ts">
import 'deep-chat'
import { DeepChat } from 'deep-chat'
import { deepchatStyles } from '@/lib/utils'
import { ref } from 'vue'
import { handleDeepChatMessage } from '@/lib/student'

const history = ref([])
</script>
<style scoped></style>
