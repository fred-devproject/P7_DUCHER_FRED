<template>
    <div class="row justify-content-center">
        <div class="card col-md-8 bg-light text-center profil__box mb-5">
            <h3 class="text-info mt-3 mb-3">Votre profil</h3>
            
            <div v-if="user.isadmin==true" class="alert alert-info w-75 m-auto">Vous disposez de droits administrateur</div>
            <hr/>
            <h5 class="mt-3 text-info">Votre nom d'utilisateur:</h5>
            <p class="alert alert-secondary w-75 m-auto">{{user.username}}</p>
            <h5 class="mt-3 text-info">Votre email:</h5> 
            <p class="alert alert-secondary w-75 m-auto">{{ user.email }}</p>
            
            <div class="text-center">
                <button class="btn btn-success btn-sm mb-4 mt-4" data-toggle="collapse" href="#changePwdCollapse" role="button" aria-expanded="false" aria-controls="changePwdCollapse">Changer de mot de passe</button>
            </div>
            <div class="collapse  w-75 m-auto" id="changePwdCollapse">
            <div class="card card-body bg-light">
                <form>
                    <div class="form-group">
                        <label for="newPassword"><b>Saisissez votre nouveau mot de passe</b></label>
                        <input type="password" class="form-control" id="newPassword" v-model="newPwd.newPassword">                        
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword"><b>Confirmer votre mot de passe</b></label>
                        <input type="password" class="form-control" id="confirmPassword" v-model="newPwd.confirmPassword">                        
                    </div>
                    <p class="alert alert-info w-75 mr-auto ml-auto mt-3"><b>Votre mot de passe doit contenir:</b><br><i>1 majuscule, 1 minuscule, 1 chiffre ou 1 caractère spécial</i></p>                    
                    <button type="submit" class="btn btn-sm btn-success" v-on:click.prevent="changePassword">Sauvegarder les modifications</button>
                    <p class="alert alert-success w-75 mr-auto ml-auto mt-3" v-if="successMsg">Mot de passe modifié avec succès</p>
                    <p class="alert alert-danger w-75 mr-auto ml-auto mt-3" v-if="failMsg">Veuillez vérifier votre saisie</p>
                </form>
            </div>
            </div>          
            <div class="text-center">
                <button class="btn btn-danger btn-sm mb-3 mt-3 " data-toggle="collapse" href="#deleteProfilCollapse" role="button" aria-expanded="false" aria-controls="deleteProfilCollapse">Supprimer mon compte</button>
            </div>
            <div class="collapse  w-75 m-auto" id="deleteProfilCollapse">
                <p class="alert alert-danger w-75 mr-auto ml-auto"><b>Etes vous sur de vouloir supprimer votre compte ?</b><br>
                <button class="btn btn-danger btn-sm mb-3 mt-3" v-on:click.prevent="deleteUser()">Confirmer</button>
                </p>    
            </div>           
        </div>
        
    </div>
</template>

<script>

import axios from'axios';
import { mapState } from 'vuex';

export default {
    name: 'signup',
    data () {
        return {
            admin: null,
            successMsg: false,
            failMsg: false,
            newPwd: {
                newPassword:"",
                confirmPassword:""
            }
        }            
            
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {
        deleteUser() {
            axios
                .delete("http://localhost:3000/api/users/delete", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
                })
                .then(() => {
                    localStorage.clear();
                    location.replace(location.origin)
                })                
                .catch(error => console.log(error));
        },

        changePassword() {
        //Controle de la saisie du nouveau password
        //Controle de repeat et non null
            if (
                this.newPwd.newPassword == this.newPwd.confirmPassword
            ) {
                axios
                .put(
                    "http://localhost:3000/api/users/update",
                    {
                    newPassword: this.newPwd.newPassword
                    },
                    {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                    }
                )
                .then(response => {
                    console.log(response);
                    this.successMsg = true;
                    setTimeout(()=>{this.successMsg = !this.successMsg}, 3000)                
                    setTimeout(()=>{location.replace(location.origin)}, 3000)                
                })
                .catch(error => console.log(error));
            
            } else {
                this.failMsg = true;
                setTimeout(()=>{this.failMsg = !this.failMsg}, 3000)                     
            }
        }
    }, 

    mounted() {
        this.$store.dispatch("getUserInfos");
    }   
}    
</script>

<style scoped src="./Profil.css">

</style>