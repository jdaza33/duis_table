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
          <a @click="go('class')" class="button is-vcentered is-primary is-outlined is-rounded">Iniciar Sesión</a>
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
    console.log(this.$router.currentRoute.name)
  },
  methods: {

    go(route) {
      if(this.user.username == 'profesor' && this.user.password == '12345'){
        this.$cookie.set('userId', '1', { expires: '1D' })
        this.$cookie.set('username', 'profesor', { expires: '1D' })
        this.$router.push({ name: route });
      }else if(this.user.username == 'alumno' && this.user.password == '12345'){
        this.$cookie.set('userId', '2', { expires: '1D' })
        this.$cookie.set('username', 'alumno', { expires: '1D' })
        this.$router.push({ name: route });
      }else{
        this.$toast.open({
          message: '[Error] usuario o clave incorrecta',
          type: 'is-danger'
        })
      }
      
    },

    async login(route){
      await axios
      .post(`${process.env.VUE_APP_API_TWO_URL}/api/login?_token=${process.env.VUE_APP_API_KEY_OPENTOK}`, {
        username: this.user.username,
        password: this.user.password,
        _token: process.env.VUE_APP_API_KEY_OPENTOK
      })
      .then(res => {
        if(res.data.code == 200){
          this.$router.push({ name: route });
        }else{
          this.$toast.open({
              message: 'Datos erroneos',
              type: 'is-danger'
          })
        }
      })
      .catch(err => {
        console.error(err)
        this.$toast.open({
            message: 'Error interno',
            type: 'is-danger'
        })
      })
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




