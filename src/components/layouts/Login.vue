<template>
  <div class="columns" >

    <div class="column is-one-third master">

      <section class="section">

        <p class="title is-3 has-text-centered">¡Bienvenido!</p>

        <b-field>
          <b-input placeholder="Username"
                type="text"
                icon-pack="fas"
                icon="user"
                maxlength="12"
                min="5"
                rounded
                v-model="user.username">
            </b-input>
        </b-field>

        <b-field>
          <b-input placeholder="Contraseña"
                type="password"
                icon-pack="fas"
                icon="key"
                password-reveal
                rounded
                v-model="user.password">
            </b-input>
        </b-field>

        <div class="has-text-centered">
          <a @click="login()" class="button is-vcentered is-primary is-outlined is-rounded">Iniciar Sesión</a>
        </div>
      </section>
    </div>

    <!--id="particles-js"-->
    <div  class="interactive-bg column master submaster">
      <img class="login-logo" src="img/duis-full.png">
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import service from '@/services/login.js'
import notify from '@/config/notify.js'


export default {
  name: "login",
  data() {
    return {
      show: 1,
      user: {
        username: '',
        password: ''
      }
    };
  },
  mounted(){
    //console.log(this.$router.currentRoute.name)
  },
  methods: {

    async login(){
      let data = await service(this.user.username, this.user.password)
      notify(this,data.code)
      if(data.code.split('')[0] == 'S'){
        this.$cookie.set('userId', data.data.id, { expires: '1D' })
        this.$cookie.set('username', this.user.username, { expires: '1D' })
        this.$cookie.set('role', data.data.role, { expires: '1D' })
        this.$cookie.set('name', data.data.name, { expires: '1D' })
        this.$router.push({ name: 'class' });
      }
    }

    

  }
};
</script>

<style scoped>

.master{
  display: flex;
  justify-content: center;
  align-items: center;
}


@keyframes animar{
    from{
      transform: scale(0.8);
    }
    to{
      transform : scale(1.1);
    }
}

.login-logo {
  width: 250px;
  
}

.interactive-bg {
  height: 100vh;
  background-color: #ffffff;
  -webkit-box-shadow: inset 24px 4px 64px -24px #e65c00;
  -moz-box-shadow: inset 24px 4px 64px -24px #e65c00;
  box-shadow: inset 24px 4px 64px -24px #e65c00;
  padding: 0px;
}
@media (max-width: 769px) {
  .interactive-bg{
    display: none
  }
}

.button {
  margin-top: 20px;
  margin-bottom: 20px;
  min-width: 150px;
}



</style>




