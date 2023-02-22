<template>

    <head>
        <component :is="'script'" type="text/javascript">function enableButton(){
            document.getElementById('submitButton').disabled=false;
            }</component>
        <component :is="'script'" type="text/javascript" src="https://www.google.com/recaptcha/api.js" async defer>
        </component>
    </head>

    <div class="text-gray-700">
        <h1 class="text-gray-700 m-6 md:m-10 font-bold">New Patient Registration Form</h1>
        <form class="m-10 min-w-fit max-w-fit md:max-w-fit">
            <div class="grid md:grid-cols-2 gap-10">
                <label class="block">
                    <span>First name</span>
                    <input type="text" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        required v-model="register.firstName" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <span>Last name</span>
                    <input type="text" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        required v-model="register.lastName" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <span>Date of Birth</span>
                    <input type="date" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        required v-model="register.dob" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <span>Address Line 1</span>
                    <input type="text" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        required v-model="register.address1" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <span>Address Line 2</span>
                    <input type="text" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        v-model="register.address2" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <span>Address Line 3</span>
                    <input type="text" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        v-model="register.address3" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <span>Town/City</span>
                    <input type="text" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        required v-model="register.townCity" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <span>Post Code</span>
                    <input type="text" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        required v-model="register.postcode" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <span>Email</span>
                    <input type="text" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        required v-model="register.email" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <span>Home Tel</span>
                    <input type="text" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        v-model="register.homeTel" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <span>Mobile</span>
                    <input type="text" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        required v-model="register.mobile" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <span>Fax</span>
                    <input type="text" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        v-model="register.fax" placeholder="" autocomplete="off">
                </label>
                <!-- <label class="block">
                    <div>How did you hear about us?</div>
                    <div class="grid md:grid-cols-2 xl:grid-cols-4">
                        <span v-for="medium in register.media">
                            <input type="checkbox" class="my-2 border-sky-700 border-2 focus:ring-sky-700"
                                v-model="medium.flag"><span class="mx-2"><span>{{ medium.medium }}</span></span></span>
                    </div>
                </label> -->
                <label class="block">
                    <div>How did you hear about us?</div>
                    <div class="grid md:grid-cols-2 xl:grid-cols-4">
                        <label v-for="medium in register.media" class="flex items-center">
                            <input type="checkbox" class="my-2 border-sky-700 border-2 focus:ring-sky-700" 
                            v-model="medium.flag"><span class="mx-2">{{ medium.medium }}</span>
                         </label>
                    </div>
                </label>

                <!-- <label class="block">
                    <div>How would you like to receive your results?</div>
                    <div class="grid grid-cols-4">
                        <span v-for="comm in register.comms">
                            <input type="checkbox" class="my-2 border-sky-700 border-2 focus:ring-sky-700"
                                v-model="comm.flag"><span class="mx-2">{{ comm.comm }}</span>
                        </span>
                    </div>
                </label> -->
                <label class="block">
                    <div>How would you like to receive your results?</div>
                    <div class="grid md:grid-cols-2 xl:grid-cols-4">
                        <label v-for="comm in register.comms" class="flex items-center">
                            <input type="checkbox" class="my-2 border-sky-700 border-2 focus:ring-sky-700"
                            v-model="comm.flag"><span class="mx-2">{{ comm.comm }}</span>
                        </label>
                    </div>
                </label>

                <label class="block mb-8">
                    <div class="flex items-center">
                        <span>
                            <input type="checkbox" class="my-2 border-sky-700 border-2 focus:ring-sky-700"
                            required v-model="register.gdpr" autocomplete="off"><span class="mx-2"></span>
                        </span>
                    <div>By ticking the box you consent your data will be used by DoctorToday for the purpose of your own medical treatment</div>
                    </div>
                </label>
            </div>
            <div class="g-recaptcha" data-sitekey="6Lc-NnskAAAAAEIXjaR8lUD6m8HKSo2MHAGCPYyw"
                data-callback="enableButton">
            </div>

            <button @click="sendRegisterEmail" id="submitButton" disabled="disabled"
                class="mt-8 p-2 bg-sky-700/80 text-center rounded-lg text-white border-white">Submit</button>
        </form>

    </div>
</template>

<script>
import DataService from '../dataRoutes/DataService';

export default {
    data() {
        return {
            register: {
                firstName: '',
                lastName: '',
                dob: '',
                address1: '',
                address2: '',
                address3: '',
                townCity: '',
                postcode: '',
                email: '',
                homeTel: '',
                mobile: '',
                fax: '',
                media: [{ medium: "Google", flag: 'false' }, { medium: "Yahoo", flag: 'false' }, { medium: "Other Search Engines", flag: 'false' }, { medium: "Word of Mouth", flag: 'false' }, { medium: "Walked By", flag: 'false' }, { medium: "Other", flag: 'false' }],
                comms: [{ comm: "Phone", flag: 'false' }, { comm: "Email", flag: 'false' }, { comm: "Fax", flag: 'false' }, { comm: "Post", flag: 'false' }],
                notes: '',
                gdpr: ''
            },
            isSending: false
        }
    },
    methods: {
        sendRegisterEmail() {
            if(!this.register.gdpr){
                alert("Please check the GDPR checkbox before submitting.");
                return;
            }
            if(!this.register.email){
                alert("Please enter your Email Address before submitting.");
                return;
            }
            if(!this.register.firstName){
                alert("Please enter your First Name before submitting.");
                return;
            }
            if(!this.register.lastName){
                alert("Please enter your last name before submitting.");
                return;
            }
            if(!this.register.dob){
                alert("Please enter your Date of Birth before submitting.");
                return;
            }
            if(!this.register.postcode){
                alert("Please enter your Postcode before submitting.");
                return;
            }

            var data = {
                email: this.register.email,
                firstName: this.register.firstName,
                lastName: this.register.lastName,
                dob: this.register.dob,
                address1: this.register.address1,
                postcode: this.register.postcode,
                mobile: this.register.mobile,
                gdpr: this.register.gdpr
            };
            console.log(DataService.sendRegisterEmail(data));
        }
    }
}
</script>