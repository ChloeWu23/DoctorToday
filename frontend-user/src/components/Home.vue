<template>
  <div id="carouselHome" class="carousel slide relative" data-bs-ride="carousel">
    <div class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
      <button type="button" data-bs-target="#carouselHome" data-bs-slide-to="0" class="active" aria-current="true"
        aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselHome" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselHome" data-bs-slide-to="2" aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselHome" data-bs-slide-to="3" aria-label="Slide 3"></button>

    </div>
    <div class="carousel-inner relative w-full overflow-hidden">

      <div class="carousel-item active float-left w-full h-full bg-[url('assets/img1.jpg')] bg-no-repeat bg-right p-10">
        <div class="grid grid-cols-2">
          <div class="p-6 md:p-12">
            <p class="text-sky-700">Doctor Today is a London-based private medical clinic that aims to provide
              high-quality
              independent health care services to individuals, families and companies at reasonable cost.</p>
            <button class="bg-sky-700/90 text-white rounded px-4 py-2 my-4">
              <RouterLink to="people">Meet Our Team</RouterLink>
            </button>
          </div>
        </div>
      </div>
      <div class="carousel-item float-left w-full h-full bg-[url('assets/img1.jpg')] bg-no-repeat bg-right p-10">
        <div class="grid grid-cols-2">
          <div class="p-6 md:p-12">
            <p class="text-sky-700">We offer pre-booked appointments to everyone, irrespective of registration with an
              NHS doctor, private medical insurance or visitor status. <br />Walk-in patients are welcome during our
              clinical
              hours, however
              booking an appointment is strongly recommended due to possible long waiting times as priority is given to
              booked
              appointments.</p>
          </div>
        </div>
      </div>
      <div class="carousel-item float-left w-full">
        <div class="col-span-3 m-10 bg-gray-100">
          PLACEHOLDER FOR MONTH COMPONENT
        </div>
      </div>
      <div class="carousel-item float-left w-full">

        <div class="col-span-3 m-10 bg-gray-100">
          PLACEHOLDER FOR NEWS COMPONENT
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
      type="button" data-bs-target="#carouselHome" data-bs-slide="prev">
      <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
      type="button" data-bs-target="#carouselHome" data-bs-slide="next">
      <span class="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  <ContactButton />
  <div class="m-4"></div>
  <div class="grid grid-cols-3">
    <div class="w-full flex items-center bg-slate-100 py-10 pl-4">
      <div class="p-4 scale-125">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M3.161 4.469a6.5 6.5 0 0 1 8.84-.328 6.5 6.5 0 0 1 9.178 9.154l-7.765 7.79a2 2 0 0 1-2.719.102l-.11-.101-7.764-7.791a6.5 6.5 0 0 1 .34-8.826zm1.414 1.414a4.5 4.5 0 0 0-.146 6.21l.146.154L12 19.672l5.303-5.304-3.535-3.535-1.06 1.06a3 3 0 1 1-4.244-4.242l2.102-2.103a4.501 4.501 0 0 0-5.837.189l-.154.146zm8.486 2.828a1 1 0 0 1 1.414 0l4.242 4.242.708-.706a4.5 4.5 0 0 0-6.211-6.51l-.153.146-3.182 3.182a1 1 0 0 0-.078 1.327l.078.087a1 1 0 0 0 1.327.078l.087-.078 1.768-1.768z" />
        </svg>
      </div>
      <div>
        <div class="my-2">Find A Service
        </div>
        <div>
          <SearchBox />
        </div>
      </div>

    </div>
    <div class="w-full flex items-center bg-sky-100 py-10 pl-4">
      <div class="p-4 scale-125"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0H24V24H0z" />
          <path
            d="M20 2c.552 0 1 .448 1 1v18c0 .552-.448 1-1 1H6c-.552 0-1-.448-1-1v-2H3v-2h2v-2H3v-2h2v-2H3V9h2V7H3V5h2V3c0-.552.448-1 1-1h14zm-1 2H7v16h12V4zm-5 4v3h3v2h-3.001L14 16h-2l-.001-3H9v-2h3V8h2z" />
        </svg></div>
      <div class="w-full">
        <div class="my-2">Find A Slot
        </div>
        <div class="flex">
          <RouterLink to="/appointment" class="border border-double border-4 border-sky-700 p-2 shrink">
            <p class="text-sky-700">Check Availability</p>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="w-full flex items-center bg-gray-100 py-10 pl-4">
      <div class="p-4 scale-125">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M14 22.5L11.2 19H6a1 1 0 0 1-1-1V7.103a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1h-5.2L14 22.5zm1.839-5.5H21V8.103H7V17H12.161L14 19.298 15.839 17zM2 2h17v2H3v11H1V3a1 1 0 0 1 1-1z" />
        </svg>
      </div>
      <div class="w-full">
        <div class="my-2">PLACEHOLDER FOR TRUSTPILOT
        </div>
        <div class="flex">
          <RouterLink to="/appointment" class="border border-double border-4 border-black p-2 shrink">
            <p class="">Check Our Review</p>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RequestAppointmentButton from './RequestAppointmentButton.vue';
import NewPatientButton from './NewPatientButton.vue';
import SearchBox from './SearchBox.vue';
import MapIcon from './MapIcon.vue'
import ContactButton from "./ContactButton.vue";
import "tw-elements";

export default {
  data() {
    return {};
  },
  components: { RequestAppointmentButton, NewPatientButton, MapIcon, ContactButton, SearchBox }
}
</script>
