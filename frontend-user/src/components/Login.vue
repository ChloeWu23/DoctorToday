<template>
    <div>
        <h1 class="text-[30px] text-center font-bold">Login</h1>
        <div class="submit-form">
            <div class="block">
                <label>Username</label>
                <input type="text" class="mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-sky-700
                    focus:ring-0 focus:border-black" required v-model="username"
                name="username" />
            </div>

            <div class="block">
                <label>Password</label>
                <input type="password" class="mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-sky-700
                    focus:ring-0 focus:border-black" v-model="password"
                name="password" />
            </div>

            <button @click="login"
                class="mt-8 p-2 bg-sky-700 text-center rounded-lg text-white border-white">
                Submit
            </button>
            <p v-if="msg">{{ msg }}</p>
        </div>
        <!-- <input type="text" placeholder="Username" v-model="username" />
        <input type="password" placeholder="Password" v-model="password" /> -->
        
    </div>
</template>

<script>
import DataOtherInfo from '../dataRoutes/DataOtherInfo';


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
                // const token = response.data.token;
                const user = response.data.user;
                const token = "token0";
                this.$store.dispatch('login', { token, user });
                this.$router.push('/showServices');
            } catch (error) {
                // this.msg = error.response.data.msg;
                this.msg = error;
                console.log(error);
            }
        }
    }
    
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>