<template>
  <div id="app">
    <label>Baby ID: </label>
    <input v-model="baby.id"/>
    <supply-demand-chart></supply-demand-chart>
  </div>
</template>

<script>
  import SupplyDemandChart from './components/SupplyDemandChart'

  export default {
    provide () {
      return {
        global: this.baby
      }
    },

    name: 'app',

    data () {
      return {
        baby: {
          id: null
        }
      }
    },

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
