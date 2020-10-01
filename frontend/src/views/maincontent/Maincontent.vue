<template>
    <div id:="main-content" class="row justify-content-center"> 
        <div class="card col-md-8 ml-3 mr-3 bg-light main" >
            <h3 class="main__title text-info mt-4 ml-3 font-weight-normal">Les messages !</h3>        
            <router-link :to="`/newpost`">
                <div class="btn btn-outline-info main__postbtn" v-if="user.token != null">Poster un message</div>
            </router-link>
            <div>
                <ul>                
                    <li v-bind:key="index" v-for="(post, index) in lastPost" class="main__post">
                        <router-link :to="`/post/${post.id}`">
                            <div class="card mb-4">
                                <h4 class=" ml-3 mr-2 mb-1 mt-3 ">{{ post.title }}</h4>
                                <hr>
                                <div class="d-flex">
                                    <p class="ml-3 mr-2 mb-2 mt-2 w-50"><b class="text-secondary">Auteur:&nbsp;&nbsp;</b><i>{{ post.User.Username }}</i></p>
                                    <p class="ml-2 mr-5 mb-2 mt-2 text-right w-50"><b class="text-secondary">Posté le:&nbsp;&nbsp;</b> <i>{{ post.updatedAt.slice(0, 10) }}</i></p>
                                </div>
                                <p class="ml-3 mr-2 mb-2 mt-2">{{ post.content.slice(0, 100) }}...</p>
                            </div>
                        </router-link>
                    </li>                
                </ul>
            </div>         
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from 'axios'

export default {
    name: 'Maincontent',
    data() {
        return {
            lastPost: [],
        }
    },
    computed: {
        ...mapState(["user"])
    },
    mounted() {
        const userLogIn = localStorage.getItem("token");
        if (userLogIn != null) {
            this.$store.dispatch('getUserInfos');
        }
        axios
        .get("http://localhost:3000/api/messages/", {
            headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        //.get("http://localhost:3000/api/post",this.$store.state.headerParams)
        .then(response => {
            console.log("messages", response.data);
            this.lastPost = response.data;
        })
        .catch(error => {
            console.log(error); //affiche pas le message 'normalement' envoyé par le back
        });
    }
}
</script>

<style scoped src="./Maincontent.css">

</style>