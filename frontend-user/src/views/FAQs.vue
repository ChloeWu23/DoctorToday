<template>
    <div class = "h-full shadow-md md:m-8">
		<h1 class="text-2xl text-sky-700 px-6 pb-4">Frequently Asked Questions</h1>
        <div class="">
            <details class="open:bg-gray-100 duration-300" v-for="(item,index) in QuestionList" :key="index">
                <summary
                    class="px-4 py-3 text-lg cursor-pointer hover:bg-gray-100 border-t-2 flex justify-between items-center w-full text-sm md:text-base">
                    <p class="p-2 text-sky-700">{{ index+1 }}. {{ item.question }}</p>
                </summary>
                <div class="bg-white p-6 text-base text-justify" style="white-space: pre-line">{{ item.answer }}</div>
            </details>
        </div>
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
    mounted() {
        DataFAQ.get()
        .then(res => {
            this.QuestionList = res.data;
            for (let i = 0; i < this.QuestionList.length; i++) {
                this.QuestionList[i].answer = this.QuestionList[i].answer.replace(/&pound/g, "£");
            }
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