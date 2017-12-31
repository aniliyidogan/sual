<template>
  <div id="app">
    <header-section></header-section>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import HeaderSection from './components/HeaderSection.vue'

export default {
  name: 'app',
  components: { HeaderSection }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Libre+Baskerville');
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300');
@import url('https://fonts.googleapis.com/css?family=Slabo+27px');

body {
  margin: 0 auto;
  background-color: rgba(244, 247, 190, 0.4);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*  -webkit-font-smoothing: antialiased; */
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a{
  text-decoration: none;
}
#line{
  background-color: #823038;
  margin-top: 20px;
  height: 1px;
  width: 100%;
  display: block;
}
</style>
