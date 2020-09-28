<template>
    <div class="container-fluid head__style">
        <navbar></navbar>                
        <img  class="img-responsive head__banner" src="../../assets/banner.png" alt="">
        <welcomebar></welcomebar>                      
    </div>
</template>

<script>

import Navbar from '../../components/navbar/Navbar.vue'
import Welcomebar from '../../components/welcomebar/Welcomebar.vue'
export default {
    name: 'Header-top',
    
    components: {
        'navbar': Navbar,
        'welcomebar': Welcomebar,
    }

    
}
</script>

<style scoped src="./Header-top.css">

</style>