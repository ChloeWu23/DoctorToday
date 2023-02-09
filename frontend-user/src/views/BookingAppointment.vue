<template>
    <div class="px-4 py-4 text-justify">
        <h1 class = "py-2 text-gray-700 font-bold text-xl font-sans">Booking Requests<br></h1>
        <p class = "text-base">Appointments can be requested online via our <RouterLink class = "text-sky-700 font-bold underline underline-offset-4" to="Appointment"> online booking system.</RouterLink> 
        You will need to wait for one of our friendly staff to email you back with a confimation before your appoitnment is booked.
        <span class = "text-base font-semibold">Please check your junk mail for confirmation emails.</span> </p>
        <div><br></div>

        <div class = "text-base">
            <p>Alternatively, appointments can be booked by telephone on 020 7433 1444 or <a class = "text-sky-700 font-extrabold underline underline-offset-4" href="https://wa.me/447879635767"> WhatsApp</a>.
                If you are not sure which services you will require, our friendly and helpful reception staff will 
                be happy to discuss your needs.
            </p>
            <div><br></div>
            <p>Due to high demand for appointments we do require a 
            <b>deposit of £40 for all new patients and Saturday appointments</b>. 
                This will be deducted from the total charge on the day.
            </p>
        </div>
        <div><b><br></b></div>

        <h1 class = "py-2 text-gray-700  font-bold text-xl font-sans">Walk-in Appointments</h1>
        <p class="text-base">Our walk in service is <b>temporarily suspended</b> due to 
            social distancing - we do not currently have a waiting room and 
            ask all patients to please call or email to book an appointment.
            <br></p>

         <div><b><br></b></div>
        <h1 class = "py-2 text-gray-700  font-bold text-xl font-sans">Family members, friends and chaperones</h1>
        <p class="text-bae">Patients are welcome to attend with a family member or friend. At your specific request, 
        they may sit in on the consultation. For females undergoing intimate examinations or tests 
        by male clinicians, it is our policy that a female chaperone is always present, for your peace 
        of mind as well as ours so that probity is assured. This chaperone may be one of the female reception staff when a nurse 
        is not available; alternatively you may bring along a family member or friend yourself. If this is unacceptable 
        to you, please ask to see a same-sex or female clinician when booking.</p>
        
        <div><b><br></b></div>
        <h1 class = "py-2 text-gray-700  font-bold text-xl font-sans">Children</h1>
        <p class = "text-base">Please note that children under 16 years of age will not be seen unless accompanied by a 
            parent or other person with parental responsibility. However, with consent of both parties, 
            a child under 16 may be seen privately for non-intimate examinations by a same-sex or 
            female clinician.
        </p>

        <div><b><br></b></div>
        <h1 class = "py-2 text-gray-700  font-bold text-xl font-sans">Register Online</h1>
        <div class = "text-base">You can save time at your appointment by filling out this
             <RouterLink class = "text-sky-700 font-extrabold underline underline-offset-4" to="NewPatientRegister">online patient registration</RouterLink> 
             form prior to your arrival.
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {     
        }
    }
}
</script>