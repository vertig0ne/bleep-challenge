<template>
<b-container>
  <h1>Raw Data</h1>
  <v-client-table
    v-bind:data="originalSales"
    v-bind:columns="columns"
    v-bind:options="options"
  ></v-client-table>
</b-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'RawData',
  computed: {
    ...mapState(['originalSales']),
  },
  data() {
    return {
      columns: ['date', 'product_code', 'product_name', 'totalwitax', 'totalwotax'],
      options: {
        headings: {
          date: 'Date',
          product_code: 'Product Code',
          product_name: 'Product Name',
          totalwitax: 'Total inc. Tax',
          totalwotax: 'Total exc. Tax',
        },
        orderBy: { column: 'date' },
        sortable: ['date', 'product_code', 'product_name'],
        filterable: false,
        perPage: 250,
        perPageValues: [250, 500, 1000, 2000],
      },
    };
  },
};
</script>
