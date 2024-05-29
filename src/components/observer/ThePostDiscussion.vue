<template>
  <div class="discussion">
    <div class="window">
      <div ref="messagesElement" class="messages">
        <div v-if="messages.length ===0" class="placeholder">
          <div class="placeholder-wrapper">
            <img :src="commentsIcon" alt="" />
          </div>
        </div>
        <TransitionGroup name="list">
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
        </TransitionGroup>
      </div>
    </div>

    <div class="input">
      <EmojiButton class="emoji" @emoji="onEmoji" />
      <span
        ref="textarea"
        class="textarea"
        contenteditable
        role="textbox"
        @keydown.enter.prevent.stop="sendComment"
      >
      </span>
      <img :src="sendIcon" alt="" class="send-button" @click="sendComment">
    </div>
  </div>
</template>

<script setup>

import sendIcon from "@/assets/icons/send.svg";
import EmojiButton from "@/components/buttons/EmojiButton.vue";
import { onUnmounted, onUpdated, ref } from "vue";
import { useUserInfoStore } from "@/stores/userinfo";
import { getMessages, resolveAvatarSrc, wsUrl } from "@/services/api";
import commentsIcon from "@/assets/icons/comments.svg";
import IconButton from "@/components/buttons/IconButton.vue";
import { fmtTime } from "@/services/datetime";

const value = ref("");
const rows = ref(1);
const textarea = ref(null);
const messagesElement = ref(null);

const props = defineProps({
  post_id: String
});

const maxlength = 500;
const userinfo = useUserInfoStore();
const me = await userinfo.get(true);
const messages = ref([]);
const connection = new WebSocket(`${wsUrl}/discussions/${props.post_id}`);
const response = await getMessages(props.post_id);


if (response.ok) {
  messages.value.push(...(await response.json()));
}
connection.onmessage = function(event) {
  let msg = JSON.parse(event.data);
  messages.value.push(msg);
};

connection.onopen = function() {
  console.log("Successfully connected to the websocket server...");
};

function onEmoji(emoji) {
  if (!(textarea.value.innerText.length + emoji.length < maxlength)) {
    return;
  }
  textarea.value.innerText += emoji;
}


function sendComment() {
  if (textarea.value.innerText.length === 0) return;
  connection.send(JSON.stringify({
    "text": textarea.value.innerText.slice(0, 500)
  }));
  textarea.value.innerText = "";
}

onUpdated(() => {
  messagesElement.value.scroll({ top: messagesElement.value.scrollHeight, behavior: "smooth" });
});

onUnmounted(() => {
  connection.close();
});
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}

.discussion {
  height: 100%;
  width: 100%;
  display: grid;
  min-height: 0;
  min-width: 0;
  grid-gap: 0.5rem;
  grid-template-columns: 100%;
  grid-template-rows: minmax(0, 1fr) auto;

  .window {
    .messages {
      display: grid;
      grid-gap: 0.5rem;
      grid-template-rows: 1fr;
      grid-auto-rows: auto;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      scroll-behavior: smooth;
      padding: 0 0.5rem 0.5rem 0;

      &::-webkit-scrollbar {
        width: 0.5rem;
        border-radius: 5px;
        overflow: clip;
        height: 0.25em;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 5px;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.65);;
      }

      .message {

        align-items: end;
        display: grid;
        color: var(--app-text-color);
        border-radius: 15px;
        font-size: 12pt;
        gap: 0.5rem;
        grid-template-columns: 2rem auto;
        justify-self: start;
        max-width: calc(100% - 2.5rem);


        &--myself {
          grid-template-columns: auto 2rem;
          justify-self: end;
        }

        .content {
          box-shadow: var(--app-default-shadow);
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
            user-select: none;
          }

          .time {
            justify-self: end;
            //background-color: red;
            font-size: 9pt;
            opacity: 0.65;
            user-select: none;
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
  }

  .placeholder {
    height: 100%;
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