<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "Chart",
  mixins: [Line, reactiveProp],
  props: {
    options: String,
  },
  watch: {
    options: function() {
      
    },
  },
  mounted() {
    let chartOption = {
      resposive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      title: { display: true, fontSize: 16, text: this.chartData.title },
    };
    if (this.options !== null) {
      chartOption = { ...chartOption, ...this.options };
    }

    this.renderChart(this.chartData, chartOption);
  },
};
</script>
