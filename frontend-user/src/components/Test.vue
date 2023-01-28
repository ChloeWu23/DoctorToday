<template>
  <section>
    <header>
      <h1>My Data</h1>
    </header>
    <ul align="center" v-for="item in service" v-bind:key="item.id">
      <pre>
        {{ item.serviceName }}
      
        {{ item.description_1 }}
        {{ item.description_2 }}
        {{ item.description_3 }}
      </pre>
      <br />
    </ul>
    <!-- <ul>{{ User[0] }}</ul>
    <ul> \ </ul>
    <ul>{{ User[1] }}</ul>
    <ul> \ </ul>
    <ul>{{ User[2] }}</ul> -->
  </section>
</template>

<script>
// import axios from 'axios';
import DataService from '../dataRoutes/DataService';

export default {
  name: "list-people",
  data() {
    return {
      service: {},
    }
  },
  mounted() {
    // axios.get('http://localhost:3000')
    DataService.get()
      .then(response => {
        console.log(response.data);
        this.service = response.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

import axios from "axios";

<style>
#app input {
  font: inherit;
  padding: 0.15rem;
}

#app label {
  font-weight: bold;
  margin-right: 1rem;
  width: 7rem;
  display: inline-block;
}

#app form div {
  margin: 1rem 0;
}
</style>