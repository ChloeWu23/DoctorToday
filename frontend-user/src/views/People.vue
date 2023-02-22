<template>
    <div class="flex justify-center items-center">
        <div class="bg-center w-full items-center md:py-40 md:pt-120 bg-[url('@/assets/doctor_today.jpg')] bg-no-repeat">
            <div class = "flex justify-center items-center">
                <h1 class = "text-5xl text-sky-700 text-center p-8 font-extrabold
                            bg-[] rounded-3xl bg-opacity-80">
                            Meet Our Team
                </h1>
            </div>
        </div>
    </div>
    
    <div class="p-10">
        <ul class="grid md:grid-cols-12 md:gap-10 content-center">
            <li class="py-3 px-10 md:px-0 max-w-md md:max-w-none min-h-max
                       md:col-span-6 lg:col-span-4"
                v-for="(item,index) in peopleList" :key="item.id">

                <div class="border-2 border-sky-700 rounded-xl">
                    <button class="flex flex-wrap" @click="showDescription(item.staff_id)">
                        <div class="w-full py-3">
                            <div class="h-full shadow-md w-full flex items-center justify-center overflow-hidden">
                                <img
                                class="pb-3 drop-shadow-xl w-[200px] h-[280px] object-none" v-bind:src='item.image' :alt="item.name"/>
                            </div>
                        </div>

                        <div class="px-8 w-full content-center">
                            <div class="w-5/6 float-left text-left">
                                <div class="py-1 text-base font-bold">{{ item.name }}</div>
                            </div>

                            <div class="h-full items-center float-right">
                                <svg class="rotate" :class="{ rotated: !visible[item.staff_id] }"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <title>expand content</title>
                                    <g>
                                        <path d="M12,0A12,12,0,1,0,24,12,12.035,12.035,0,0,0,12,0Zm6,13H13v5H11V13H6V11h5V6h2v5h5Z"
                                        fill="rgba(3,105,161,1)"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div class="h-[65px] pb-3 px-8 w-full text-left">
                            <p class="text-l font-bold mt-0 " v-if="item.is_independent">Independent Service Provider</p>
                            <p class="py-1 text-xs">{{ item.title }}</p>
                            <p class="italic text-xs">{{ item.profile }}</p>
                        </div>
                    </button>

                    <div class="description px-8 pb-5 text-sm"
                         v-if="visible[item.staff_id]">
                        <div class="leading-6">{{ item.description }}</div>
                    </div>
                </div>
                </li>
                
        </ul>
        
    </div>

</template>

<script>
import DataPeople from '../dataRoutes/DataPeople'
//<div class="px-8 pb-5 text-sm"
export default {
    data () {
        return {
            peopleList: [],
            visible: []
        }
    },
    mounted() {
        DataPeople.get()
        .then(res => {
            this.peopleList = res.data;

            // initialise description to be invisible
            // load image url
            for (let i = 0; i < this.peopleList.length; i++) {
                this.visible[i] = false;
                this.peopleList[i].image = require('../assets/people/' + i + '.png');
            }
        })
        .catch(err => {
            console.log("Error: cannot retrieve people data");
        });
    },
    methods: {
        showDescription(staff_id) {
            for (let i = 0; i < this.visible.length; i++) {
                if (i == staff_id) {
                    continue;
                }
                this.visible[i] = false;
            }
            this.visible[staff_id] = !this.visible[staff_id];        
        },
        
    }
}
</script>

<style>
.rotate{
  transform: rotate(45deg);
  transition: all 0.4s ease-in-out;
}
.rotated{
  transform: rotate(0deg);

}
.description {
animation: height .4s ease-in-out;
}
@keyframes height {
  0%    {opacity: 0; margin-top: -8px}
  100%  {opacity: 1; margin-top: 0px}
}
</style>