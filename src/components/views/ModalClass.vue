<template>
     <div>
        <div class="modal-card" style="width: 500px">
          <header class="modal-card-head">
            <p class="modal-card-title has-text-centered">Nueva clase</p>
          </header>
          <section class="modal-card-body">

            <div class="content-card">
              <b-input placeholder="Nombre de la clase"
                  type="text"
                  icon-pack="fas"
                  icon="chalkboard-teacher"
                  maxlength="25"
                  min="10"
                  v-model="classroom.name"
                  rounded>
              </b-input>

              <b-input placeholder="Tema de la clase"
                  type="text"
                  icon-pack="fas"
                  icon="chalkboard-teacher"
                  maxlength="25"
                  min="10"
                  v-model="classroom.topic"
                  rounded>
              </b-input>

              <b-input placeholder="Profesor"
                  type="text"
                  icon-pack="fas"
                  icon="graduation-cap"
                  maxlength="20"
                  min="10"
                  v-model="classroom.teacher"
                  rounded>
              </b-input>

              <b-datepicker
                  placeholder="Fecha de inicio"
                  icon="calendar-alt"
                  icon-pack="fas"
                  rounded
                  v-model="classroom.date_start"
                  disabled>
              </b-datepicker>

              <b-datepicker
                  placeholder="Fecha de fin"
                  icon="calendar-alt"
                  icon-pack="fas"
                  rounded
                  v-model="classroom.date_end"
                  disabled>
              </b-datepicker>
            </div>

          </section>
          <footer class="modal-card-foot center">
            <a @click="$parent.close()" class="button is-vcentered is-danger is-outlined is-rounded">Salir</a>
            <a @click="save()" class="button is-vcentered is-success is-rounded">Guardar</a>
          </footer>
        </div>
        <b-loading :is-full-page="isFullPage" :active.sync="isLoading"></b-loading>
     </div>
</template>

<script>
import axios from '@/config/axios.js'
import axiostwo from 'axios'
export default {
  data() {
    const today = new Date()
    return {
      isLoading: false,
      isFullPage: true,
      classroom: {
        name: '',
        teacher: '',
        topic: '',
        token: '',
        sessionId: '',
        date_start: new Date(),
        date_end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
      }
    };
  },
  methods: {
    save(){
      axios
      .post('/class/new', this.classroom)
      .then(res => {
        if(res.data.res){
          this.$toast.open({
            message: '[OK] Clase creada con exito',
            type: 'is-success'
          })
          this.$parent.close()
        }
      })
      .catch(err => {
        this.$toast.open({
            message: '[Error] No se pudo crear la clase',
            type: 'is-danger'
          })
      })
    },
    getKeys(){
      this.isLoading = true
      axiostwo
      .get(`${process.env.VUE_APP_API_TWO_URL}/api/sessionid?_token=${process.env.VUE_APP_API_KEY_OPENTOK}&user_id=${this.$cookie.get('userId')}&session_role=m`)
      .then(res => {
        this.isLoading = false
        this.classroom.sessionId = res.data.session_id
        this.classroom.token = res.data.token_id
      })
      .catch(err => {
        this.isLoading = false
        console.log(err)
      })
      /*axiostwo(`${process.env.VUE_APP_API_TWO_URL}/api/sessionid?_token=${process.env.VUE_APP_API_KEY_OPENTOK}&user_id=${this.$cookie.get('userId')}&session_role=m`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'same-origin',
      }).then(response => {
        this.isLoading = false
        this.classroom.sessionId = res.data.sessionId
        this.classroom.token = res.data.token_id
      }).catch(err => {
        this.isLoading = false
        console.log(err)
      })*/
      
    }
  },
  mounted(){
    this.getKeys()
  },
  create(){
    //this.getKeys()
  }
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-card-foot {
  height: 50px;
}
.content-card {
  margin: 0 2em 0 2em;
}
</style>