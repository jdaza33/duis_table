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
                rounded>
            </b-input>
        </b-field>

        <b-field>
          <b-input placeholder="Contraseña"
                type="password"
                icon-pack="fas"
                icon="key"
                password-reveal
                rounded>
            </b-input>
        </b-field>

        <div class="has-text-centered">
          <a @click="go('panel')" class="button is-vcentered is-primary is-outlined is-rounded">Iniciar Sesión</a>
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

export default {
  name: "login",
  data() {
    return {
      show: 1
    };
  },
  methods: {

    async go(route) {
      this.$router.push({ name: route });
    },

    

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




