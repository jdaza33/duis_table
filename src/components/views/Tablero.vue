<template>
<div class="container">

    <div class="columns" v-if="isClass">
      <div class="column is-1">
        <!--<p class="title is-6 has-text-centered">Menu</p>-->
        <div class="card center">
          <div class="card-content">
            <a @click="isModalClassActive = true" class="button is-large is-vcentered is-success is-outlined ismenu">
              <span class="icon is-large">
                <i class="fas fa-plus-circle"></i>
              </span>
            </a>
            <a class="button is-large is-vcentered is-danger is-outlined ismenu">
              <span class="icon is-large">
                <i class="fas fa-times-circle"></i>
              </span>
            </a>
          </div>
        </div>

      </div>

      <div class="column is-11">

        <div class="columns is-gapless is-multiline is-mobile">

          <div class="column is-one-quarter" v-for="(i,j) in dataClass" :key="j">
            <div class="card class">
              <div class="card-header">
                <p class="card-header-title">{{i.name}}</p>
                <a class="card-header-icon" aria-label="more options">
                  <b-icon :type="{ 'is-success': true }" icon="circle" pack="fas"></b-icon>
                </a>
              </div>
              <div class="card-content">
                <strong>Tema: </strong>{{i.topic}} <br>
                <strong>Profesor(a): </strong>{{i.teacher}} <br>
                <strong>Fecha inicio: </strong> {{i.date_start.substring(0,10)}} <br>
                <strong>Fecha fin: </strong> {{i.date_end.substring(0,10)}}
              </div>
              <div class="card-footer">
                <a @click="assignClas(i.sessionId, i.token)" class="card-footer-item"><strong>Tomar esta clase..</strong></a>
              </div>
            </div>
          </div>

        </div>

      </div>

      <b-modal :active.sync="isModalClassActive" has-modal-card>
          <class></class>
      </b-modal>

    </div>

    <div class="columns" v-else>
        <div class="column is-9">
              <section>
                  <b-tabs position="is-centered" type="is-toggle-rounded">
                        <b-tab-item label="Tabla de Dibujo" icon="palette" icon-pack="fas"></b-tab-item>
                        <b-tab-item label="Editor de Texto" icon="edit" icon-pack="fas"></b-tab-item>
                        <b-tab-item label="Editor de Codigo" icon="code" icon-pack="fas"></b-tab-item>
                  </b-tabs>
              </section>
              <!--<a @click="connect()" class="button is-vcentered is-primary is-outlined is-rounded">Conectar</a>-->
        </div>
        
        <div class="column is-3">
              <div class="card">
                  <div class="card-content">
                      <div id="subscribers" v-for="stream in streams" :key="stream.streamId">
                          <subscriber @error="errorHandler" :stream="stream" :session="session"></subscriber>
                      </div>
                  </div>
                  <div class="card-content">
                        <publisher :session="session" :opts="opts" @error="errorHandler"></publisher>
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
import Class from '@/components/views/Class.vue';
import axios from '@/config/axios.js'

const errorHandler = err => {
  alert(err.message);
};

export default {
  data() {
    return {
      //OpenTok
      apiKey: process.env.VUE_APP_APIKEY_OPENTOK,
      token: 'T1==cGFydG5lcl9pZD00NjIwNDQwMiZzaWc9MTg0N2JmZDgzZGM0M2JjODU3MWVlOGI0NWQ1OTA2YmE2NzA0YTI5NjpzZXNzaW9uX2lkPTJfTVg0ME5qSXdORFF3TW41LU1UVTBNREl6TnpRM09EY3hNWDVaS3poNFYxaHVUMFZQYVZwTldWQlhPVGMyYzBVcmRWQi1RWDQmY3JlYXRlX3RpbWU9MTU0MDIzNzQ3OCZyb2xlPW1vZGVyYXRvciZub25jZT0xNTQwMjM3NDc4Ljc0ODEwNzQ0MzMzNDAmZXhwaXJlX3RpbWU9MTU0MDg0MjI3OCZjb25uZWN0aW9uX2RhdGE9bmFtZSUzREpvaG5ueQ==',
      sessionId: '2_MX40NjIwNDQwMn5-MTU0MDIzNzQ3ODcxMX5ZKzh4V1huT0VPaVpNWVBXOTc2c0UrdVB-QX4',
      streams: [],
      session: null,
      opts: {
        publishAudio: true,
        publishVideo: true,
        videoSource: true,
        height: "150px",
        width: "100%"
      },

      //Config Table
      isClass: true,
      isModalClassActive: false,

      //Config Class
      dataClass: {},
      today: new Date
    };
  },
  components: { Publisher, Subscriber, Chat, Class },
  create() {
    this.session = OT.initSession(this.apiKey, this.sessionId);
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
    });
  },
  methods: {
    errorHandler,

    connect() {
      this.videoSource = true;
      this.publishVideo = true;
      this.$forceUpdate();
    },

    getClass(){
      axios
      .get('/class')
      .then(res => {
        if(res.data.res){
          this.dataClass = res.data.class
        }
      })
      .catch(err => {
        this.$toast.open({
            message: '[Error] al consultar clases.',
            type: 'is-danger'
          })
      })
    },

    assignClas(sessionId, token){
      this.sessionId = sessionId
      this.token = token
      this.isClass = false
      this.$forceUpdate();
    }
  },

  /*created() {
    this.getClass();
  },
  watch: {
    $route: "getClass"
  },*/

  mounted(){
    //this.getClass()
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

.ismenu{
  margin-bottom: 0.5em;
  margin-top: 0.3em;
}

.class{
  margin: 0 0.5em 0.5em 0.5em;
}

</style>



