<template>
  <div class="discussion">
    <div v-if="messages.length > 0" class="window">
      <div
        v-for="msg of messages"
        :key="msg.id"
        :class="{'message--myself': msg.user.id === me.id}"
        class="message"
      >
        <IconButton
          v-if="msg.user.id !== me.id"
          :padding="0"
          :src="resolveAvatarSrc(msg.user.id, msg.user.avatarId)"
          @click="$router.push({path: '/'+(msg.user.username ?? '')})"
        />
        <div class="content">
          <div v-if="msg.user.id !== me.id" class="username"
               @click="$router.push({path: '/'+(msg.user.username ?? '')})">{{ msg.user.username }}
          </div>
          <div class="text">{{ msg.text }}</div>
          <div class="time">{{ fmtTime(msg.sentAt) }}</div>
        </div>
        <IconButton
          v-if="msg.user.id === me.id"
          :padding="0"
          :src="resolveAvatarSrc(msg.user.id, msg.user.avatarId)"
          @click="$router.push({path: '/'+(msg.user.username ?? '')})"
        />
      </div>
    </div>
    <div v-else class="placeholder">
      <div class="placeholder-wrapper">
        <img :src="commentsIcon" alt="" />
      </div>
    </div>
    <div class="input">
      <EmojiButton class="emoji" @emoji="onEmoji" />
      <span ref="textarea" class="textarea" contenteditable role="textbox"
            @keydown.enter.prevent.stop="sendComment"></span>
      <img :src="sendIcon" alt="" class="send-button" @click="sendComment">
    </div>
  </div>
</template>

<script setup>

import sendIcon from "@/assets/icons/send.svg";
import EmojiButton from "@/components/buttons/EmojiButton.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useUserInfoStore } from "@/stores/userinfo";
import { apiUrl, resolveAvatarSrc } from "@/services/api";
import commentsIcon from "@/assets/icons/comments.svg";
import IconButton from "@/components/buttons/IconButton.vue";

const value = ref("");
const rows = ref(1);
const textarea = ref(null);

const props = defineProps({
  post_id: String
});

const maxlength = 500;
const userinfo = useUserInfoStore();
const me = await userinfo.get(true);
const messages = ref([]);
const connection = new WebSocket(`ws://${apiUrl.split("://")[1]}/discussions/${props.post_id}`);
connection.onmessage = function(event) {
  let msg = JSON.parse(event.data);
  messages.value.push(msg);
};

connection.onopen = function() {
  console.log("Successfully connected to the echo websocket server...");
};

function onEmoji(emoji) {
  if (!(textarea.value.innerText.length + emoji.length < maxlength)) {
    return;
  }
  textarea.value.innerText += emoji;
}


const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

function fmtTime(timeString) {
  let date = new Date(timeString);
  let now = new Date();
  let time = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  if (now.getDate() === date.getDate() && now.getMonth() === date.getMonth()) {
    return time;
  } else {
    return `${String(date.getDate())} ${months[date.getMonth()]} ${time}`;
  }

}

function sendComment() {
  if (textarea.value.innerText.length === 0) return;
  connection.send(JSON.stringify({
    "text": textarea.value.innerText
  }));
  textarea.value.innerText = "";
}

onMounted(() => {
  // discussion;
});

onUnmounted(() => {
  connection.close();
});
</script>

<style lang="scss" scoped>


.discussion {
  height: 100%;
  width: 100%;
  display: grid;
  min-height: 0;
  min-width: 0;
  grid-template-columns: 100%;
  grid-template-rows: minmax(0, 1fr) auto;

  .window {
    display: grid;
    grid-auto-columns: 100%;
    grid-gap: 0.25rem;
    grid-auto-rows: auto;
    align-content: end;
    grid-template-rows: unset;
    grid-auto-flow: row;

    min-width: 0;
    min-height: 0;
    padding: 0.5rem 0;

    .message {
      align-items: end;
      display: grid;
      margin: 0;
      color: var(--app-text-color);
      border-radius: 15px;
      font-size: 12pt;
      gap: 0.5rem;
      grid-template-columns: 2rem auto;
      justify-self: start;
      max-width: calc(100% - 2.25rem);


      &--myself {
        grid-template-columns: auto 2rem;
        justify-self: end;
      }

      .content {
        background-color: #333333;
        padding: 0.25rem 0.5rem 0.5rem 0.5rem;
        border-radius: 10px;
        display: grid;

        .text {
          word-wrap: anywhere;
          width: 100%;
          font-size: 11pt;
        }

        .username {
          background: var(--app-active-color);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 10.5pt;
          cursor: pointer;
        }

        .time {
          justify-self: end;
          //background-color: red;
          font-size: 9pt;
          opacity: 0.65;
        }
      }

      .avatar {
        height: 1.75rem;
        width: 1.75rem;
        border-radius: 100%;

        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
    }
  }

  .placeholder {
    display: grid;
    align-items: center;
    justify-items: center;


    .placeholder-wrapper {
      height: 45%;
      width: 45%;
      opacity: 0.5;


      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
  }

  .input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    //padding: 0.25rem;
    background-color: transparent;

    .emoji {
      height: 1.75rem;
      width: 1.75rem;
    }

    .textarea {
      height: 100%;
      width: 100%;
      font-family: inherit;
      display: block;
      overflow: hidden;
      max-height: 5rem;
      transition: all ease-in-out 250ms;
      cursor: text;

      margin: 0;
      padding: 0;
      min-height: 100%;
      resize: none;
      border: none;
      outline: none;
      color: whitesmoke;
      font-size: 11pt;
      font-weight: normal;

      &:empty:before {
        content: "Вам есть что сказать?";
        color: grey;
      }
    }

    .send-button {
      margin-left: auto;
      height: 1.75rem;
      width: 1.75rem;
      cursor: pointer;
    }
  }

}
</style>