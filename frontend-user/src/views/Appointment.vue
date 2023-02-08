<template>
  <div>
    <h1 class="text-gray-700 m-10 w-full">Appointment Request Form</h1>
    <div class="separator"></div>

    <form class="m-10 min-w-fit">
      <div class="grid md:grid-cols-2 gap-6">
        <label class="block">
          <span class="text-gray-700">Full name</span>
          <input type="text" class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-sky-700
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
                    border-0 border-b-2 border-sky-700
                    focus:ring-0 focus:border-black
                  " required v-model="request.email" placeholder="" autocomplete="off">
        </label>
        <label class="block">
          <span class="text-gray-700">Gender</span>
          <input type="text" class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-sky-700
                    focus:ring-0 focus:border-black
                  " required v-model="request.gender" placeholder="" autocomplete="off">
        </label>
        <label class="block">
          <span class="text-gray-700">Telephone</span>
          <input type="text" class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-sky-700
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
                    border-0 border-b-2 border-sky-700
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
        <div class="block text-gray-700">Please select up to 3 slots of {{ request.duration }} minutes from the calendar
          below.</div>

        <div>
          <AvailabilityPicker :duration="request.duration" @slotSelection="updateSelection"></AvailabilityPicker>
        </div>

        <div class="inline-flex text-gray-700">For the safety of all our patients and staff we are now screening each
          patient for possible symptoms of
          COVID-19. Please answer all questions to the best of your knowledge so that we can offer you the best care. We
          appreciate your cooperation.</div>
        <div class="inline-flex text-gray-700">Please tick the box if relevant </div>
        <label class="ml-2 inline-flex items-center text-gray-700">
          <input type="checkbox" class="
                          border-sky-700 border-2
                          text-black
                          focus:border-sky-700 focus:ring-sky-700
                        " v-model="request.travelOutside">
          <span class="ml-2">Have you travelled anywhere outside of the UK since December 2021?</span>
        </label>
        <label class="ml-2 inline-flex items-center text-gray-700">
          <input type="checkbox" class="
                          border-sky-700 border-2
                          text-black
                          focus:border-sky-700 focus:ring-sky-700
                        " v-model="request.closeContact">
          <span class="ml-2">So far as you are aware, have you been in close contact with anyone who has travelled
            outside of the UK since December 2021?</span>
        </label>
        <label class="ml-2 inline-flex items-center text-gray-700">
          <input type="checkbox" class="
                          border-sky-700 border-2
                          text-black
                          focus:border-sky-700 focus:ring-sky-700
                        " v-model="request.fever">
          <span class="ml-2">Do you have a fever?</span>
        </label>
        <label class="ml-2 inline-flex items-center text-gray-700">
          <input type="checkbox" class="
                          border-sky-700 border-2
                          text-black
                          focus:border-sky-700 focus:ring-sky-700
                        " v-model="request.cough">
          <span class="ml-2">Do you have a cough?</span>
        </label>
        <label class="ml-2 inline-flex items-center text-gray-700">
          <input type="checkbox" class="
                          border-sky-700 border-2
                          text-black
                          focus:border-sky-700 focus:ring-sky-700
                        " v-model="request.shortBreath">
          <span class="ml-2">Are you suffering from shortness of breath??</span>
        </label>
        <label class="ml-2 inline-flex items-center text-gray-700">
          <input type="checkbox" class="
                          border-sky-700 border-2
                          text-black
                          focus:border-sky-700 focus:ring-sky-700
                        " v-model="request.respiratoryProblems">
          <span class="ml-2">Are you suffering from respiratory problems?</span>
        </label>
        <label class="block">
          <span class="text-gray-700">Additional details</span>
          <div>
            <label class="ml-2 inline-flex items-center">
              <input type="checkbox" class="
                          border-sky-700 border-2
                          text-black
                          focus:border-sky-700 focus:ring-sky-700
                        " v-model="request.visitedBefore">
              <span class="ml-2 text-gray-700">Have you visited the clinic before?</span>
            </label>
          </div>
          <textarea class="mt-0 block w-full px-0.5 border-0 border-b-2 border-sky-700
                    focus:ring-0 focus:border-black
                  " rows="4" v-model="request.message" placeholder="Please provide any additional details here"
            autocomplete="off"></textarea>
        </label>
      </div>
      <button @click="sendEmail"
        class="mt-8 p-2 bg-sky-700/80 text-center rounded-lg text-white border-white">Submit</button>
    </form>
  </div>
</template>

<script>
import DataService from '../dataRoutes/DataService';
import servicesData from '../assets/config.json';
import AvailabilityPicker from '../components/AvailabilityPicker.vue'

export default {
  components: {
    AvailabilityPicker
  },
  data() {
    return {
      request: {
        name: '',
        email: '',
        telephone: '',
        gender: '',
        service: '',
        duration: '999',
        message: '',
        visitedBefore: 'false',
        travelOutside: 'false',
        closeContact: 'false',
        fever: 'false',
        cough: 'false',
        shortBreath: 'false',
        respiratoryProblems: 'false',
        selectedSlots: [],
      },
      services: servicesData.appointmentDropDown,
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
    sendEmail() {
      var data = {
        email: this.request.email,
        name: this.request.name,
        gender: this.request.gender,
        slotSelect1: "hello1",//this.request.selectedSlots[0],
        slotSelect2: "hell02",//this.request.selectedSlots[1],
        slotSelect3: "hello3"//this.request.selectedSlots[2]
      };
      DataService.sendEmail(data);
    },
    updateSelection(newValue) {
      console.log("in the updateSelection method")
      this.request.selectedSlots = newValue;
      console.log(this.request.selectedSlots)
    }
  }
}

</script>

<style>

</style>