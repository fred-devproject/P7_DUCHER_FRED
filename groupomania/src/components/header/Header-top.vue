<template>
    <div class="container-fluid head__style">
        <navbar></navbar>
        <div>        
            <img  class="img-responsive head__banner" src="../../assets/banner.png" alt="">        
            <h2 class="head__subtitle text-center">Bienvenue sur votre espace de partage</h2>
        </div>       
    </div>
</template>

<script>

import Navbar from '../../components/navbar/Navbar.vue'
export default {
    name: 'Headblock',
    components: {
        'navbar': Navbar,
    }

    
}
</script>

<style scoped src="./Headblock.css">

</style>