<template>
    <div class="row justify-content-center mb-5">
        <div class="card col-md-6 bg-light login__box mb-5">            
            <h1 class="text-info text-center mt-3 font-weight-light">Me connecter</h1>                            
            <form method="POST" id="formValid" ref="formValid" class="needs-validation text-left">
                <div class="w-75 mr-auto ml-auto mt-3 text-info">                    
                    <label for="username" ><b>Nom d'utilisateur</b></label>
                    <input type="text" class="form-control mb-3" v-model="userLogin.username" id="username" placeholder="Votre pseudo" data-trigger="hover" value="" minlength="2" maxlength="20" required>
                                                        
                    <label for="password" ><b>Mot de passe</b></label>
                    <input type="password" class="form-control mb-4" v-model="userLogin.password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" id="password" placeholder="Votre mot de passe" value="" required>

                    <div class="alert alert-danger text-center" v-if="showAlert" role="alert">
                        <h5>Erreur lors de la saisie de vos informations</h5>
                    </div>

                    <div class="text-center">
                        <button class="btn btn-success btn-sm mb-4 " type="submit"  @click.prevent="submitForm()">Me connecter</button>                        
                    </div>
                </div>    
            </form>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import { mapState } from "vuex";

export default {
    name: 'login',
    data () {
        return {
            
            showAlert: false,
           
            userLogin: {           
                username: null,
                password: null, 
            }            
        }            
            
    },
    computed: {
            ...mapState(["user"])
        },
    methods: {
        submitForm () {
            const checkForm = this.$refs.formValid;
            if(checkForm.checkValidity() === false) {
                this.showAlert = !this.showAlert
                setTimeout(()=>{this.showAlert = !this.showAlert}, 5000) 
                
            } else {
                const url = "http://localhost:3000/api/users/login";
                axios.post(url, this.userLogin, )
                .then(reponse => {
                    console.log(reponse);                    
                    localStorage.setItem('token', reponse.data.token)
                })       
                .catch(error => console.log(error, 'erreur de connection'));
                //Réinitialisation des champs de saisie
                this.userLogin.username = null;
                this.userLogin.password = null;
                location.replace(location.origin)
            }
        },
    }
}    
</script>

<style scoped src="./Login.css">

</style>