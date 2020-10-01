<template>
    <div class="row justify-content-center">
        <p class="alert alert-danger w-75 mr-auto ml-auto mt-3 text-center" ><b>Vous n'avez pas l'autorisation de supprimer ce message<br> Vous allez être redirigé vers la page d'accueil</b></p>
        <div class="card col-md-8 ml-3 mr-3 bg-light bloc-onepost" >
            
            <div class="d-flex justify-content-between">
                <h4 class="ml-3 mr-2 mb-1 mt-3 ">{{ onePost.title }}</h4>
                <div class="">
                    <button 
                        type="button" 
                        class="btn btn-info btn-sm mb-3 mt-3 mr-2 edit__btn" 
                        v-if="user.isadmin == true || onePost.userId == user.userId">
                        Editer
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-danger btn-sm mb-3 mt-3 mr-2 delete__btn" 
                        v-if="user.isadmin == true || onePost.userId == user.userId"
                        v-on:click="deletePost()">
                        Supprimer
                    </button>
                </div>
            </div>
            <hr>
            <div class="d-flex">
                <p class="ml-3 mr-2 mb-2 mt-2 w-50"><b class="text-secondary">Auteur:&nbsp;&nbsp;</b><i>{{ onePost.User.username }}</i></p>
                <p class="ml-2 mr-5 mb-2 mt-2 text-right w-50"><b class="text-secondary">Posté le:&nbsp;&nbsp;</b> <i>{{ onePost.updatedAt.slice(0, 10) }}</i></p>
            </div>            
            <p class="ml-3 mr-2 mb-2 mt-2" >{{ this.onePost.content }}</p>            
            <div class="btn__bloc justify-content-end">
                <router-link :to="`/`">
                    <button 
                        type="button" 
                        class="btn btn-outline-info btn-sm mb-3 mt-3 mr-2 edit__btn">
                        revenir à l'accueil
                    </button>
                </router-link>
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
            noDelete:false,
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
            Authorization: "Bearer " + localStorage.getItem("token")
        }
        })
        .then(response => {
            console.log("onePost", response.data);
            this.onePost = response.data
            
        })
    },
    methods: {
        deletePost() {
            if( this.user.isadmin == true || this.onePost.userId == this.user.userId) {
                axios
                    .delete(`http://localhost:3000/api/messages/delete/${this.id}`, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        },
                    }) 
                    .then(() => {
                        location.replace(location.origin)
                    }) 
                    .catch(error => console.log(error));
            } else {
                setTimeout(()=> {this.noDelete = !this.noDelete}, 3000);
                location.replace(location.origin)
            }
        },

    }
   
    
}
</script>

<style scoped src="./Onepost.css">

</style>