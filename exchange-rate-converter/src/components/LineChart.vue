<template>
  <div style="height: 200px; width: 200px">
    <vue3-chart-js
      :id="doughnutChart.id"
      :type="doughnutChart.type"
      :data="doughnutChart.data"
      @before-render="beforeRenderLogic"
    ></vue3-chart-js>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";

export default defineComponent({
  name: "App",
  components: {
    Vue3ChartJs,
  },
  setup() {
    const doughnutChart = {
      id: "doughnut",
      type: "line",
      data: {
        labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [40, 20, 80, 10],
          },
        ],
      },
    };

    const beforeRenderLogic = () => {
      //...
      //if(a === b) {
      //  event.preventDefault()
      //}
    };

    return {
      doughnutChart,
      beforeRenderLogic,
    };
  },
});
</script>

<style>
.title {
  font-size: 2rem;
  margin: 1rem 0;
}
.chart-container {
  position: relative;
  margin: 0 auto;
  padding: 0 1rem;
  padding-bottom: 1rem;
  height: auto;
  width: 100%;
  min-height: 400px;
}
</style>
