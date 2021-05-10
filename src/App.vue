<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <InputGroup @inputData="updateMessage"></InputGroup>
    <div id="chart">
      <LineChart :chartData="childData"></LineChart>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from './components/HelloWorld.vue';
import InputGroup from './components/InputGroup/index.vue';
import LineChart from './components/LineChart/index.vue';

@Component({
  components: {
    // HelloWorld,
    InputGroup, 
    LineChart,
  },
  data: function() {
    return {
      childData: "",
    };
  },
  methods: {
    updateMessage(variable) {
      this.childData = variable;
    },
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
