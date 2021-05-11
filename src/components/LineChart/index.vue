<script>
import { Line, mixins } from "vue-chartjs";
import { mapState } from "vuex";
const { reactiveProp } = mixins;

export default {
  name: "Chart",
  mixins: [Line, reactiveProp],
  mounted() {
    let chartOption = {
      resposive: true,
    };

    if (this.options !== null) {
      chartOption = { ...chartOption, ...this.options };
    }

    this.renderChart(this.chartData, chartOption);
  },
    computed: {
    ...mapState(["chartData"]),
    },
};
</script>
