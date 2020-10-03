<template>
    <div class="row  justify-content-center">
        <p class="mt-3 mb-3 text-center text-secondary welcomemsg" v-if="user.token != null">Bienvenue <b>{{ user.username }}</b> </p>
        <p class="mt-3 mb-3 text-center text-secondary welcomemsg" v-else>Bienvenue sur notre nouvelle application<br><i>"Pour participer connectez vous ou créer un compte"</i></p>
    </div>                    
</template>

<script>

//import axios from 'axios'
import {mapState} from 'vuex'

export default {
    name: 'Welcomebar',
    computed: {
        ...mapState(['user'])
    },
    data(){
        return {
            //welcomeMsg: 'Bienvenue sur votre espace de discussion'
        }
    },
   
}
</script>

<style scoped src="./Welcomebar.css">

</style>