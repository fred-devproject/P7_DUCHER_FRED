<template>
    
<nav class="navbar navbar-expand-lg navbar-light bg-light row no-padding border ">
  <img src="../../assets/logo_black.png" alt="Logo en tête" class="navstyle__logo mr-5">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#">Se connecter</a>
      </li>
      
      <li class="nav-item">
        <a class="nav-link" href="#">S'inscrire</a>
      </li>
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