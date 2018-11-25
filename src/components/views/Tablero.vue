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
                            <br>
                            <a class="button is-vcentered is-success is-rounded" @click="saveEditText()" target="_blank">
                              <span class="icon">
                                <i class="fas fa-save"></i>
                              </span>
                              <span>Guardar Texto</span>
                            </a>
                         </b-tab-item>
                         <b-tab-item label="Editor de Codigo" icon="code" icon-pack="fas">
                           
                           <b-tabs size="is-small" v-model="activeTabCode">

                             <b-tab-item :label="`Nro. ${index + 1}`" 
                             v-for="(item, index) in listEditCode" :key="index" >

                              <b-field grouped>
                                  <a class="button is-success is-outlined space-min-right" @click="addTabCode()">
                                    <span class="icon is-small">
                                      <i class="fas fa-file-code"></i>
                                    </span>
                                  </a>
                                  <div v-if="index != 0">
                                    <a class="button is-danger is-outlined space-right" @click="deleteTabCode(index)">
                                      <span class="icon is-small">
                                        <i class="fas fa-file-export"></i>
                                      </span>
                                    </a>
                                  </div>
                                  
                                  <b-select placeholder="Lenguajes" icon="file-code" icon-pack="fas" v-model="item.cmOptions.mode">
                                      <option :value="i.mime" v-for="(i, j) in item.modes" :key="j">{{i.name}}</option>
                                  </b-select>
                                  <a class="button" @click="setCodeEdit('-', index)">
                                    <span class="icon is-small">
                                      <i class="fas fa-search-minus"></i>
                                    </span>
                                  </a>
                                  <a class="button space-right" @click="setCodeEdit('+', index)">
                                    <span class="icon is-small">
                                      <i class="fas fa-search-plus"></i>
                                    </span>
                                  </a>
                                  <a class="button is-primary is-outlined" @click="saveCode(index)">
                                    <span class="icon is-small">
                                      <i class="fas fa-save"></i>
                                    </span>
                                  </a>
                                  
                              </b-field>
                              <codemirror v-model="item.codeEdit" :options="item.cmOptions" 
                              :style="`font-size: ${item.sizeCode}px;`"
                              @keyup.native="postCode(index)">
                              </codemirror>
                              
                             </b-tab-item>

                           </b-tabs>
                            
                         </b-tab-item>
                         <b-tab-item label="Tabla de Dibujo" icon="palette" icon-pack="fas">
                           <paint></paint>                           
                         </b-tab-item>
                         
                    </b-tabs>
               </section>
          </div>
          
          <div class="column is-3">
                <b-taglist attached>
                    <b-tag type="is-dark">Tiempo HH:MM:SS</b-tag>
                    <b-tag type="is-info">{{`${time.hour}:${time.min}:${time.s}`}}</b-tag>
                </b-taglist>
               <div class="card">
                    <div class="card-content" ><!---show="streams.length > 0 ? true : false">-->
                         <div id="subscribers" v-for="(stream, index) in streams" :key="index">
                            <subscriber @error="errorHandler" :opts="optsTwo" :stream="stream" :session="session"></subscriber>
                         </div>
                    </div>
                    <div class="card-content center">
                         <div :id="'publisher'+index" v-for="(item, index) in statusPublisher" :key="index" v-show="item"></div>
                    </div>
                    <div class="card-footer">
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
import Subscriber from "@/components/opentok/Subscriber.vue";
import Chat from "@/components/views/Chat.vue";
import pusher from "pusher";
import axios from "@/config/axios.js";
import msDrawBoard from "msdrawboard";
import notify from '@/config/notify.js'

import { VueEditor, Quill } from "vue2-editor";

import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

import { codemirror } from "vue-codemirror";
import ModeL from "@/utils/lenguage_mode.js";

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

      //Editor de Codigo
      listEditCode: [],
      lenguages: ModeL,

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
        width: "100%"
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

    /**
     * Obtenemos el tiempo con un setInterval y lo insertamos en la cookie para almacenamiento
     */

    this.time.s = parseInt(this.$cookie.get('time_s'));
    this.time.min = parseInt(this.$cookie.get('time_m'));
    this.time.hour = parseInt(this.$cookie.get('time_h'));

    this.timer = setInterval(() => {
      let isTime = JSON.parse(this.$cookie.get('isTime'))
      let sec = isTime ? parseInt(this.$cookie.get('time_s')) : 1;
      this.$cookie.set('isTime', true)
      sec += 1
      if (sec > 59) {
        
        let temp_m = parseInt(this.$cookie.get('time_m'))
        this.$cookie.set('time_m', temp_m + 1)

        this.time.min = parseInt(this.$cookie.get('time_m'));

        if (this.time.min > 59) {

          this.$cookie.set('time_m', 0)
          let temp_h = parseInt(this.$cookie.get('time_h'))
          this.$cookie.set('time_h', temp_h + 1)

          this.time.min = 0
          this.time.hour = parseInt(this.$cookie.get('time_h'));
        }
        this.time.s = 0;
        this.$cookie.set('time_s', 0)
      } else {
        this.$cookie.set('time_s', sec)
        this.time.s = parseInt(this.$cookie.get('time_s'));
      }
      //console.log(`Hora --> ${this.time.hour}:${this.time.min}:${this.time.s}`);
    }, 1000);


    //----------------------------------------------------


    /**
     * Guardamos las cookies en variables internas
     */
    this.sessionId = this.$cookie.get("sessionId").toString();
    this.token = this.$cookie.get("token").toString();
    this.classId = this.$cookie.get("classId").toString();
    this.username = this.$cookie.get("username").toString();
    this.userId = this.$cookie.get("userId").toString();

    //Este if es para verificar que este en una clase, si no esta, se devuelve a la pantalla de clases
    if (this.classId != undefined) {

      /*
      INICIO - OPENTOK
      */

      /**
       * Instanciamos la api de Opentok pasando el apikey y el sessionid
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


      //----------------------------------------------------


      /**
       INICIO - PUSHER
       */
      
      /**
       * En esta parte instanciamos el canal de pusher para recibir todo lo que se envie por ese canal
       */


      let pusher = new Pusher(process.env.VUE_APP_API_KEY_PUSHER, {
        cluster: process.env.VUE_APP_API_CLUSTER_PUSHER,
        encrypted: true,
        forceTLS: true,
        authEndpoint: `${process.env.VUE_APP_API_TWO_URL}/api/pusher/auth`
      });

      //En este caso le damos un nombre, private-[id de la clase actual]
      this.channel = pusher.subscribe(`private-${this.classId}`);

      //Recibimos datos por el canal del editor de texto
      this.channel.bind("client-new-text", data => {
        this.setTextEdit(data);
      });

      //Recibimos datos por el canal del editor de codigo
      this.channel.bind("client-new-code", data => {
        this.setCode(data);
      });

      //Recibimos si la contraparte entro a la clase
      this.channel.bind("client-new-status", data => {
        if(data != this.$cookie.get('userId').toString()){
          this.postEditText('');
          this.postCode('');
        }
      });

      /**
       FIN - PUSHER
       */
    } else {
      this.$router.push({ name: "class" });
    }
  },

  mounted() {

    //Enviamos a la contraparte que acabamos de entrar a la clase
    setTimeout(() => {
      this.channel.trigger("client-new-status", this.$cookie.get('userId').toString());
    },2000)

    //Iniciar una pestaña en el editor
    this.addTabCode();

    //Acceso a la video llamada
    this.accessVideCam();

  },

  methods: {
    errorHandler,

    /**
     * Agregar una pestaña al editor de codigo
     */
    addTabCode() {
      let model = {
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
      this.listEditCode.push(model);
      this.$forceUpdate()
    },

    /**
     * Eliminar una pestaña del editor de codigo
     * @param index Posicion del array del editor de codigo
     */
    deleteTabCode(index){
      this.listEditCode.splice(index, 1)
      this.activeTabCode -= 1
      this.$forceUpdate()
    },

    /**
     * Enfocar el editor de codigo
     */
    setFocusEditText() {
      this.$refs.editor.quill.focus();
    },

    /**
     * Desenfocar el editor de codigo
     */
    setBlurEditText() {
      this.$refs.editor.quill.blur();
    },

    /**
     * Zoom del editor de codigo
     * @param op Es la operacion suma o resta para el zoom
     * @param index Es la posicion del array que vamos a utilizar
     */
    setCodeEdit(op, index) {
      if (op == "-") {
        this.listEditCode[index].sizeCode -= 1;
      }
      if (op == "+") {
        this.listEditCode[index].sizeCode += 1;
      }
    },

    /**
     * Confirmacion de acceso a la videollamada una vez este dentro de la clase
     */
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

    /**
     * Habilita o inhabilita la camara de una videollamada
     */
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

    /**
     * Habilita o inhabilita el audio de una videollamada
     */
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

    /**
     * Activa el canal de opentok para realizar la videollamada
     */
    async showPublish() {
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

    /**
     * Envia por el canal de pusher el texto del editor de texto
     */
    postEditText(e) {
      this.channel.trigger("client-new-text", this.textEdit);
    },

    /**
     * Envia por el canal de pusher el texto del editor de codigo
     */
    postCode(index) {
      this.channel.trigger("client-new-code", this.listEditCode);
    },

    /**
     * Inserta en el editor de texto el texto que recibe por parametro
     * @param newText Es el nuevo texto que insertaremos en el editor de texto
     */
    setTextEdit(newText) {
      this.setBlurEditText();
      this.textEdit = newText;
    },

    /**
     * Inserta en el array la nueva data que recibe por parametro
     * @param data Es el array donde viene la data, texto, pestañas y configuracion del editor
     */
    setCode(data) {
      this.listEditCode = data;
    },

    /**
     * Descarga el contenido que tenemos en el editor de texto con extension .html
     */
    async saveEditText(){
        await axios
        .post('/download', {
          text: this.textEdit,
          ext: 'html'
        }, {
          responseType: 'blob'
        })
        .then(response => {
          notify(this, 'I004')
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `file.html`);
          document.body.appendChild(link);
          link.click();
        })
        .catch(async err => {
          console.log(err);
          notify(this, 'E009')
        });
    },

    /**
     * Descarga la pestaña actual del editor de codigo con la extension que tiene actualmente 
     * @param index Posicion del array del editor de codigo
     */
    async saveCode(index){
      let array = this.lenguages
      let ext = null
      for (let i in array){
        if(array[i].mime == this.listEditCode[index].cmOptions.mode){
          ext = array[i].ext
        }
      }
      await axios
        .post('/download', {
          text: this.listEditCode[index].codeEdit,
          ext
        }, {
          responseType: 'blob'
        })
        .then(response => {
          notify(this, 'I004')
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `file.${ext}`);
          document.body.appendChild(link);
          link.click();
        })
        .catch(async err => {
          console.log(err);
          notify(this, 'E009')
        });
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

.space-right {
  margin-right: 20px;
}
.space-min-right {
  margin-right: 10px;
}
</style>







