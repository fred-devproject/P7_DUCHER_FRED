<template>
    <div class="row justify-content-center">
        <div class="card text-center col-md-4 bg-light register__box">
            <h1 class="text-info mt-3 ml-3 font-weight-light">Créer un compte</h1>
            <form class="text-left">        
                <div>
                    <label for="userFirstName" class="mt-3">Prénom</label>
                    <input id="userFirstName" type="text" class="form-control" placeholder="Jean">
                    <label for="userLastName" class="mt-3">Nom</label>
                    <input id="userLastName" type="text" class="form-control" placeholder="Dupont">
                    <label for="userEmail" class="mt-3">Email</label>
                    <input type="email" class="form-control" placeholder="jean.dupont@groupomania.com">
                    <label for="userPassword" class="mt-3">Mot de passe</label>
                    <input type="password" class="form-control mb-5" placeholder="#password#">    
                </div>
                <div class="form-group">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                    <label class="form-check-label" for="invalidCheck">
                        J'accepte les conditions d'utilisations
                    </label>
                    <div class="invalid-feedback">
                        You must agree before submitting.
                    </div>
                    </div>
                </div>
                <button class="btn btn-info mb-3" type="submit">Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>



export default {
    name: 'register',
    data(){
        return {
            
        }
    },    
}
</script>

<style scoped src="./Register.css">

</style>