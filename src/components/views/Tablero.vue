<template>
<div class="container">
     <div class="columns">
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
                         <div id="subscribers" v-for="stream in streams" :key="stream.streamId" v-if="streams.length > 0">
                              <subscriber @error="errorHandler" :opts="opts" :stream="stream" :session="session"></subscriber>
                         </div>
                         <div v-else>
                              <p class="title is-6">Esperando...</p>
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

const errorHandler = err => {
  alert(err.message);
};

export default {
  data() {
    return {
      //OpenTok
      apiKey: "46204402",
      sessionId:
        "2_MX40NjIwNDQwMn5-MTUzOTgxNjIzOTg1Nn4zaFBSZDQ0VHNuZG5sOFgvbFpLN3l1cHV-QX4",
      token:
        "T1==cGFydG5lcl9pZD00NjIwNDQwMiZzaWc9MzE5Y2I5MWIzNjY2MWNjY2JjYTQyN2M2Y2U1ZjNiYTI2ZWUwZDkyMDpzZXNzaW9uX2lkPTJfTVg0ME5qSXdORFF3TW41LU1UVXpPVGd4TmpJek9UZzFObjR6YUZCU1pEUTBWSE51Wkc1c09GZ3ZiRnBMTjNsMWNIVi1RWDQmY3JlYXRlX3RpbWU9MTUzOTgxNjIzOSZyb2xlPW1vZGVyYXRvciZub25jZT0xNTM5ODE2MjM5Ljg5NDExNzY5NDg0MTEzJmV4cGlyZV90aW1lPTE1NDA0MjEwMzkmY29ubmVjdGlvbl9kYXRhPW5hbWUlM0RKb2hubnk=",
      streams: [],
      session: null,
      opts: {
        publishAudio: true,
        publishVideo: true,
        videoSource: true,
        height: "150px",
        width: "100%"
      }
    };
  },
  components: { Publisher, Subscriber, Chat },
  created() {
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



