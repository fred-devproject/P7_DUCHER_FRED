<template>
  <div id="app">
  <header-top></header-top>  
  </div>
</template>

<script>
import header_top from './components/header/Header-top.vue'

export default {
  name: 'App',
  components: {
    'header-top': header_top,
  }
}
</script>

<style>

</style>
