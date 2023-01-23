<template>
  <div>
    <h2>PLACEHOLDER FOR HEADER AND NAVIGATION BAR</h2>
    <h1 class="text-gray-700">Appointment Request Form</h1>
    <div class="separator"></div>

    <div v-if="isSending" class="loading">Sending...</div>
    <form class="m-4 min-w-fit max-w-sm md:max-w-lg">
      <div class="grid grid-cols-2 gap-6">
        <label class="block">
          <span class="text-gray-700">Full name</span>
          <input type="text" class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-blue-400
                    focus:ring-0 focus:border-black
                  " required v-model="request.name" placeholder="" autocomplete="off">
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
                  " required v-model="request.email" placeholder="" autocomplete="off">
        </label>
        <label class="block">
          <span class="text-gray-700">Gender</span>
          <input type="email" class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-blue-400
                    focus:ring-0 focus:border-black
                  " required v-model="request.gender" placeholder="" autocomplete="off">
        </label>
        <label class="block">
          <span class="text-gray-700">Telephone</span>
          <input type="email" class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-blue-400
                    focus:ring-0 focus:border-black
                  " required v-model="request.telephone" placeholder="(+44)" autocomplete="off">
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
            <option>Others - Please contact the clinic directly</option>
          </select>
        </label>
      </div>
      <div class="grid grid-cols-1 gap-6">
        <div class="block">Please select up to 3 slots of {{ request.duration }} minutes from the calendar below.</div>
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

        <div class="inline-flex text-gray-700">For the safety of all our patients and staff we are now screening each
          patient for possible symptoms of
          COVID-19. Please answer all questions to the best of your knowledge so that we can offer you the best care. We
          appreciate your cooperation.</div>
        <div class="inline-flex text-gray-700">Please tick the box if relevant </div>
        <label class="ml-2 inline-flex items-center text-gray-700">
          <input type="checkbox" class="
                          border-gray-300 border-2
                          text-black
                          focus:border-gray-300 focus:ring-black
                        " v-model="request.travelOutside">
          <span class="ml-2">Have you travelled anywhere outside of the UK since December 2021?</span>
        </label>

        <label class="ml-2 inline-flex items-center text-gray-700">
          <input type="checkbox" class="
                          border-gray-300 border-2
                          text-black
                          focus:border-gray-300 focus:ring-black
                        " v-model="request.closeContact">
          <span class="ml-2">So far as you are aware, have you been in close contact with anyone who has travelled
            outside of the UK since December 2021?</span>
        </label>

        <label class="ml-2 inline-flex items-center text-gray-700">
          <input type="checkbox" class="
                          border-gray-300 border-2
                          text-black
                          focus:border-gray-300 focus:ring-black
                        " v-model="request.fever">
          <span class="ml-2">Do you have a fever?</span>
        </label>

        <label class="ml-2 inline-flex items-center text-gray-700">
          <input type="checkbox" class="
                          border-gray-300 border-2
                          text-black
                          focus:border-gray-300 focus:ring-black
                        " v-model="request.cough">
          <span class="ml-2">Do you have a cough?</span>
        </label>

        <label class="block">
          <span class="text-gray-700">Additional details</span>
          <div>
            <label class="mt-2 ml-2 inline-flex items-center">
            <input type="checkbox" class="
                          border-gray-300 border-2
                          text-black
                          focus:border-gray-300 focus:ring-black
                        " v-model="request.visitedBefore">
            <span class="ml-2 text-gray-700">Have you visited the clinic before?</span>
          </label>
          </div>
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
      <input type="submit" @submit="submitForm" class="mt-2">
    </form>
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
        gender: '',
        service: '',
        duration: '20',
        message: '',
        visitedBefore: 'false',
        travelOutside: 'false',
        closeContact: 'false',
        fever: 'false',
        cough: 'false'
      },
      services: servicesData,
      isSending: false
    }
  },
  watch: {
    'request.service': function () {
      var vm = this;
      for (const service of vm.services) {
        if (service.name == vm.request.service) {
          vm.request.duration = service.time;
        }
      }
    }
  },
  methods: {
    submitForm(request) {

    }
  }
}


</script>

<style>

</style>