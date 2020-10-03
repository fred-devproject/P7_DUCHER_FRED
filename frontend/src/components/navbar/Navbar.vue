<template>
    
<nav class="navbar navbar-expand-lg navbar-light bg-dark row">
  <router-link :to="`/`">
    <img src="../../assets/logo_black.png" alt="Logo groupomania" class="navbar__logo ml-3 mr-5">
  </router-link> 
  <button 
    class="navbar-toggler mr-4 navbar-dark" 
    type="button" 
    data-toggle="collapse" 
    data-target="#navbarNav" 
    aria-controls="navbarNav" 
    aria-expanded="false" 
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <nav class="collapse navbar-collapse justify-content-end" id="navbarNav">
    <ul class="navbar-nav">
      
      <router-link :to="`/login`">
        <li class="nav-item mr-5" v-if="user.token == null">
          <a class="nav-link text-light navbar__text" aria-label="connexion">Connexion</a>
        </li>
      </router-link>
      <router-link :to="`/signup`">
        <li class="nav-item mr-5" v-if="user.token == null">
          <a class="nav-link text-light navbar__text" aria-label="inscription">Inscription</a>
        </li>
      </router-link>

      <router-link :to="`/profil`">
        <li class="nav-item mr-5" v-if="user.token != null">          
          <a class="nav-link ml-3 text-light navbar__text" aria-label="profil utilisateur">Mon profil</a>                
        </li>
      </router-link>
      
      <li class="nav-item mr-5" v-if="user.token != null" @click.prevent="disconnect">
          <a class="nav-link ml-3 text-light navbar__text" aria-label="deconnexion" href="#">Deconnexion</a>
      </li>
            
    </ul>
  </nav>
</nav>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'Navbar', 
    computed: {
      ...mapState(["user"])
    },
    methods: {
      disconnect() {
        // Pour se déconnecter, On vide le localStorage, on actualise la page et on redirige vers la page login
        localStorage.removeItem('token');                      
        location.replace(location.origin);            
      }
    }
};

</script>

<style scoped src="./Navbar.css">

</style>