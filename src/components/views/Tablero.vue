<template>
<div class="container">
     <div class="columns">
          <div class="column is-9">
               <section>
                    <b-tabs position="is-centered" type="is-toggle-rounded">
                         <b-tab-item label="Editor de Texto" icon="edit" icon-pack="fas">
                           <vue-editor v-model="textEdit" id="editor"></vue-editor>
                         </b-tab-item>
                         <b-tab-item label="Editor de Codigo" icon="code" icon-pack="fas">
                           <brace style="height: 500px" 
                              :fontsize="'12px'" 
                              :theme="'monokai'" 
                              :mode="'javascript'"
                              :codefolding="'markbegin'"
                              :softwrap="'free'"
                              :selectionstyle="'text'"
                              :highlightline="true">
                            </brace>
                         </b-tab-item>
                         <b-tab-item label="Tabla de Dibujo" icon="palette" icon-pack="fas"></b-tab-item>
                    </b-tabs>
               </section>
               <!--<a @click="connect()" class="button is-vcentered is-primary is-outlined is-rounded">Conectar</a>-->
          </div>
          
          <div class="column is-3">
               <div class="card">
                    <div class="card-content">
                         <div id="subscribers" v-for="stream in streams" :key="stream.streamId">
                              <subscriber @error="errorHandler" :opts="optsTwo" :stream="stream" :session="session"></subscriber>
                         </div>
                    </div>
                    <div class="card-content center">
                         <publisher :session="session" :opts="optsOne" @error="errorHandler"></publisher>
                    </div>
                    <div class="card-footer">
                      <a class="card-footer-item">Save</a>
                      <a class="card-footer-item">Edit</a>
                      <a class="card-footer-item">Delete</a>
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
import { VueEditor } from "vue2-editor";

import Brace from 'vue-bulma-brace'


const errorHandler = err => {
  alert(err.message);
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
      optsTwo: {
        publishAudio: true,
        publishVideo: true,
        videoSource: true,
        height: "150px",
        width: "100%"
      },
      optsOne: {
        publishAudio: true,
        publishVideo: true,
        videoSource: true,
        height: "80px",
        width: "50%"
      },

      //Editor de Texto
      textEdit: '',

      //Editor de Codigo
      code: 'const noop = () => {}'
    };
  },
  components: { Publisher, Subscriber, Chat, VueEditor, Brace},
  created() {
   /* this.session = OT.initSession(this.apiKey, this.sessionId);
    this.session.connect(this.token, err => {
      if (err) {
        errorHandler(err);
      }
    });
    this.session.on("streamCreated", event => {
      this.streams.push(event.stream);
    });
    this.session.on("streamDestroyed", event => {
      const idx = this.streams.indexOf(event.stream);
      if (idx > -1) {
        this.streams.splice(idx, 1);
      }
    });*/
  },
  methods: {
    errorHandler,

    connect() {
      this.videoSource = true;
      this.publishVideo = true;
      this.$forceUpdate();
    },

    //Editor de Codigo

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
</style>




