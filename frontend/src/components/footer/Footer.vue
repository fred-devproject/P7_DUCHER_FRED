<template>
    <div class="container-fluid fixed-bottom foot__style">
        <div class="row justify-content-between bg-dark ">        
            <p class="footer__text text-light my-auto ml-3 pt-4 pb-4">Designed with <strong>Bootstrap</strong></p>
            <router-link :to="`/mentions`">
                <p class="footer__text  text-light my-auto mr-4 pt-4 pb-4"><strong>Mentions légales</strong></p>
            </router-link>
            
        </div>       
    </div>
</template>

<script>
export default {
    name: 'Footer-bot',
}
</script>

<style scoped src="./Footer.css">

</style>