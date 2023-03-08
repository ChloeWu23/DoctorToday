<template>
    <div class="fixed z-50 bottom-6 right-24 z-10">
        <transition name="modal" v-if="showModal">
            <!-- <div class="modal-mask" > -->
            <RequestAppointmentModal class="z-60" @close="closeModal" :sembleForm=sembleForm />
            <!-- </div> -->
        </transition>

        <button class="rounded-full bg-white h-16 w-16 drop-shadow-[0_10px_10px_rgba(0,0,0,0.35)]" @click="showModal = !showModal">
            <div class="mx-auto">
                <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20"
                    height="20">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2zm11 9H4v9h16v-9zm-4.964 1.136l1.414 1.414-4.95 4.95-3.536-3.536L9.38 12.55l2.121 2.122 3.536-3.536zM7 5H4v3h16V5h-3v1h-2V5H9v1H7V5z"
                        fill="#1663A9"/>
                </svg>
                <div class="text-sm text-sky-700">Booking</div>
            </div>
        </button>
        <div v-if="control" id="whatsapp-chat">
            <div class="start-chat">

            </div>
            <a class="close-chat" @click="control = false">x</a>
        </div>
    </div>
</template>
  
<script>

export default {
    props: {
        sembleForm: {
            type: String,
            required: true
        }
    },
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
  