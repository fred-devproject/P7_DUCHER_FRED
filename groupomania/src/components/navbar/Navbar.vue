<template>
    
<nav class="navbar navbar-expand-lg navbar-light bg-light row no-padding border ">
  <router-link :to="`/`">
    <img src="../../assets/logo_black.png" alt="Logo en tête" class="navbar__logo mr-5">
  </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
    <ul class="navbar-nav">

      <li class="nav-item mr-5">
        <a class="nav-link text-info navbar__text" href="#">Connection</a>
      </li>
      
      <router-link :to="`/register`">
        <li class="nav-item mr-5">
          <a class="nav-link text-info navbar__text" href="#">Inscription</a>
        </li>
      </router-link>
      
    </ul>
  </div>
</nav>
</template>

<script>


export default {
    name: 'Navbar',
    data(){
        
    }
    
}
</script>

<style scoped src="./Navbar.css">

</style>