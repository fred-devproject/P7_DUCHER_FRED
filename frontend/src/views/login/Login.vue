<template>
    <main class="row justify-content-center mb-5 no-gutters">
        <div class="col-md-6">
        <nav class="mb-3 btn__bloc justify-content-left">
            <router-link :to="`/`">
                <button 
                    type="button" 
                    class="btn btn-outline-dark btn-md mb-3 mt-3 ml-2 edit__btn">
                    revenir à l'accueil
                </button>
            </router-link>
        </nav>
            <section class="card bg-light login__box mb-5 ml-2 mr-2">            
                <h2 class="text-dark text-center mt-3 font-weight-light">Me connecter</h2>                            
                <form method="POST" id="formValid" ref="formValid" class="needs-validation text-left">
                    <div class="col-md-8 mr-auto ml-auto mt-3 text-dark">  

                        <label for="username" ><b>Nom d'utilisateur</b></label>
                        <input 
                            type="text" 
                            class="form-control mb-3" 
                            v-model="userLogin.username" 
                            id="username" 
                            placeholder="Votre pseudo" 
                            data-trigger="hover" 
                            value="" 
                            minlength="2" 
                            maxlength="20" 
                            required>
                                                            
                        <label for="password" ><b>Mot de passe</b></label>
                        <input 
                            type="password" 
                            class="form-control mb-4" 
                            v-model="userLogin.password" 
                            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" 
                            id="password" 
                            placeholder="Votre mot de passe" 
                            value="" 
                            required>

                        <div class="alert alert-danger text-center" v-if="showAlert" role="alert">
                            <h5>Erreur lors de la saisie de vos informations</h5>
                        </div>

                        <div class="text-center">
                            <button class="btn btn-success btn-md mb-4 " type="submit"  @click.prevent="submitForm()">Me connecter</button>                        
                        </div>
                    </div>    
                </form>
            </section>
        </div>
    </main>
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
                setTimeout(()=>{this.showAlert = !this.showAlert}, 3000) 
                
            } else {

                const url = "http://localhost:3000/api/users/login";
         
                axios.post(url, this.userLogin, )
                .then(response => {
                    console.log(response);                    
                    localStorage.setItem('token', response.data.token)
                    location.replace(location.origin)
                })                     
                .catch(error => {
                    console.log(error, 'erreur de connection');
                    this.showAlert = true;
                    setTimeout(()=>{this.showAlert = !this.showAlert}, 3000)
                })                
            }
        },
    }
}    
</script>

<style scoped src="./Login.css">

</style>