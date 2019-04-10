<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <supply-demand-chart></supply-demand-chart>
  </div>
</template>

<script>
  import SupplyDemandChart from './components/SupplyDemandChart'

  export default {
    name: 'app',

    components: {
      SupplyDemandChart
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
