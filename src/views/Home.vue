<template>
  <b-container class="home">
    <h1>Sales</h1>
    Select Month

    <datepicker
      format="MMMM"
      minimumView="month"
      maximumView="month"
      v-model="date"
      @closed="filter"
    >
    </datepicker>

    <h2 v-if="topProducts.labels">Top Selling Products (For Month)</h2>
    <doughnut-chart
      v-if="topProducts.labels"
      v-bind:chart-data="topProducts"
      v-bind:options="{}"
      height=200
    >
    </doughnut-chart>

    <h2 v-if="topProducts.labels">Daily Sales</h2>
    <v-client-table
      v-if="topProducts.labels"
      v-bind:data="dailySales"
      v-bind:columns="table.columns"
      v-bind:options="table.options"
    >
    </v-client-table>
  </b-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import DoughnutChart from '@/components/DoughnutChart.vue';

export default {
  name: 'Home',
  components: {
    DoughnutChart,
    Datepicker,
  },
  data() {
    return {
      date: null,
      topProducts: {},
      table: {
        columns: ['date', 'count', 'totalwitax', 'totalwotax'],
        options: {
          headings: {
            date: 'Date',
            count: 'Items Sold',
            totalwitax: 'Total inc. Tax',
            totalwotax: 'Total exc. Tax',
          },
          filterable: false,
          orderBy: { column: 'date' },
          perPage: 31,
        },
      },
    };
  },
  computed: {
    ...mapGetters(['topProductsByValue', 'dailySales']),
    ...mapState(['loading', 'sales']),
  },
  methods: {
    ...mapActions(['filterDate']),
    filter() {
      this.filterDate(this.date);
    },
  },
  watch: {
    topProductsByValue(n) {
      const data = [];
      const labels = n.sorted.slice(0, 5);
      labels.forEach((item) => {
        data.push(parseFloat(n.counts[item]).toFixed(2).toString());
      });
      this.topProducts = {
        labels,
        datasets: [{ data }],
      };
    },
  },
};
</script>
