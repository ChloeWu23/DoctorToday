<template>
    <div class="px-2 py-4 text-justify">
        <div class="py-8 grid grid-cols-10">
            <div class="pb-10 col-span-10 md:col-span-2">
                <div class="flex justify-center">
                    <img class="w-36" src="@/assets/booking/booking.png"/>
                </div>
            </div>
            <div class="px-3 col-span-10 md:col-start-3 md:col-span-7">
                <h1 class = "text-gray-700 font-bold text-2xl font-sans">Booking Requests</h1>
                <div><br></div>
                <p class = "text-base leading-7">Appointments can be requested online via our <NuxtLink class = "text-sky-700 font-bold hover:underline hover:underline-offset-4" to="Appointment"> online booking system.</NuxtLink> 
                You will need to wait for one of our friendly staff to email you back with a confimation before your appointment is booked.
                <span class = "text-base font-semibold">Please check your junk mail for confirmation emails.</span> </p>
                <div><br></div>

                <p class = "text-base leading-7">Alternatively, appointments can be booked by telephone on 020 7433 1444 or <a class = "text-sky-700 font-extrabold hover:underline hover:underline-offset-4" href="https://wa.me/447879635767"> WhatsApp</a>.
                If you are not sure which services you will require, our friendly and helpful reception staff will 
                be happy to discuss your needs.
                </p>
                <div><br></div>

                <p class = "text-base leading-7">Due to high demand for appointments we do require a 
                <b>deposit of £40 for all new patients and Saturday appointments</b>. 
                This will be deducted from the total charge on the day.
                </p>
            </div>
        </div>

        <div class="py-8 grid grid-cols-10">
            <div class="pb-10 col-span-10 md:col-span-2">
                <div class="flex justify-center">
                    <img class="w-36" src="@/assets/booking/register.png"/>
                </div>
            </div>
            <div class="px-3 col-span-10 md:col-start-3 md:col-span-7">
                <h1 class = "py-2 text-gray-700  font-bold text-2xl font-sans">Register Online</h1>
                <div><br></div>
                <p class = "text-base leading-7">You can save time at your appointment by filling out this
                <NuxtLink class = "text-sky-700 font-extrabold hover:underline hover:underline-offset-4" to="NewPatientRegister">online patient registration</NuxtLink> 
                form prior to your arrival.
                </p>
            </div>
        </div>

        <div class="py-8 grid grid-cols-10">
            <div class="pb-10 col-span-10 md:col-span-2">
                <div class="flex justify-center">
                    <img class="w-36" src="@/assets/booking/family.png"/>
                </div>
            </div>
            <div class="px-3 col-span-10 md:col-start-3 md:col-span-7">
                <h1 class = "text-gray-700  font-bold text-2xl font-sans">Family members, friends and chaperones</h1>
                <div><br></div>
                <p class="text-bae leading-7">Patients are welcome to attend with a family member or friend. At your specific request, 
        they may sit in on the consultation. For females undergoing intimate examinations or tests 
        by male clinicians, it is our policy that a female chaperone is always present, for your peace 
        of mind as well as ours so that probity is assured. This chaperone may be one of the female reception staff when a nurse 
        is not available; alternatively you may bring along a family member or friend yourself. If this is unacceptable 
        to you, please ask to see a same-sex or female clinician when booking.
                </p>   
            </div>
        </div>

        <div class="py-8 grid grid-cols-10">
            <div class="pb-10 col-span-10 md:col-span-2">
                <div class="flex justify-center">
                    <img class="w-36" src="@/assets/booking/children.png"/>
                </div>
            </div>

            <div class="px-3 col-span-10 md:col-start-3 md:col-span-7">
                <h1 class = "py-2 text-gray-700  font-bold text-2xl font-sans">Children</h1>
                <div><br></div>
                <p class = "text-base leading-7">Please note that children under 16 years of age will not be seen unless accompanied by a 
                parent or other person with parental responsibility. However, with consent of both parties, 
                a child under 16 may be seen privately for non-intimate examinations by a same-sex or 
                female clinician.
                </p>
            </div>
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