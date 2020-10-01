<template>
    <div class="row justify-content-center">
        <div class="card col-md-6 bg-light register__box">            
            <h2 class="text-info text-center mt-3 font-weight-light">Créer un compte</h2>                            
            <form method="POST" id="formValid" ref="formValid" class="needs-validation text-left">
                <div class="w-75 mr-auto ml-auto mt-3 text-info">                    
                    <label for="username" ><b>Nom d'utilisateur</b></label>
                    <input type="text" class="form-control mb-3" v-model="userSignup.username" id="username" placeholder="Votre pseudo" data-trigger="hover" value="" minlength="2" maxlength="20" required>
                                                        
                    <label for="email" ><b>Email</b></label>
                    <input type="email" class="form-control mb-3" v-model="userSignup.email" pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" id="email" placeholder="Exemple@groupomania.com" value="" required>
                                                        
                    <label for="password" ><b>Mot de passe</b></label>
                    <input type="password" class="form-control mb-4" v-model="userSignup.password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" id="password" placeholder="Votre mot de passe" value="" required>

                    <div class="alert alert-danger text-center" v-if="showAlert" role="alert"><h5>Erreur lors de la saisie de vos informations !!!</h5><br>
                    <h6>Votre nom d'utilisateur:</h6>
                    <p>Doit comprendre entre 2 et 20 caractères</p>
                    <h6>Votre email:</h6>
                    <p>Doit avoir un format valide:<br><i>exemple@domaine.com</i></p>
                    <h6>Votre mot de passe:</h6>
                    <p>Doit comprendre au moins 8 caractères dont:<br>1 majuscule, 1 minuscule et 1 chiffre ou 1 caractère spécial</p>
                    </div>

                    <div class="text-center">                        
                        <button class="btn btn-outline-info btn-sm mb-4 " type="submit" @click.prevent="validateForm()">Valider mes informations</button>                        
                    </div>
                    <div class="text-center">
                        <button class="btn btn-success btn-sm mb-4 " type="submit" v-if="showSubmitBtn" @click.prevent="submitForm()">Créer mon compte</button>                        
                    </div>
                </div>    
            </form>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import { mapState } from "vuex";

export default {
    name: 'signup',
    data () {
        return {
            showSubmitBtn : false,
            showAlert: false,
           
            userSignup: {           
                username: null,
                email: null,
                password: null,
                isadmin: false, 
            }            
        }            
            
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {
        submitForm () {
            
            const url = "http://localhost:3000/api/users/register";
            axios.post(url, this.userSignup, )
            .then(response => {
                console.log(response);
                //Réinitialisation des champs de saisie
                this.userSignup.username = null;
                this.userSignup.email = null;
                this.userSignup.password = null;
                this.showSubmitBtn = false;
                this.$router.push('/login');
            })
            .catch(error => console.log(error, 'erreur de connection'));
            },

        validateForm () {

            const checkForm = this.$refs.formValid;
            if(checkForm.checkValidity() === false) {
                this.showAlert = !this.showAlert
                setTimeout(()=>{this.showAlert = !this.showAlert}, 5000) 
                
            } else {
                checkForm.disabled = true
                this.showSubmitBtn = true                
            }             
        }       
    }
}    
</script>

<style scoped src="./Signup.css">

</style>