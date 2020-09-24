<template>
    <div class="container-fluid head__style">
        <navbar></navbar>
        <div>        
            <img  class="img-responsive head__banner" src="../../assets/banner.png" alt="">        
            <p class="head__subtitle text-center mt-3 mb-5">Bienvenue sur votre espace de discussion</p>
        </div>       
    </div>
</template>

<script>

import Navbar from '../../components/navbar/Navbar.vue'
export default {
    name: 'Header-top',
    components: {
        'navbar': Navbar,
    }

    
}
</script>

<style scoped src="./Headblock.css">

</style>