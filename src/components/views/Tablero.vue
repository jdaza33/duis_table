<template>
<div class="container">
     <div class="columns">
          <div class="column is-9">
               <section>
                    <b-tabs position="is-centered" type="is-toggle-rounded">
                         <b-tab-item label="Editor de Texto" icon="edit" icon-pack="fas">
                            <vue-editor v-model="textEdit" @keyup.native="postEditText()" 
                            @selection-change="postEditText()" class=""
                            :editorToolbar="toolbarEditText" ref="editor" ></vue-editor>
                         </b-tab-item>
                         <b-tab-item label="Editor de Codigo" icon="code" icon-pack="fas">
                           
                           <b-tabs size="is-small">

                             <b-tab-item :label="`Nro. ${index + 1}`" v-model="activeTabCode" 
                             v-for="(item, index) in listEditCode" :key="index" >

                              <b-field grouped>
                                  <a class="button is-success is-outlined space-min-right" @click="addTabCode()">
                                    <span class="icon is-small">
                                      <i class="fas fa-file-code"></i>
                                    </span>
                                  </a>
                                  <a class="button is-danger is-outlined space-right" @click="deleteTabCode(index)">
                                    <span class="icon is-small">
                                      <i class="fas fa-file-export"></i>
                                    </span>
                                  </a>
                                  <b-select placeholder="Lenguajes" icon="file-code" icon-pack="fas" v-model="item.cmOptions.mode">
                                      <option :value="i.mime" v-for="(i, j) in item.modes" :key="j">{{i.name}}</option>
                                  </b-select>
                                  <a class="button" @click="setCodeEdit('-', index)">
                                    <span class="icon is-small">
                                      <i class="fas fa-search-minus"></i>
                                    </span>
                                  </a>
                                  <a class="button" @click="setCodeEdit('+', index)">
                                    <span class="icon is-small">
                                      <i class="fas fa-search-plus"></i>
                                    </span>
                                  </a>
                                  
                                </b-field>
                              <codemirror v-model="item.codeEdit" :options="item.cmOptions" 
                              :style="`font-size: ${item.sizeCode}px;`"
                              @keyup.native="postCode(index)">
                              </codemirror>
                             </b-tab-item>

                             <!--<b-tab-item icon="plus" icon-pack="fas" @change="addTabCode()"></b-tab-item>-->

                           </b-tabs>
                            
                         </b-tab-item>
                         <b-tab-item label="Tabla de Dibujo" icon="palette" icon-pack="fas">
                           <paint></paint>                           
                         </b-tab-item>
                         
                    </b-tabs>
               </section>
               <!--<a @click="connect()" class="button is-vcentered is-primary is-outlined is-rounded">Conectar</a>-->
          </div>
          
          <div class="column is-3">
                <b-taglist attached>
                    <b-tag type="is-dark">Tiempo</b-tag>
                    <b-tag type="is-info">{{`${time.hour}:${time.min}:${time.s}`}}</b-tag>
                </b-taglist>
               <div class="card">
                    <div class="card-content" ><!---show="streams.length > 0 ? true : false">-->
                         <div id="subscribers" v-for="(stream, index) in streams" :key="index">
                            <subscriber @error="errorHandler" :opts="optsTwo" :stream="stream" :session="session"></subscriber>
                         </div>
                    </div>
                    <div class="card-content center">
                         <!--<publisher :session="session" :opts="optsOne" @error="errorHandler"></publisher>-->
                         <div :id="'publisher'+index" v-for="(item, index) in statusPublisher" :key="index" v-show="item"></div>
                    </div>
                    <div class="card-footer">
                      <!--<a :class="
                              isPublish == true ? 
                              'button is-medium is-success is-outlined card-footer-item' : 
                              'button is-medium is-danger is-outlined card-footer-item'"
                              @click="showPublish()">
                          <span class="icon is-medium">
                            <i :class="isPublish == true ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
                          </span>
                      </a>-->
                      <a :class="isPublishVideo == true ? 
                                'button is-medium is-success is-outlined card-footer-item' : 
                                'button is-medium is-danger card-footer-item'" 
                                @click="isVideo()">
                          <span class="icon is-medium">
                          <i class="fas fa-video"></i>
                          </span>
                      </a>
                      <a :class="isPublishAudio == true ? 
                                'button is-medium is-success is-outlined card-footer-item' : 
                                'button is-medium is-danger card-footer-item'" 
                                @click="isAudio()">
                          <span class="icon is-medium">
                          <i class="fas fa-volume-up"></i>
                          </span>
                      </a>
                    </div>
               </div>
               <chat class="chat" :messageList="messageList"></chat>
          </div>
     </div>
</div>
     
</template>

<script>
import OT from "@opentok/client";
import Publisher from "@/components/opentok/Publisher.vue";
import Subscriber from "@/components/opentok/Subscriber.vue";
import Chat from "@/components/views/Chat.vue";
import pusher from "pusher";
import axios from "@/config/axios.js";
import msDrawBoard from "msdrawboard";

import { VueEditor, Quill } from "vue2-editor";

import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

import { codemirror } from "vue-codemirror";
import ModeL from "@/utils/lenguage_mode.js";

const Stopwatch = require("node-stopwatch").Stopwatch;
const stopwatch = Stopwatch.create();

import Paint from "@/components/views/Canvas.vue";

const errorHandler = err => {
  console.log("error --> " + err);
};

export default {
  data() {
    return {
      //Config
      username: "",
      userId: "",
      classId: "",
      timer: "",
      time: {
        hour: 0,
        min: 0,
        s: 0
      },

      //OpenTok
      apiKey: process.env.VUE_APP_API_KEY_OPENTOK,
      sessionId: "",
      token: "",
      streams: [],
      session: null,

      optsOne: {
        publishAudio: true,
        publishVideo: true,
        videoSource: true,
        height: "80px",
        width: "50%"
      },

      //Pusher
      channel: {},

      //Chatkit
      chatManager: "",
      currentUser: null,

      //Chat
      messageList: [],

      //Editor de Codigo
      listEditCode: [],

      //Tab Editor de Codigo
      activeTabCode: 0,

      //Publish
      isPublish: false,
      publisher: null,
      statusPublisher: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      contPublisher: 0,
      optsTwo: {
        publishAudio: true,
        publishVideo: true,
        videoSource: true,
        height: "120px",
        width: "90%"
      },
      isPublishVideo: true,
      isPublishAudio: true,

      //Editor Texto
      textEdit: "",
      toolbarEditText: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }]
      ],

      //Canvas
      table: null,
      size: 15
    };
  },
  components: { Chat, Subscriber, codemirror, msDrawBoard, VueEditor, Paint },

  created() {
    //Timer
    stopwatch.start();
    this.timer = setInterval(() => {
      let sec = parseInt(stopwatch.elapsed.seconds);
      if (sec > 59) {
        this.time.min += 1;
        if (this.time.min == 60) {
          this.time.min = 0;
          this.time.hour += 1;
        }
        stopwatch.restart();
        this.time.s = 0;
      } else {
        this.time.s = sec;
      }
      //console.log(`Hora --> ${this.time.hour}:${this.time.min}:${this.time.s}`);
    }, 1000);

    //--------

    this.sessionId = this.$cookie.get("sessionId").toString();
    this.token = this.$cookie.get("token").toString();
    this.classId = this.$cookie.get("classId").toString();
    this.username = this.$cookie.get("username").toString();
    this.userId = this.$cookie.get("userId").toString();

    if (this.classId != undefined) {
      /*
      INICIO - OPENTOK
      */

      /*console.log(this.apiKey);
      console.log(this.sessionId);
      console.log(this.token);*/

      this.session = OT.initSession(this.apiKey, this.sessionId);
      this.session.connect(
        this.token,
        err => {
          if (err) {
            errorHandler(err);
          }
        }
      );

      if (this.publisher != null) {
        this.publisher.on("streamCreated", function(event) {
          //console.log("The publisher started streaming.");
        });
        this.publisher.on("streamDestroyed", function(event) {
          /*console.log(
            "The publisher stopped streaming. Reason: " + event.reason
          );*/
        });
      }

      this.session.on("streamCreated", event => {
        this.streams.push(event.stream);
      });
      this.session.on("streamDestroyed", event => {
        const idx = this.streams.indexOf(event.stream);
        if (idx > -1) {
          this.streams.splice(idx, 1);
        }
      });

      /**
       FIN - OPENTOK
       */

      /**
       INICIO - PUSHER
       */

      let pusher = new Pusher(process.env.VUE_APP_API_KEY_PUSHER, {
        cluster: process.env.VUE_APP_API_CLUSTER_PUSHER,
        encrypted: true,
        forceTLS: true,
        authEndpoint: `${process.env.VUE_APP_API_TWO_URL}/api/pusher/auth`
      });

      this.channel = pusher.subscribe(`private-${this.classId}`);
      this.channel.bind("client-new-text", data => {
        this.setTextEdit(data);
      });

      //this.channel = pusher.subscribe("private-editcode");
      this.channel.bind("client-new-code", data => {
        this.setCode(data);
      });

      /**
       FIN - PUSHER
       */
    } else {
      this.$router.push({ name: "class" });
    }
  },

  mounted() {
    
    this.addTabCode()

    //Acceso a la video llamada
    this.accessVideCam();

    /*
    INICIO - CHATKIT
   */

    this.chatManager = new ChatManager({
      instanceLocator: "v1:us1:8bd51fc5-238c-41f3-9cf4-d998d087171b",
      //instanceLocator: "v1:us1:8521a6b1-9fd7-432f-a90f-03f772f111e0",
      userId: this.$cookie.get("userId").toString(),
      tokenProvider: new TokenProvider({
        url:
          "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/8bd51fc5-238c-41f3-9cf4-d998d087171b/token"
      })
    });

    this.chatManager
      .connect()
      .then(currentUser => {
        //console.log("Successful connection", currentUser);
        this.currentUser = currentUser;
        currentUser.subscribeToRoom({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onMessage: message => {
              this.messageList.push({
                type: "text",
                author:
                  message.senderId.toString() ==
                  this.$cookie.get("userId").toString()
                    ? "me"
                    : "0",
                data: {
                  text: message.text
                }
              });
              //console.log(`Received new message: ${message.text}`);
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
  },

  watch: {
    /*textEdit: function(newText) {
      if(this.textEdit == newText){
        this.postEditText()
      }
    }*/
  },

  methods: {
    errorHandler,

    proa() {
      console.log("SII");
    },

    addTabCode() {
      let proa = {
        codeEdit: "//Escribe tu codigo",
        modes: ModeL,
        sizeCode: 14,
        cmOptions: {
          tabSize: 2,
          styleActiveLine: true,
          lineNumbers: true,
          styleSelectedText: true,
          line: true,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          highlightSelectionMatches: {
            showToken: /\w/,
            annotateScrollbar: true
          },
          mode: "text/javascript",
          hintOptions: {
            completeSingle: false
          },
          keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: "monokai",
          extraKeys: { Ctrl: "autocomplete" },
          autofocus: true
        }
      };
      this.listEditCode.push(proa);
      //console.log('add model')
    },

    finishClass() {
      //clearInterval(this.timer);
      //stop()
    },

    setFocusEditText() {
      this.$refs.editor.quill.focus();
    },

    setBlurEditText() {
      this.$refs.editor.quill.blur();
    },

    setCodeEdit(op, index) {
      if (op == "-") {
        this.listEditCode[index].sizeCode -= 1
        //this.sizeCode -= 1;
      }
      if (op == "+") {
        this.listEditCode[index].sizeCode += 1
        //this.sizeCode += 1;
      }
    },

    accessVideCam() {
      this.$dialog.confirm({
        title: "Acceso a videollamada",
        message: "¿Desea habilitar el <br> acceso a la videollamada?",
        confirmText: "¡Si claro!",
        cancelText: "No",
        type: "is-success",
        hasIcon: true,
        iconPack: "fas",
        icon: "video",
        onConfirm: () => {
          this.$toast.open("Videollamada: OK");
          this.showPublish();
        },
        onCancel: () => {}
      });
    },

    isVideo() {
      if (this.isPublish == true) {
        if (this.isPublishVideo == true) {
          this.publisher.publishVideo(false);
          this.isPublishVideo = false;
        } else {
          this.publisher.publishVideo(true);
          this.isPublishVideo = true;
        }
        if (this.isPublishVideo == false && this.isPublishAudio == false) {
          this.showPublish();
        }
      } else if (this.isPublish == false) {
        this.showPublish();
        this.publisher.publishAudio(false);
        this.isPublishAudio = false;
      }

      this.$forceUpdate();
    },

    isAudio() {
      if (this.isPublish == true) {
        if (this.isPublishAudio == true) {
          this.publisher.publishAudio(false);
          this.isPublishAudio = false;
        } else {
          this.publisher.publishAudio(true);
          this.isPublishAudio = true;
        }
        if (this.isPublishVideo == false && this.isPublishAudio == false) {
          this.showPublish();
        }
      } else if (this.isPublish == false) {
        this.showPublish();
        this.publisher.publishVideo(false);
        this.isPublishVideo = false;
      }

      this.$forceUpdate();
    },

    showPublish() {
      if (this.isPublish == false) {
        this.statusPublisher[this.contPublisher] = true;

        this.publisher = OT.initPublisher(
          `publisher${this.contPublisher}`,
          this.optsOne,
          err => {
            if (err) console.log(err);
          }
        );
        this.session.publish(this.publisher, err => {
          if (err) {
            console.log("error", err);
          }
        });

        this.isPublish = true;
        this.contPublisher += 1;
      } else {
        this.session.unpublish(this.publisher);
        this.publisher = null;
        this.isPublish = false;
        this.isPublishVideo = true;
        this.isPublishAudio = true;
        this.statusPublisher[this.contPublisher - 1] = true;
      }
      this.$forceUpdate();
    },

    //Pusher
    postEditText(e) {
      this.channel.trigger("client-new-text", this.textEdit);
    },

    postCode(index) {
      this.channel.trigger("client-new-code", this.listEditCode);
    },

    setTextEdit(newText) {
      this.setBlurEditText();
      this.textEdit = newText;
    },
    setCode(data) {
      this.listEditCode = data;
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  margin: 0;
  padding: 0px 30px 0px 30px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style>
.ql-editor {
  min-height: 500px;
  max-height: 50vh;
}

.pell-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 30px;
  outline: 0;
  vertical-align: bottom;
  width: 30px;
}

.CodeMirror {
}

.space-right{
  margin-right: 20px;
}
.space-min-right{
  margin-right: 10px;
}
</style>







