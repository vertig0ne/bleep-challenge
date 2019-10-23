<template>
    <b-container fluid v-if="loading">
      Opening App....
    </b-container>
    <b-container fluid v-else>
      <b-navbar variant="faded" type="light">
        <b-navbar-brand to="/">Bleep Challenge</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/raw">Raw Data</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <b-jumbotron header="Challenge"></b-jumbotron>
      <router-view/>
    </b-container>
</template>

<script>
import { mapState } from 'vuex';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/assets/scss/main.scss';

export default {
  created() {
    this.$store.dispatch('fetchSalesData');
  },
  computed: {
    ...mapState(['loading']),
  },
};
</script>
