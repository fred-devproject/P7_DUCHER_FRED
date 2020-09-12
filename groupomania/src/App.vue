<template>
  <div id="app">
  <header-top></header-top> 
  <footer-bot></footer-bot> 
  </div>
</template>

<script>
import header_top from './components/header/Header-top.vue'
import footer_bot from './components/footer/Footer.vue'

export default {
  name: 'App',
  components: {
    'header-top': header_top,
    'footer-bot': footer_bot,
  }
}
</script>

<style>

</style>
