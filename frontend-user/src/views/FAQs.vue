<template>
    
    <div class = "text-left text-2xl">
		<h1>Frequently Asked Questions</h1>
        <div><br></div>
	</div> 
    
    <div class = "text-left m-0">
        <div v-for="(item,index) in QuestionList" :key="index" class="mb-2">
            <button @click="item.showAnswer = !item.showAnswer"
                class="text-left w-full py-2 text-gray-700 font-medium bg-gray-200 hover:bg-gray-300">
        {{ item.question }}
            </button>
            <transition name="slide-down">
                <div v-if="item.showAnswer"
                    class="p-4 bg-gray-100 border border-gray-300 rounded-lg">
                        {{ item.answer }}
                 </div>
            </transition>
        </div>
        <!--
    <ol style="list-style-type: decimal">
        <li v-for = "(item,index) in QuestionList" :key = "index"  @click="showAnswer">
            <p class = "text-left text-lg font-bold m-2" v-if="showAnswer">
                {{ item.question }}
            </p>
            <p class = "text-left text-medium italic m-2">
                {{ item.answer }}
            </p>
        </li>
    </ol>
-->
    </div>
</template>

<script>
import { Flag } from '@element-plus/icons'
import DataFAQ from '../dataRoutes/DataFAQ'

export default {
    data () {
        return {
            QuestionList:[],
            flag: false
        }
    },
    methods:{
        showAnswer(){
            if (flag) flag = false;
            if (!flag) flag = true;
            return flag;
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