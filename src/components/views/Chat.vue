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

export default {
  name: "app",
  props: ["messageList"],
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
      /*messageList: [
        { type: "text", author: `me`, data: { text: `Epalee!` } },
        { type: "text", author: `user1`, data: { text: `Chao` } },
        { type: "text", author: `me`, data: { text: `:((` } }
      ], */ newMessagesCount: 0,
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
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
    };
  },
  methods: {
    sendMessage(text) {},
    onMessageWasSent(message) {
      // called when the user sends a message

      //this.messageList = [...this.messageList, message];

      axios
        .post("/message/send", {
          roomId: "19373269",
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
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
    }
  }
};
</script>



