import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);

export default new Vuex.Store({
  state: {
    loading: false,
    sales: [],
    originalSales: [],
  },
  mutations: {
    SET_SALES_RAW(state, data) {
      state.originalSales = data;
    },
    SET_LOADING(state, data) {
      state.loading = data;
    },
    FILTER_DATE(state, data) {
      state.sales = state.originalSales.filter((item) => {
        const date = new Date(Date.parse(item.date));
        return date.getMonth() === data.getMonth();
      });
    },
    FILTER_DATE_RESET(state) {
      state.sales = state.originalSales;
    },
  },
  actions: {
    fetchSalesData({ commit }) {
      commit('SET_LOADING', true);
      axios('http://demo.w-bo.com/api/pos/sample_data').then((res) => {
        commit('SET_SALES_RAW', res.data);
        commit('SET_LOADING', false);
      });
    },
    filterDate({ commit }, date) {
      commit('FILTER_DATE', date);
    },
  },
  getters: {
    loading: state => state.loading,
    sales: state => state.sales,
    dailySales: (state) => {
      const a = groupBy(state.sales, 'date');
      const res = [];
      Object.keys(a).forEach((key) => {
        res.push({
          date: key,
          count: a[key].length,
          totalwitax: parseFloat(a[key]
            .reduce((b, c) => b + parseFloat(c.totalwitax), 0.00)).toFixed(2),
          totalwotax: parseFloat(a[key]
            .reduce((d, e) => d + parseFloat(e.totalwotax), 0.00)).toFixed(2),
        });
      });
      return res;
    },
    topProductsByName: (state) => {
      const counts = state.sales.reduce(
        (result, item) => ({
          ...result,
          [item.product_name]: (result[item.product_name] || 0) + 1,
        }), {},
      );
      const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
      return { sorted, counts };
    },
    topProductsByValue: state => state.sales.reduce(
      (result, item) => ({
        ...result,
        counts: {
          ...result.counts,
          [item.product_name]: (result.counts)
            ? (result.counts[item.product_name] || 0.00) + parseFloat(item.totalwotax)
            : parseFloat(item.totalwotax),
        },
        sorted: Object.keys(result.counts || [])
          .sort((a, b) => result.counts[b] - result.counts[a]),
        totalwotax: (parseFloat(result.totalwotax || 0).toFixed(2))
          + parseFloat(item.totalwotax).toFixed(2),
        totalwitax: (parseFloat(result.totalwitax || 0).toFixed(2))
          + parseFloat(item.totalwitax).toFixed(2),
      }), {},
    ),
  },
});
