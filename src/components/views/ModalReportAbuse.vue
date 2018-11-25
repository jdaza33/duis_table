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
import service from '@/services/abuse.js'
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
    async save(){
      let temp = await service(this.abuse)
      notify(this, temp.code)
      this.$parent.close()
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