<template>

        <h2 class="mt-3 mb-3 text-center"> {{ user.username }} </h2>
                    
</template>

<script>

import axios from 'axios'
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