<template>
<div id="dash">

  <nav class="navbar">
      <div class="navbar-brand">
         <a class="navbar-item" @click="go('login')">
            <img src="img/duis-min.png" width="30" height="28">
            <h1 class="title is-3 titlecolor">Duis</h1>
         </a>
         <div class="navbar-burger burger" data-target="nav-phone" @click="burger()">
            <span></span>
            <span></span>
            <span></span>
         </div>
      </div>

      <div id="nav-phone" class="navbar-menu">
         <div class="navbar-end">
            <b-dropdown  position="is-bottom-left">
               <a class="navbar-item is-info" slot="trigger">
                  <span>{{username}}</span>
                  <b-icon icon="caret-down" pack="fas"></b-icon>
               </a>
               <div v-if="isClass == true">
                 <b-dropdown-item @click="backInClass()">
                      <b-icon icon="door-open" pack="fas"></b-icon>
                      Volver
                  </b-dropdown-item>
               </div>
               <div v-if="isClass == true && role == 'teacher'">
                  <b-dropdown-item @click="finalizeClass()">
                    <b-icon icon="graduation-cap" pack="fas"></b-icon>
                      Finalizar clase
                  </b-dropdown-item>
               </div>
                  
               
               <b-dropdown-item @click="reportAbuse()">
                  <b-icon icon="bullhorn" pack="fas"></b-icon>
                  Reportar Abuso
               </b-dropdown-item>
               <b-dropdown-item @click="logout()">
                  <b-icon icon="sign-out-alt" pack="fas"></b-icon>
                  Salir
               </b-dropdown-item>
            </b-dropdown>
         </div>
      </div>
  </nav>

  <div class="center">

    <div class="is-main-content">

      <router-view></router-view>
      <b-modal :active.sync="isModalReportAbuseActive" has-modal-card>
          <modal-report-abuse></modal-report-abuse>
      </b-modal>

    </div>

  </div>

  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        &copy;2018 — <strong>Duis</strong>
      </p>
    </div>
  </footer>

  <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false"></b-loading>
</div>

</template>

<script>
import ModalReportAbuse from "@/components/views/ModalReportAbuse";
import service from '@/services/finishclass.js'
import notify from '@/config/notify.js'

export default {
  data() {
    return {
      drawer: true,

      preLoading: 0,
      isLoading: false,
      isFullPage: true,

      userData: "",
      userInfoData: "",
      role: this.$cookie.get('role'),

      right: null,
      menus: [{ title: "Cerrar Sesión" }],

      isModalReportAbuseActive: false,

      isRoute: this.$router.currentRoute.name,

      isClass: false,
      timeClass: null
    };
  },

  mounted() {
    //console.log(this.$router.currentRoute.name)
  },

  components: { ModalReportAbuse },
  methods: {
    logout() {
      this.$cookie.delete("userId");
      this.$cookie.delete("username");
      this.$cookie.delete("role");
      this.$cookie.delete("name");

      this.$cookie.delete("sessionId");
      this.$cookie.delete("token");
      this.$cookie.delete("classId");

      this.$cookie.delete("isTime");
      this.$cookie.delete("time_h");
      this.$cookie.delete("time_m");
      this.$cookie.delete("time_s");

      this.$cookie.delete("videoShared");
      this.$cookie.delete("audioShared");

      this.$cookie.delete("isClass");

      //this.go("login");
      location.reload();
    },

    go(route) {
      this.$router.push({ name: route });
    },

    //Metodo para abrir el menu en vista movil
    burger() {
      let burger = document.querySelector(".burger");
      let nav = document.querySelector("#" + burger.dataset.target);

      burger.classList.toggle("is-active");
      nav.classList.toggle("is-active");
    },

    isNotLoading() {
      if (this.preLoading == 2) {
        this.isLoading = false;
      }
      //this.go('users')
    },

    loadDataUser() {
      this.username = this.$cookie.get("username");
      this.userId = this.$cookie.get("userId");
    },

    reportAbuse() {
      this.isModalReportAbuseActive = true;
    },

    backInClass(){
      this.$cookie.delete("sessionId");
      this.$cookie.delete("token");
      this.$cookie.delete("classId");

      this.$cookie.delete("isTime");
      this.$cookie.delete("time_h");
      this.$cookie.delete("time_m");
      this.$cookie.delete("time_s");

      this.$cookie.delete("videoShared");
      this.$cookie.delete("audioShared");

      this.$cookie.set('isClass', false, { expires: '12h' })

      this.go("class");
      location.reload();
      
    },

    async finalizeClass(){

      let finish = {
        session_id: this.$cookie.get('sessionId').toString(),
        duration_time: `${this.$cookie.get('time_h').toString()}:${this.$cookie.get('time_m').toString()}:${this.$cookie.get('time_s').toString()}`,
        video_shared: this.$cookie.get('videoShared'),
        audio_shared: this.$cookie.get('audioShared'),
        user_one_id: this.$cookie.get('userId'),
        user_two_id: '0'
      }

      let temp = await service({
        data: finish,
        id: this.$cookie.get('classId')
      })
      console.log(temp)
      notify(this, temp.code)

      if(temp.code.split('')[0] == 'S'){
        this.$cookie.delete("sessionId");
        this.$cookie.delete("token");
        this.$cookie.delete("classId");

        this.$cookie.delete("isTime");
        this.$cookie.delete("time_h");
        this.$cookie.delete("time_m");
        this.$cookie.delete("time_s");

        this.$cookie.delete("videoShared");
        this.$cookie.delete("audioShared");

        this.$cookie.set('isClass', false, { expires: '12h' })

        this.go("class");
        location.reload();
      }

    }
  },

  created() {
    this.loadDataUser();

    this.timeClass = setInterval(() => {
      this.isClass = JSON.parse(this.$cookie.get("isClass"));
    }, 1000);
  }
  
};
</script>


<style scoped>
.navbar {
  height: 1em;
  -webkit-box-shadow: 0px 7px 36px -13px #e65c00;
  -moz-box-shadow: 0px 7px 36px -13px #e65c00;
  box-shadow: 0px 7px 36px -13px #e65c00;
  margin-bottom: 10px;

  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  z-index: 4;
}

.menu-label {
  color: white;
}

.menu-list li a {
  color: white;
}

.menu-list li a:hover {
  color: black;
}

.is-main-content {
  margin: 80px 10px 10px 10px;
  z-index: 1;
}

.container {
  width: 100vw;

  max-width: 100vw;
  padding: 0px 10px 0px 10px;
}

.footer {
  background-color: white;
  position: fixed;
  bottom: 0px;
  right: 0px;
  left: 0px;
  padding: 3px;
  z-index: 4;
}

.photo {
  width: 60%;
  border-radius: 50px;
  margin: auto;
  display: block;
}

.container-photo {
  margin: auto;
  display: block;
  margin-bottom: 25px;
  text-align: center;
}

.fullname {
  color: white;
}

hr {
  background-color: black;
  opacity: 0.3;
}

.border {
  border: solid 1px #e65c00;
  border-radius: 50px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.titlecolor {
  color: #e65c00;
}
</style>

