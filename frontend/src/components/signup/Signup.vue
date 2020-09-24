<template>
    <div class="row justify-content-center">
        <div class="card col-md-6 bg-light register__box">            
            <h1 class="text-info text-center mt-3 font-weight-light">Créer un compte</h1>                            
            <form method="POST" id="formValid" ref="formValid" class="needs-validation text-left">
                <div class="w-75 mr-auto ml-auto mt-3 text-info">                    
                    <label for="pseudo" ><b>Nom d'utilisateur</b></label>
                    <input type="text" class="form-control mb-3" v-model="userSignup.pseudo" id="pseudo" placeholder="Votre pseudo" data-trigger="hover" value="" minlength="2" maxlength="20" required>
                                                                                        
                    <label for="firstName" ><b>Prénom</b></label>
                    <input type="text" class="form-control mb-3" v-model="userSignup.firstname" id="firstName" placeholder="Votre prénom" value="" minlength="2" maxlength="20" required>                    
                
                    <label for="lastName" ><b>Nom</b></label>
                    <input type="text" class="form-control mb-3" v-model="userSignup.lastname" id="lastName" placeholder="Votre nom" value="" minlength="2" maxlength="20" required>
                                                        
                    <label for="email" ><b>Email</b></label>
                    <input type="email" class="form-control mb-3" v-model="userSignup.email" pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" id="email" placeholder="Exemple@groupomania.com" value="" required>
                                                        
                    <label for="password" ><b>Mot de passe</b></label>
                    <input type="password" class="form-control mb-4" v-model="userSignup.password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" id="password" placeholder="Votre mot de passe" value="" required>

                    <div class="alert alert-danger text-center" v-if="showAlert" role="alert"><h5>Erreur lors de la saisie de vos informations !!!</h5><br>
                    <h6>Votre pseudo:</h6>
                    <p>Entre 2 et 20 caractères</p>
                    <h6>Votre prénom:</h6>
                    <p>Entre 2 et 20 caractères</p>
                    <h6>Votre nom:</h6>
                    <p>Entre 2 et 20 caractères</p>
                    <h6>Votre email:</h6>
                    <p>Doit avoir un format valide</p>
                    <h6>Votre mot de passe:</h6>
                    <p>Doit comprendre au moins 8 caractères dont:<br>1 majuscule, 1 minuscule, 1 chiffre ou 1 caractère spécial</p>
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

export default {
    name: 'signup',
    data () {
        return {
            showSubmitBtn : false,
            showAlert: false,
           
            userSignup: {           
                pseudo:null,
                firstname: null,
                lastname: null,
                email: null,
                password: null,
                isadmin: false, 
            }            
        }            
            
    },
    methods: {
        submitForm () {

            
            

            
            const url = "http://localhost:3000/api/user/signup";
            axios.post(url, this.userSignup, )
            .then(response => {
                console.log(response);
                //Réinitialisation
                this.formData.pseudo = null;
                this.formData.firstname = null;
                this.formData.lastname = null;
                this.formData.email = null;
                this.formData.password = null;
            })
            .catch(error => console.log(error));
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