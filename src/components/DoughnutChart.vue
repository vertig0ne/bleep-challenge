<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  props: ['chartData'],
  data() {
    return {
      options: {
        responsive: true,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    chartData() {
      this.renderChart(this.chartData, this.options);
    },
  },
};
</script>
