<template>
    <main class="row justify-content-center no-gutters">
        <section class="card col-md-8 ml-3 mr-3 bg-light bloc-newpost">
            <h2 class="text-dark text-center mt-3 font-weight-light">Poster un nouveau message</h2>
            <form method="POST" id="formValid" ref="formValid" class="needs-validation text-left">
                <div class="w-75 mr-auto ml-auto mt-3 text-dark">                    
                    <label for="title" ><b>Titre</b></label>
                    <input type="text" class="form-control mb-3" id="title" placeholder="Votre titre"  v-model="post.title" minlength="3" maxlength="50" required>
                                                        
                    <label for="content" ><b>Votre message</b></label>
                    <textarea type="text" class="form-control mb-4" rows="6" id="content" placeholder="Votre message" v-model="post.content" minlength="3" maxlength="1000" required></textarea>

                    <div class="text-center">
                        <button class="btn btn-success btn-md mb-4 " type="submit" v-on:click.prevent="submitPost()">Envoyer !</button>                        
                    </div>
                </div>    
            </form>            
        </section>
    </main> 
</template>

<script>

import axios from 'axios'
import { mapState } from "vuex";

export default {
    name: 'Newpost',
    data() {
        return { 
            post: {
                title:"",
                content:""
            }           
        }
    },
    computed: {
      ...mapState(["user"])
    },

    methods: {
        submitPost: function() {        
            const url = "http://localhost:3000/api/messages/post";
            axios.post(url, this.post,{
               headers: {
                  Authorization: "Bearer " + localStorage.token,
               },
            })
            .then(response => {
                console.log(response);
                //Réinitialisation des champs de saisie
                this.post.title = null;
                this.post.content = null;
                this.$router.push('/');
            })
            .catch(error => console.log(error, 'erreur de connection'));
        },
    }    
}
</script>

<style scoped src="./Newpost.css">

</style>