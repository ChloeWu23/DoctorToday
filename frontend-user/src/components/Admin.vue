<template>
  <h1 class="text-center font-bold">Add New Data</h1>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="block">
        <label for="serviceName">Service Category Name</label>
        <input type="text" class="mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-sky-700
                    focus:ring-0 focus:border-black" id="ServiceName" required v-model="newService.serviceName"
          name="title" />
      </div>

      <div class="block">
        <label for="description_1">description 1</label>
        <input class="mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-sky-700
                    focus:ring-0 focus:border-black" id="description_1" v-model="newService.description_1"
          name="description_1" />
      </div>

      <div class="block">
        <label for="description_2">description 2</label>
        <input class="mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-sky-700
                    focus:ring-0 focus:border-black" id="description_2" v-model="newService.description_2"
          name="description_2" />
      </div>

      <div class="block">
        <label for="description_3">description 3</label>
        <input class="mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-sky-700
                    focus:ring-0 focus:border-black" id="description_3" v-model="newService.description_3"
          name="description_3" />
      </div>

      <button @click="saveNewService" class="my-8 p-2 bg-sky-700 text-center rounded-lg text-white border-white">Submit</button>
    </div>

    <div v-else>
      <h4>Add a Service Successful</h4>
      <button class="mt-8 p-2 bg-sky-700 text-center rounded-lg text-white border-white" @click="InitService">Add a New One!</button>
    </div>
  </div>
</template>

<script>
// import TodoDataService from "../services/TodoDataService";

import DataService from '@/dataRoutes/DataService';

export default {
  name: "add-newService",
  data() {
    return {
      newService: {
        serviceName: "",
        description_1: "",
        description_2: "",
        description_3: ""
      },
      submitted: false
    };
  },
  methods: {
    saveNewService() {
      var data = {
        serviceName: this.newService.serviceName,
        description_1: this.newService.description_1,
        description_2: this.newService.description_2,
        description_3: this.newService.description_3
      };

      DataService.creaete(data)
        .then(res => {
          console.log(res.data);
          this.submitted = true;
        })
        .catch(err => {
          console.log(err);
        });
      // TodoDataService.create(data)
      //   .then(response => {
      //     this.todo.id = response.data.id;
      //     console.log(response.data);
      //     this.submitted = true;
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });
    },

    InitService() {
      this.submitted = false;
      this.newService = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>