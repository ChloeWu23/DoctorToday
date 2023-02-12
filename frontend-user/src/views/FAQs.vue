<template>
    <div class="px-5 md:p-40 md:bg-top md:pt-30 bg-[url('@/assets/faq.jpg')] bg-no-repeat">
        <div class="grid justify-items-stretch pt-20 md:pt-0 md:pr-20">
            <div class="justify-center py-6 md:p-8 md:pr-10 text-2xl md:w-30 md:text-4xl font-bold text-sky-700 
                        bg-slate-300 rounded-3xl bg-opacity-50 leading-relaxed md:leading-relaxed
                        flex items-center md:justify-self-end">
                    Frequently Asked<br>Questions
            </div>
        </div>

        <div class="pt-10 md:pt-20"><br></div>

        <div class="pb-10">
            <div class = "w-full h-full shadow-md md:m-4 backdrop-blur-sm bg-white bg-opacity-50">
                <div class="">
                    <details class="open:bg-gray-100 duration-300" v-for="(item,index) in QuestionList" :key="index">
                        <summary style="outline: none;" 
                        class="px-2 py-3 text-lg cursor-pointer hover:bg-gray-100 border-t-2 flex justify-between items-center w-full text-sm md:text-base">
                            <p class="p-2 text-sky-700">{{ index+1 }}. {{ item.question }}</p>
                        </summary>
                        <div class="bg-white p-8 py-10 text-sm md:text-base text-justify leading-7" style="white-space: pre-line">
                        {{ item.answer }}
                        </div>
                    </details>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DataFAQ from '../dataRoutes/DataFAQ'
/*
            <div class="pt-20 md:pt-0 md:px-20 md:col-end-5">
                <p class="px-10 py-6 md:py-8 text-3xl md:w-full md:text-4xl font-bold text-sky-700 
                        bg-slate-300 rounded-3xl bg-opacity-50 leading-relaxed
                        flex items-center justify-center text-left"> 
                Frequently Asked<br>Questions</p>
            </div>
            */
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
    content: url("@/assets/plus.png");
    font-size: 2em;
    color: #708090;
    transition: transform 0.5s ease-in-out;
}
details[open] summary::after {
    content: url("@/assets/plus.png");
    transform: rotate(-45deg);
    transition: transform 0.5s ease-in-out;
}

</style>