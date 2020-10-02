<template>
    <div class="row justify-content-center">
        <div class="col-md-8 mb- 3 btn__bloc justify-content-left">
            <router-link :to="`/`">
                <button 
                    type="button" 
                    class="btn btn-outline-info btn-sm mb-3 mt-3 ml-2 edit__btn">
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
                    v-if="user.isadmin == true || onePost.userId == user.userId"
                    data-toggle="collapse" 
                    href="#editMsgCollapse"  
                    aria-expanded="false" 
                    aria-controls="editMsgCollapse">
                    Editer le message
                </button>
                
                <button 
                    type="button" 
                    class="btn btn-danger btn-sm mb-3 mt-3 delete__btn" 
                    v-if="user.isadmin == true || onePost.userId == user.userId"
                    data-toggle="collapse" 
                    href="#deleteMsgCollapse"  
                    aria-expanded="false" 
                    aria-controls="deleteMsgCollapse"
                    >
                    Supprimer
                </button>  
            </div>
            <div class="collapse mb-2 edit__card" id="editMsgCollapse">
                    <div class="card bg-light border-0">
                        <form method="PUT" id="formValid" ref="formValid" class="needs-validation text-left border-0">
                            <div class="mr-2 ml-2 mt-3 text-info">                    
                                <label for="title" ><b>Titre</b></label>
                                <input type="text" class="form-control mb-3" id="title" placeholder="Votre titre" v-model="newPost.title" minlength="3" maxlength="50" required>
                                                                    
                                <label for="content" ><b>Votre message</b></label>
                                <textarea type="text" class="form-control mb-4" rows="8" id="content" placeholder="Votre message" v-model="newPost.content" minlength="3" maxlength="1000" required></textarea>

                                <p class="alert alert-success w-75 text-center mr-auto ml-auto mt-3" v-if="successMsg" ><b>Message modifié avec succès</b></p>
                                <div class="d-flex justify-content-center">
                                    <button class="btn btn-success btn-sm mt-3 mb-3" v-on:click.prevent="updatePost()">Confirmer la modification</button>
                                </div>
                            </div>    
                        </form>
                            
                    </div>
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
            successMsg: false,

            onePost: {
                id:"",
                title: "",
                content: "",
                userId:"",
                User:"",
                updatedAt:""
            },

            newPost: {
                title:"",
                content:""
            }            
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
        //suppression du message
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

        // modification du message
        updatePost() {
                        
            axios
                .put(`http://localhost:3000/api/messages/update/${this.id}`, 
                    {
                    newTitle: this.newPost.title,
                    newContent: this.newPost.content,
                    },
                    {
                    headers: {
                        Authorization: "Bearer " + localStorage.token
                    },                     
                })
                
                .then(() => {
                    this.successMsg = true,
                    setTimeout(()=>{this.successMsg = !this.successMsg}, 3000),
                    setTimeout(()=>{location.replace(location.origin)}, 3000)
                }) 
                .catch(error => console.log(error));            
        },
    }    
}
</script>

<style scoped src="./Onepost.css">

</style>