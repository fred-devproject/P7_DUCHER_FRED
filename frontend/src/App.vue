<template>
  <div id="app">
    <header-top></header-top>
    <router-view></router-view> 
    <footer-bot></footer-bot> 
  </div>
</template>

<script>
import Header from './components/header/Header-top.vue'
import Footer from './components/footer/Footer.vue'


export default {
  name: 'App',
  components: {
    'header-top': Header,
    'footer-bot': Footer,
    
  }
}
</script>

<style>

</style>
