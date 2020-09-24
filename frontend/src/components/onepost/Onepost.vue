<template>
    <div class="row justify-content-center">
        <div class="card col-md-8 ml-3 mr-3 bg-light bloc-onepost" >
            <h3 class="font-weight-light ml-2 mr-2 mb-1 mt-3">{{ onePost.title }}</h3>
            <hr>
            <div class="border bg-white mb-2">
                <p class="ml-2 mr-2 mb-2 mt-2" >{{ onePost.body }}</p>
            </div>
            <div class="btn__bloc justify-content-end">
                <button type="button" class="btn btn-info btn-sm mb-3 mt-3 mr-2 edit__btn">Editer</button>
                <button type="button" class="btn btn-danger btn-sm mb-3 mt-3 mr-2 delete__btn">Supprimer</button>
                <router-link :to="`/`">
                    <button type="button" class="btn btn-outline-info btn-sm mb-3 mt-3 mr-2 edit__btn">revenir à l'accueil</button>
                </router-link>
            </div>
        </div>
    </div> 
</template>

<script>

import axios from 'axios'

export default {
    name: 'Onepost',
    data(){
        return {
            id: this.$route.params.id,
            onePost: [],
        }
    },
    mounted(){
        axios
        .get(`https://jsonplaceholder.typicode.com/posts/${this.id}`)
        .then(reponse => {
            this.onePost = reponse.data
        })
    }
   
    
}
</script>

<style scoped src="./Onepost.css">

</style>