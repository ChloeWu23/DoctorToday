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
      .then( response => {
        console.log(response.data);
        this.service = response.data;
      })
      .catch( err => {
        console.log(err);
      });
    }
  };
  </script>

  import axios from "axios";
  
  <style>
  * {
    box-sizing: border-box;
  }
  html {
    font-family: 'Jost', sans-serif;
  }
  body {
    margin: 0;
  }
  header {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 3rem auto;
    border-radius: 10px;
    padding: 1rem;
    background-color: #58004d;
    color: white;
    text-align: center;
    width: 90%;
    max-width: 40rem;
  }
  #app ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  #app li,
  #app form {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 1rem auto;
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    width: 90%;
    max-width: 40rem;
  }
  #app h2 {
    font-size: 2rem;
    border-bottom: 4px solid #ccc;
    color: #58004d;
    margin: 0 0 1rem 0;
  }
  #app button {
    font: inherit;
    cursor: pointer;
    border: 1px solid #ff0077;
    background-color: #ff0077;
    color: white;
    padding: 0.05rem 1rem;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
  }
  #app button:hover,
  #app button:active {
    background-color: #ec3169;
    border-color: #ec3169;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
  }
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