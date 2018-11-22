<template>
     <div>
        <div class="modal-card" style="width: 500px">
          <header class="modal-card-head">
            <p class="modal-card-title has-text-centered">Nuevo Reclamo</p>
          </header>
          <section class="modal-card-body">

            <div class="content-card">
              <b-input placeholder="Asunto"
                  type="text"
                  icon-pack="fas"
                  icon="bullhorn"
                  maxlength="25"
                  min="10"
                  v-model="abuse.issue"
                  rounded>
              </b-input>

              <b-input placeholder="Descripción"
                  type="textarea"
                  maxlength="75"
                  min="10"
                  v-model="abuse.description"
                  rounded>
              </b-input>
            </div>

          </section>
          <footer class="modal-card-foot center">
            <a @click="$parent.close()" class="button is-vcentered is-danger is-outlined is-rounded">Salir</a>
            <a @click="save()" class="button is-vcentered is-success is-rounded">Guardar</a>
          </footer>
        </div>
        <!--<b-loading :is-full-page="isFullPage" :active.sync="isLoading"></b-loading>-->
     </div>
</template>

<script>
import axios from 'axios'
import notify from '@/config/notify.js'

export default {
  data() {
    const today = new Date()
    return {
      isLoading: false,
      isFullPage: true,
      abuse: {
        issue: '',
        user_id: this.$cookie.get('userId'),
        description: ''
      }
    };
  },
  methods: {
    save(){
      axios
      .post(`${process.env.VUE_APP_API_TWO_URL}/api/claim?_token=${process.env.VUE_APP_API_KEY_OPENTOK}`, this.abuse)
      .then(res => {
        if(res.data.code == 200){
          this.$toast.open({
            message: 'Reclamo enviado',
            type: 'is-success'
          })
          this.$parent.close()
        }
      })
      .catch(err => {
        this.$toast.open({
            message: 'No se pudo enviar el reclamo',
            type: 'is-danger'
          })
      })
    },
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