<template>
<div class="container">
     <div class="columns">
          <div class="column is-9">
               <section>
                    <b-tabs position="is-centered" type="is-toggle-rounded">
                         <b-tab-item label="Editor de Texto" icon="edit" icon-pack="fas">
                           <vue-pell-editor 
                              v-model="textEdit"
                              :actions="editorOptions" 
                              :content="textEdit" 
                              :style-with-css="false"
                              :classes="editorClasses"
                              default-paragraph-separator="p"
                              @change="postEditText"
                            />
                         </b-tab-item>
                         <b-tab-item label="Editor de Codigo" icon="code" icon-pack="fas">
                            <codemirror v-model="codeEdit" :options="cmOptions" @keyup.native="postCode"></codemirror>
                         </b-tab-item>
                         <b-tab-item label="Tabla de Dibujo" icon="palette" icon-pack="fas"></b-tab-item>
                    </b-tabs>
               </section>
               <!--<a @click="connect()" class="button is-vcentered is-primary is-outlined is-rounded">Conectar</a>-->
          </div>
          
          <div class="column is-3">
               <div class="card">
                    <div class="card-content" ><!---show="streams.length > 0 ? true : false">-->
                         <div id="subscribers" v-for="(stream, index) in streams" :key="index">
                            <subscriber @error="errorHandler" :opts="optsTwo" :stream="stream" :session="session"></subscriber>
                         </div>
                         <div id="subscriber"></div>
                    </div>
                    <div class="card-content center">
                         <!--<publisher :session="session" :opts="optsOne" @error="errorHandler"></publisher>-->
                         <div :id="'publisher'+index" v-for="(item, index) in statusPublisher" :key="index" v-show="item"></div>
                    </div>
                    <div class="card-footer">
                      <a :class="
                              isPublish == true ? 
                              'button is-medium is-success is-outlined card-footer-item' : 
                              'button is-medium is-danger is-outlined card-footer-item'"
                              @click="showPublish()">
                          <span class="icon is-medium">
                            <i :class="isPublish == true ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
                          </span>
                      </a>
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
               <chat class="chat"></chat>
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
import axios from '@/config/axios.js'
import Brace from "vue-bulma-brace";

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// language js
import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/paraiso-light.css'

 // require active-line.js
import'codemirror/addon/selection/active-line.js'
// styleSelectedText
import'codemirror/addon/selection/mark-selection.js'
import'codemirror/addon/search/searchcursor.js'

// hint
import'codemirror/addon/hint/show-hint.js'
import'codemirror/addon/hint/show-hint.css'
import'codemirror/addon/hint/javascript-hint.js'
import'codemirror/addon/selection/active-line.js'
// highlightSelectionMatches
import'codemirror/addon/scroll/annotatescrollbar.js'
import'codemirror/addon/search/matchesonscrollbar.js'
import'codemirror/addon/search/searchcursor.js'
import'codemirror/addon/search/match-highlighter.js'
// keyMap
import'codemirror/mode/clike/clike.js'
import'codemirror/addon/edit/matchbrackets.js'
import'codemirror/addon/comment/comment.js'
import'codemirror/addon/dialog/dialog.js'
import'codemirror/addon/dialog/dialog.css'
import'codemirror/addon/search/searchcursor.js'
import'codemirror/addon/search/search.js'
import'codemirror/keymap/sublime.js'
// foldGutter
import'codemirror/addon/fold/foldgutter.css'
import'codemirror/addon/fold/brace-fold.js'
import'codemirror/addon/fold/comment-fold.js'
import'codemirror/addon/fold/foldcode.js'
import'codemirror/addon/fold/foldgutter.js'
import'codemirror/addon/fold/indent-fold.js'
import'codemirror/addon/fold/markdown-fold.js'
import'codemirror/addon/fold/xml-fold.js'


const errorHandler = err => {
  console.log("error --> " + err);
};

export default {
  data() {
    return {
      //OpenTok
      apiKey: "46204402",
      sessionId:
        "2_MX40NjIwNDQwMn5-MTU0MDk4NzM0NzU5OX5xakFQeEJRUG81QVZVTjE0cmNnZkt5Wm5-QX4",
      token:
        "T1==cGFydG5lcl9pZD00NjIwNDQwMiZzaWc9Mjk1NjIwYTIyZjM3MDBhMmI0NmU2M2Q2MDk4MjNjMmM5ZjVhZWU5NjpzZXNzaW9uX2lkPTJfTVg0ME5qSXdORFF3TW41LU1UVTBNRGs0TnpNME56VTVPWDV4YWtGUWVFSlJVRzgxUVZaVlRqRTBjbU5uWmt0NVdtNS1RWDQmY3JlYXRlX3RpbWU9MTU0MDk4NzM0NyZyb2xlPW1vZGVyYXRvciZub25jZT0xNTQwOTg3MzQ3LjYzOTMxMTE2MTQyMTY0JmV4cGlyZV90aW1lPTE1NDE1OTIxNDcmY29ubmVjdGlvbl9kYXRhPW5hbWUlM0RKb2hubnk=",
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

      //Editor de Codigo
      codeEdit: '//Presiona click y escribe tu codigo',
      cmOptions: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        styleSelectedText: true,
        line: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        mode: 'text/javascript',
        hintOptions:{
          completeSingle: false
        },
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "monokai",
        extraKeys: { "Ctrl": "autocomplete" },
        autofocus: false
      },

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
        height: "150px",
        width: "100%"
      },
      isPublishVideo: true,
      isPublishAudio: true,

      //Editor Texto
      textEdit: "",
      editorOptions: [
        'bold',
        'underline',
        {
          name: 'italic',
          result: () => window.pell.exec('italic')
        },
        'strikethrough',
        'olist',
        {
          name: 'ulist',
          result: () => window.pell.exec('ulist')
        }
      ],
      editorPlaceholder: 'Escribe algo aqui...',
      editorClasses: {
        actionbar: 'pell-actionbar',
        button: 'pell-button',
        content: 'pell-content',
        selected: 'pell-button-selected'
      }
    };
  },
  components: { Chat, Brace, Subscriber, codemirror },

  created() {
    /*
    INICIO - OPENTOK
    */

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
        console.log("The publisher started streaming.");
      });
      this.publisher.on("streamDestroyed", function(event) {
        console.log("The publisher stopped streaming. Reason: " + event.reason);
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

    let pusher = new Pusher("0f5f2bf6cc6d01e862a4", {
      cluster: "us2",
      encrypted: true,
      authEndpoint: `${process.env.VUE_APP_API_URL}/pusher/auth`
    });

    this.channel = pusher.subscribe("private-editext");
    this.channel.bind("client-new-text", data => {
      this.setTextEdit(data)
    });

    this.channel = pusher.subscribe("private-editcode");
    this.channel.bind("client-new-code", data => {
      this.setCode(data)
    });

    /**
     FIN - PUSHER
     */
  },

  watch: {
    /*textEdit: function(newText) {
      this.channel.trigger("client-new-text", newText);
      this.$forceUpdate()
    }*/
  },

  mounted(){
    
  },

  methods: {
    errorHandler,

    isVideo() {
      if (this.isPublishVideo == true) {
        this.publisher.publishVideo(false);
        this.isPublishVideo = false;
      } else {
        this.publisher.publishVideo(true);
        this.isPublishVideo = true;
      }
      this.$forceUpdate();
    },

    isAudio() {
      if (this.isPublishAudio == true) {
        this.publisher.publishAudio(false);
        this.isPublishAudio = false;
      } else {
        this.publisher.publishAudio(true);
        this.isPublishAudio = true;
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

    postCode(e) {
      this.channel.trigger("client-new-code", this.codeEdit);
    },

    setTextEdit(newText){
      this.textEdit = newText
    },
    setCode(newCode){
      this.codeEdit = newCode
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
  max-height: 70vh;
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
</style>




