<template>
    <div id:="main-content" class="row justify-content-center"> 
        <div class="card col-md-8 ml-3 mr-3 bg-light main" >
            <h2 class="main__title text-info mt-4 ml-3 font-weight-normal">Les derniers posts !</h2>        
            <router-link :to="`/posts`">
                <div class="btn btn-outline-info main__postbtn">Voir tous les posts</div>
            </router-link>
            <div>
                <ul>                
                    <li v-bind:key="index" v-for="(post, index) in lastPost" class="main__post">
                        <router-link :to="`/post/${index + 1}`">
                            <div class="card mb-4">
                                <h3 class="font-weight-light ml-2 mr-2 mb-1 mt-3 ">{{ post.title }}</h3>
                                <hr>
                                <p class="ml-2 mr-2 mb-2 mt-2 font-italic">{{ post.body.slice(1, 100) }}...</p>
                            </div>
                        </router-link>
                    </li>                
                </ul>
            </div>         
        </div>
    </div>
</template>

<script>

//import axios from 'axios'

export default {
    name: 'Maincontent',
    data() {
        return {
            lastPost: [],
        }
    },
}
</script>

<style scoped src="./Maincontent.css">

</style>