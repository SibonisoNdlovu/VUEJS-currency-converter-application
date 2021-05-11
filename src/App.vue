<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <div>
      <Converter></Converter>
    </div>
    <div id="chart">
      <LineChart></LineChart>
    </div>
    <Table></Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from './components/HelloWorld.vue';
import Converter from './components/Converter/index.vue';
import LineChart from './components/LineChart/index.vue';
import Table from './components/Table/index.vue';

@Component({
  components: {
    // HelloWorld,
    Converter, 
    LineChart,
    Table,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  width: 100%;
}
#chart {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem 0;
  padding: 0 1rem;
}
</style>
