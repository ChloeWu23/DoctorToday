<template>
    <div class="text-gray-700">
        <h1 class="text-gray-700 m-6 md:m-10 font-bold">New Patient Registration Form</h1>
        <form class="mx-6 md:mx-20 min-w-fit">
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
                        required v-model="register.homeTel" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <span>Mobile</span>
                    <input type="text" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        required v-model="register.mobile" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <span>Fax</span>
                    <input type="text" class="w-full border-0 border-b-2 border-sky-700 focus:ring-0 focus:border-black"
                        required v-model="register.fax" placeholder="" autocomplete="off">
                </label>
                <label class="block">
                    <div>How did you hear about us?</div>
                    <div class="grid md:grid-cols-2 xl:grid-cols-4">
                        <span v-for="medium in register.media">
                            <input type="checkbox" class="my-2 border-sky-700 border-2 focus:ring-sky-700"
                                v-model="medium.flag"><span class="mx-2">{{ medium.medium }}</span>
                        </span>
                    </div>
                </label>
                <label class="block">
                    <div>How would you like to receive your results?</div>
                    <div class="grid grid-cols-4">
                        <span v-for="comm in register.comms">
                            <input type="checkbox" class="my-2 border-sky-700 border-2 focus:ring-sky-700"
                                v-model="comm.flag"><span class="mx-2">{{ comm.comm }}</span>
                        </span>
                    </div>
                </label>
            </div>
            <input type="submit" @submit="submitForm"
                class="mt-8 p-2 bg-sky-700 text-center rounded-lg text-white border-white">
            <div class="m-10" v-bind="register">{{ register }}</div>
        </form>
    </div>
</template>

<script>
export default {
    method: {
        submitForm() { }
    },
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
                notes: ''
            }
        }
    }
}
</script>