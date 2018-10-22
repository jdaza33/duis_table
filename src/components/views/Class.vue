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
     </div>
</template>

<script>

import axios from '@/config/axios.js'

export default {
  data() {
    const today = new Date()
    return {
      classroom: {
        name: '',
        teacher: '',
        topic: '',
        apiKey: process.env.VUE_APP_APIKEY_OPENTOK,
        token: 'T1==cGFydG5lcl9pZD00NjIwNDQwMiZzaWc9MTg0N2JmZDgzZGM0M2JjODU3MWVlOGI0NWQ1OTA2YmE2NzA0YTI5NjpzZXNzaW9uX2lkPTJfTVg0ME5qSXdORFF3TW41LU1UVTBNREl6TnpRM09EY3hNWDVaS3poNFYxaHVUMFZQYVZwTldWQlhPVGMyYzBVcmRWQi1RWDQmY3JlYXRlX3RpbWU9MTU0MDIzNzQ3OCZyb2xlPW1vZGVyYXRvciZub25jZT0xNTQwMjM3NDc4Ljc0ODEwNzQ0MzMzNDAmZXhwaXJlX3RpbWU9MTU0MDg0MjI3OCZjb25uZWN0aW9uX2RhdGE9bmFtZSUzREpvaG5ueQ==',
        sessionId: '2_MX40NjIwNDQwMn5-MTU0MDIzNzQ3ODcxMX5ZKzh4V1huT0VPaVpNWVBXOTc2c0UrdVB-QX4',
        date_start: new Date(),
        date_end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
      }
    };
  },

  methods: {
    save(){
      axios
      .post('/class', this.classroom)
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
            message: '[Error] No se pudo guardar la clase',
            type: 'is-danger'
          })
      })
    },

    getKeys(){
      axios
      .get('https://duislessonserver.herokuapp.com/api/sessionid')
      .then(res => {
        /*this.classroom.sessionId = res.data.sessionId
        this.classroom.token = res.data.token_id*/
        console.log('yes')
      })
      .catch(err => {
        /*this.$toast.open({
          message: '[Error] No hay conexion con la API OpenTok',
          type: 'is-danger'
        })*/
        console.log(err)
      })

      /*axios(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'same-origin',
      }).then(response => {
      })*/
      
    }
  },

  mounted(){
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
