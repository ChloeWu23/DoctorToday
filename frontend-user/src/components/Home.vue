<template>
  <div class="grid grid-cols-6 gap-4 m-6">
    <div class="col-span-4 p-10 font-bold text-sky-700 subpixel-antialiased">
      <p>Doctor Today is a London-based private medical clinic that aims to provide high-quality independent health
        care services to individuals, families and companies at reasonable cost.
      </p>
    </div>
    <div class="col-span-2 m-10 bg-gray-100">NEWS COMPONENT TO BE ADDED</div>
    <div class="col-span-6 flex justify-end">
      <RequestAppointmentButton></RequestAppointmentButton>
      <NewPatientButton></NewPatientButton>
      <ContactButton />
      <MapIcon />
    </div>
    <div class="col-span-3 text-md p-10">
      We offer pre-booked appointments to everyone, irrespective of registration with an NHS doctor, private
      medical insurance or visitor status. Walk-in patients are welcome during our clinical hours, however booking an
      appointment is strongly recommended due to possible long waiting times as priority is given to booked
      appointments.
    </div>
    <div class="col-span-3 m-10 bg-gray-100">
      PLACEHOLDER FOR MONTH COMPONENT
    </div>
  </div>
</template>

<script>
import RequestAppointmentButton from './RequestAppointmentButton.vue';
import NewPatientButton from './NewPatientButton.vue';
import MapIcon from './MapIcon.vue'
import ContactButton from "./ContactButton.vue";

export default {
  data() {
    return {};
  },
  components: { RequestAppointmentButton, NewPatientButton, MapIcon, ContactButton }
}
</script>
