<template>
    
    <div class = "text-left text-2xl">
        <div><br></div>
		<h1 class="text-sky-700">Frequently Asked Questions</h1>
        <div><br></div>
	</div> 
    
    <div class = "min-w-full float-left">
        <ol>
            <li v-for="(item,index) in QuestionList" :key="index" class="mb-4">
                <button  
                    class="text-left w-full py-1 text-black text-lg font-extrabold  hover:bg-gray-200"
                    @click="item.showAnswer = !item.showAnswer">
                      <span class = "font-bold inline-flex">{{ index +1 }}. &nbsp;</span>
                      {{ item.question }}    
            </button>
            
            <transition name="slide-fade">
                <p v-if="item.showAnswer"
                    class="py-2 p-4 bg-white font-bold text-base ">
                        {{ item.answer }}
                </p>
            </transition>
            <hr class="text-grey-300 border-1.5">
            </li>
            
        </ol>
    </div>

</template>

<script>
import DataFAQ from '../dataRoutes/DataFAQ'

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