<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img src="../assets/admin_portal/edit-login-logo.svg" alt="Icon" class="w-8 h-8 mr-2" />
            DoctorToday
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label>Username</label>
                        <input type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" 
                        required v-model="username" name="username" >
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        v-model="password" name="password" >
                    </div>
                    <button @click="login" type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Sign in
                    </button>
                    <p v-if="msg">{{ msg }}</p>
                    
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import DataOtherInfo from '../dataRoutes/DataOtherInfo';

definePageMeta({
  layout: "adminPortal",
});

export default {
    data() {
        return {
            username: '',
            password: '',
            msg: ''
        };
    },
    methods: {
        async login() {
            try {
                const credentials = {
                    username: this.username,
                    password: this.password
                };
                const response = await DataOtherInfo.login(credentials);
                this.msg = response.data.msg;

                // console.log("org: " + localStorage.getItem('userID'));
                localStorage.setItem("userID", this.username);
                // console.log("after: " + localStorage.getItem('userID'));
                
                this.$router.push('/AdminServiceSummary');
            } catch (error) {
                // this.msg = error.response.data.msg;
                this.msg = error;
                console.log(error);
            }
        }
    }

};
</script>

<style scoped>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>