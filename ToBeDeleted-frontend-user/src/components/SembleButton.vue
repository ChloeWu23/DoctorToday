<template>
    <div class="fixed bottom-6 right-24 z-10">
        <transition name="modal" v-if="showModal">
            <!-- <div class="modal-mask" > -->
            <RequestAppointmentModal @close="closeModal" />
            <!-- </div> -->
        </transition>
        <button class="rounded-full bg-white h-16 w-16 flex place-content-center shadow-2xl" @click="showModal = !showModal">
            <svg class="self-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                    d="M8 20v-6h8v6h3V4H5v16h3zm2 0h4v-4h-4v4zm11 0h2v2H1v-2h2V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v17zM11 8V6h2v2h2v2h-2v2h-2v-2H9V8h2z" />
            </svg>
        </button>
        <div v-if="control" id="whatsapp-chat">
            <div class="start-chat">

            </div>
            <a class="close-chat" @click="control = false">x</a>
        </div>
    </div>
</template>
  
<script>
import RequestAppointmentModal from './RequestAppointmentModal.vue';

export default {
    components: { RequestAppointmentModal },
    data() {
        return {
            control: false,
            showModal: false,
        };
    },
    methods: {
        closeModal() {
            this.showModal = false;
        },
    }
};
</script>
  