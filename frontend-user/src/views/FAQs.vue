<template>
    
    <div class = "h-full shadow-md m-1 md:m-8">
        <div><br></div>
		<h1 class="text-2xl text-sky-700 px-6 pb-5">Frequently Asked Questions</h1>

        <div class="">
            <details class="open:bg-gray-100 duration-300" v-for="(item,index) in QuestionList" :key="index">
                <summary
                    class="px-4 py-3 text-lg cursor-pointer hover:bg-gray-100 border-b-2 flex justify-between items-center w-full text-sm md:text-base">
                    <div class="p-2 text-sky-700">
                        <div>{{index+1}}. {{ item.question }}</div>
                    </div>
                </summary>
                <div class="bg-white p-6 text-base text-justify">
                    {{ item.answer }}
                </div>
            </details>
        </div>
    </div>

</template>

<script>
import DataFAQ from '../dataRoutes/DataFAQ'
//<hr class="text-grey-300 border-1.5 m-0 p-0">
/*
<div class = "">
            <ol>
                <li v-for="(item,index) in QuestionList" :key="index" class="">
                    <button  
                    class="text-left w-full py-1 text-black text-lg font-semibold hover:bg-gray-200 border-b-0 border-gray-200"
                    @click="item.showAnswer = !item.showAnswer">
                        <span class = "font-bold inline-flex">{{ index +1 }}. &nbsp;</span>
                      {{ item.question }}    
                    </button>
            
                    <transition name="slide-fade">
                        <p v-if="item.showAnswer" class="py-2 p-4 bg-white text-base ">{{ item.answer }}</p>
                    </transition>
                </li>
            </ol>
        </div>
        */
export default {
    data () {
        return {
            QuestionList:[]
        }
    },
    mounted() {
        DataFAQ.get()
        .then(res => {
            this.QuestionList = res.data;
        })
        .catch(err =>{
            console.log("Error: can not retrieve FAQs data")
        })
    }
}
</script>

<style>
details>summary {
    list-style: none;
}

details summary::-webkit-details-marker {
    display: none;
}

details summary::after {
    content: '+';
    font-size: 2em;
    color: slategrey
}

details[open] summary::after {
    content: "-";
}
</style>