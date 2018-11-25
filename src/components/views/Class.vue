<template>
  <div class="container">
    <div class="columns">
      <div class="column is-1">
        <!--<p class="title is-6 has-text-centered">Menu</p>-->
        <div class="card center">
          <div class="card-content">
            <a @click="role == 'teacher' ? isModalClassActive = true : notifyStudent('W001')" 
            class="button is-large is-vcentered is-success is-outlined ismenu">
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
                <strong>Tema: </strong>{{i.theme}} <br>
                <strong>Profesor(a): </strong>{{i.teacher_name}} <br>
                <strong>Fecha inicio: </strong> {{i.date_start.substring(0,10)}} <br>
                <!--<strong>Fecha fin: </strong> {{i.due_date.substring(0,10)}}-->
              </div>
              <div class="card-footer">
                <a @click="assignClass(i._id ,i.sessionId, i.token, i.roomIdChatkit)" class="card-footer-item"><strong>Ir a la clase</strong></a>
              </div>
            </div>
          </div>

        </div>

      </div>

      <b-modal :active.sync="isModalClassActive" has-modal-card>
          <modal-class></modal-class>
      </b-modal>

    </div>
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
import axios from "@/config/axios.js";
import ModalClass from "@/components/views/ModalClass";
import notify from "@/config/notify.js";
import service from '@/services/class.js'

export default {
  data() {
    return {
      isModalClassActive: false,

      //Config Class
      dataClass: {},
      today: new Date(),
      role: this.$cookie.get("role"),

      isFullPage: true,
      isLoading: false
    };
  },

  components: { ModalClass },

  methods: {
    async getClass() {
      await axios
        .get("/class")
        .then(res => {
          if (res.data.res) {
            this.dataClass = res.data.class;
          }
        })
        .catch(err => {
          console.log(err)
          notify(this, 'E004')
        });
    },

    async assignClass(idClass, sessionId, token, roomIdChatkit) {

      this.isLoading = true

      let temp = await service({
        id: roomIdChatkit,
        userId: this.$cookie.get('userId').toString(),
        userName: this.$cookie.get('name').toString()
      }, 'addUserChatkit')

      if(temp.code.split('')[0] == 'I'){
        this.$cookie.set("classId", idClass, { expires: "12h" });
        this.$cookie.set("sessionId", sessionId, { expires: "12h" });
        this.$cookie.set("token", token, { expires: "12h" });

        this.$cookie.set("isClass", true, { expires: "12h" });

        this.$cookie.set("isTime", false, { expires: "12h" });
        this.$cookie.set("time_h", 0, { expires: "12h" });
        this.$cookie.set("time_m", 0, { expires: "12h" });
        this.$cookie.set("time_s", 0, { expires: "12h" });

        this.$cookie.set("videoShared", 'N', { expires: "12h" });
        this.$cookie.set("audioShared", 'N', { expires: "12h" });

        this.$cookie.set("roomIdChatkit", roomIdChatkit, { expires: "12h" });

        this.$router.push({ name: "tablero" });
        this.isLoading = false
      }else{
        this.isLoading = false
      }
      
      
    },

    notifyStudent(code) {
      notify(this, code);
    }
  },

  mounted() {
    this.getClass();
  },
  create() {},
  watch: {
    isModalClassActive: function() {
      this.getClass();
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
.ismenu {
  margin-bottom: 0.5em;
  margin-top: 0.3em;
}
.class {
  margin: 0 0.5em 0.5em 0.5em;
}
</style>