<template>
  <div>
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="false"
      :showFile="false"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom" />
  </div>
</template>

<script>
import axios from "@/config/axios.js";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

export default {
  name: "app",
  data() {
    return {
      participants: [
        {
          id: "0",
          name: "Clase",
          imageUrl: "https://avatars3.githubusercontent.com/u/1915989?s=230&v=4"
        }
      ],
      titleImageUrl: "img/duis-min.png",
      messageList: [],
      newMessagesCount: 0,
      isChatOpen: false,
      showTypingIndicator: "",
      colors: {
        header: {
          bg: "#e65c00",
          text: "#ffffff"
        },
        launcher: {
          bg: "#e65c00"
        },
        messageList: {
          bg: "#ffffff"
        },
        sentMessage: {
          bg: "#e65c00",
          text: "#ffffff"
        },
        receivedMessage: {
          bg: "#eaeaea",
          text: "#222222"
        },
        userInput: {
          bg: "#f4f7f9",
          text: "#565867"
        }
      },
      alwaysScrollToBottom: false,

      //Chatkit
      chatManager: "",
      currentUser: null,
    };
  },
  methods: {
    sendMessage(text) {},
    onMessageWasSent(message) {
      axios
        .post("/message/send", {
          roomId: this.$cookie.get('roomIdChatkit').toString(),
          userId: this.$cookie.get("userId").toString(),
          message: message.data.text
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    openChat() {
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      this.isChatOpen = false;
    }
  },

  mounted() {
    /*
    INICIO - CHATKIT
   */

    this.chatManager = new ChatManager({
      instanceLocator: process.env.VUE_APP_API_INSTANCE_LOCATOR,
      userId: this.$cookie.get("userId").toString(),
      tokenProvider: new TokenProvider({
        url:
          `${process.env.VUE_APP_API_URL}/chatkit/token`
      })
    });

    this.chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        currentUser.subscribeToRoom({
          roomId: this.$cookie.get('roomIdChatkit').toString(),
          hooks: {
            onMessage: message => {
              this.newMessagesCount = 0;
              this.messageList.push({
                type: "text",
                author:
                  message.senderId.toString() ==
                  this.$cookie.get("userId").toString()
                    ? "me"
                    : "0",
                data: {
                  text: message.text
                },
                date: new Date()
              });
              /*for (let i in this.messageList) {
                if (this.messageList[i].author != "me") {
                  this.newMessagesCount += 1;
                }
              }*/
              this.$forceUpdate();
            }
          }
        });
      })
      .catch(err => {
        console.log("Error on connection", err);
      });

    /*
    FIN - CHATKIT
   */
  }
};
</script>



