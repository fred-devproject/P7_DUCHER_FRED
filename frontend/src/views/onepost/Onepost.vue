<template>
    <div class="row justify-content-center">
        <div class="col-md-8 mb- 3 btn__bloc justify-content-center">
                <router-link :to="`/`">
                    <button 
                        type="button" 
                        class="btn btn-info btn-sm mb-3 mt-3 mr-2 edit__btn">
                        revenir à l'accueil
                    </button>
                </router-link>
            </div>
        <div class="card col-md-8 ml-4 mr-4 bg-light bloc-onepost">            
                <h4 class="ml-3 mr-2 mb-1 mt-3 text-center">{{ onePost.title }}</h4>                            
            <hr>
            <div class="d-flex">
                <p class="ml-3 mr-2 mb-2 mt-2 w-50"><b class="text-secondary">Auteur:&nbsp;&nbsp;</b><i>{{ onePost.User.username }}</i></p>
                <p class="ml-2 mr-5 mb-2 mt-2 text-right w-50"><b class="text-secondary">Posté le:&nbsp;&nbsp;</b> <i>{{ onePost.updatedAt.slice(0, 10) }}</i></p>
            </div> 
            <hr>           
            <p class="ml-3 mr-2 mb-2 mt-2" >{{ this.onePost.content }}</p>
            <hr v-if="user.isadmin == true || onePost.userId == user.userId">
            <div class="d-flex justify-content-between">
                <button 
                    type="button" 
                    class="btn btn-info btn-sm mb-3 mt-3 mr-2 edit__btn" 
                    v-if="user.isadmin == true || onePost.userId == user.userId">
                    Editer le message
                </button>
                <button 
                    type="button" 
                    class="btn btn-danger btn-sm mb-3 mt-3 mr-2 delete__btn" 
                    v-if="user.isadmin == true || onePost.userId == user.userId"
                    data-toggle="collapse" 
                    href="#deleteMsgCollapse" 
                    role="button" 
                    aria-expanded="false" 
                    aria-controls="deleteMsgCollapse"
                    >
                    Supprimer
                </button>  
            </div> 
            <div class="collapse" id="deleteMsgCollapse">
                <p class="alert alert-danger mr-auto ml-auto text-center"><b>Confirmer la suppression ?</b><br></p>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-danger btn-sm mt-3 mb-3" v-on:click.prevent="deletePost()">Confirmer</button>
                </div>
            </div>            
        </div>
    </div> 
</template>

<script>

import axios from 'axios'
import { mapState } from "vuex";

export default {
    name: 'Onepost',
    data(){
        return {
            id: this.$route.params.id,

            editOptions: false,
            deleteOptions: false,

            onePost: {
                id:"",
                title: "",
                content: "",
                userId:"",
                User:"",
                updatedAt:""
            },
            
        }
    },
    computed: {
        ...mapState(["user"])
    },
    mounted(){

        axios
        .get(`http://localhost:3000/api/messages/${this.id}`, {
        headers: {
            Authorization: "Bearer " + localStorage.token
        }
        })
        .then(response => {
            console.log("onePost", response.data);
            this.onePost = response.data
            
        })
    },
    methods: {
        deletePost() {
                        
            axios
                .delete(`http://localhost:3000/api/messages/delete/${this.id}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.token
                    }, 
                })
                
                .then(() => {
                    location.replace(location.origin)
                }) 
                .catch(error => console.log(error));            
        },
    }    
}
</script>

<style scoped src="./Onepost.css">

</style>