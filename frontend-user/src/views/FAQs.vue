<template>
    
    <div class = "text-left text-2xl">
		<h1>Frequently Asked Questions</h1>
        <div><br></div>
	</div> 
    
      <div class = "container">
        <ol>
        <li v-for="(item,index) in QuestionList" :key="index" class="mb-4">
            <li @click="item.showAnswer = !item.showAnswer"
                class="text-left w-full py-1 text-black italic font-medium  hover:bg-sky-200">
        {{ item.question }}
            </li>
            <transition name="slide-down">
                <p v-if="item.showAnswer"
                    class="py-2 p-4 bg-white font-bold border border-gray-300 rounded-lg">
                        {{ item.answer }}
                </p>
            </transition>
        </li>
        </ol>
      </div>
</template>

<script>

import DataFAQ from '../dataRoutes/DataFAQ'

export default {
    data () {
        return {
            QuestionList:[],
            
        }
    },
    /*
    methods:{
        showAnswer(){
            if (flag) flag = false;
            if (!flag) flag = true;
            return flag;
        }

    },
    */
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