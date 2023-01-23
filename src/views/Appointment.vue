<template>
  <div id="request-form" class="request-form">
    <h2>PLACEHOLDER FOR HEADER AND NAVIGATION BAR</h2>
    <h1 class="request-form_title">Appointment Request Form</h1>
    <div class="separator"></div>

    <div v-if="isSending" class="loading">Sending...</div>
    <div class="mt-8 max-w-md" @submit="onSubmit">
      <div class="grid grid-cols-1 gap-6">
        <label class="block">
          <span class="text-gray-700">Full name</span>
          <input type="text" class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-blue-400
                    focus:ring-0 focus:border-black
                  " v-model="request.name" placeholder="" autocomplete="off">
        </label>
        <label class="block">
          <span class="text-gray-700">Email address</span>
          <input type="email" class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-blue-400
                    focus:ring-0 focus:border-black
                  " v-model="request.email" placeholder="" autocomplete="off">
        </label>
        <label class="block">
          <span class="text-gray-700">Services</span>
          <select class="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-blue-400
                    focus:ring-0 focus:border-black
                  " v-model="request.service" placeholder="" autocomplete="off">
            <option disabled value="">Please select one</option>
            <option v-for="service in services" :value="service.name">
              {{ service.name }}
            </option>
          </select>
        </label>
        <div class="block">Please select up to 3 slots of {{request.duration}} minutes from the calendar below.</div>
        <label class="block">
          <span class="text-gray-700">Date</span>
          <input type="date" class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-blue-400
                    focus:ring-0 focus:border-black
                  " v-model="request.date" placeholder="YYYY/MM/DD" autocomplete="off">
        </label>

        <label class="inline-flex items-center">
          <input type="checkbox" class="
                          border-gray-300 border-2
                          text-black
                          focus:border-gray-300 focus:ring-black
                        " v-model="request.visitedBefore">
          <span class="ml-2">Have you visited the clinic before?</span>
        </label>
        <label class="block">
          <span class="text-gray-700">Additional details</span>
          <textarea class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-blue-400
                    focus:ring-0 focus:border-black
                  " rows="4" v-model="request.message" placeholder="Please provide any additional details here"
            autocomplete="off"></textarea>
        </label>
      </div>
    </div>
    <div v-bind="request">{{ request }}</div>
  </div>
</template>

<script>
import servicesData from '../assets/services.json';


export default {
  data() {
    return {
      request: {
        name: '',
        email: '',
        telephone: '',
        service: '',
        message: '',
        duration: '20',
        visitedBefore: ''
      },
      services: servicesData,
      isSending: false
    }
  },
  watch: {
    'request.service': function () {
      var vm = this;
      for (const service of this.services) {
        if (service.name == this.request.service) {
          vm.$set(vm.request, 'duration', service.time);
        }
      }
    }
  },
  methods: {
    onSubmit() {
    }
  }
}


</script>

<style>

</style>