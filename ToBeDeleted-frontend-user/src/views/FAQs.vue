<template>
    <div class="px-5 md:pl-20 md:bg-top md:pt-40 bg-[url('@/assets/faq.jpg')] bg-no-repeat">
        <div class="grid justify-items-stretch pt-20 md:pt-0 md:pb-20">
            <div class="bg-center text-2xl md:text-4xl font-bold text-sky-700
                            leading-relaxed md:leading-relaxed
                            flex items-center md:justify-self-left">
                Frequently Asked<br>Questions
            </div>
        </div>
        <div class="pt-10 md:pt-20"><br></div>
    </div>

    <div class="pb-10">
        <div class="w-full h-full shadow-md md:m-4 backdrop-blur-sm bg-white bg-opacity-50">
            <div class="">
                <details class="open:bg-gray-100" v-for="(item, index) in QuestionList" :key="index">
                    <summary style="outline: none;" class="px-2 py-3 text-lg cursor-pointer hover:bg-gray-100 
                                     border-t-2 flex justify-between items-center w-full text-sm md:text-base">
                        <p class="p-2 text-sky-700">{{ index + 1 }}. {{ item.question }}</p>
                    </summary>
                    <!-- <div class="bg-white p-8 py-10 text-sm md:text-base text-justify leading-7" style="white-space: pre-line">
                        {{ item.answer }}
                        </div> -->
                    <div class="bg-white p-8 py-10 text-sm md:text-base text-justify leading-7"
                        style="white-space: pre-line" v-html="item.answer">
                    </div>
                </details>
            </div>

        </div>
    </div>
</template>

<script>
import DataFAQ from '../dataRoutes/DataFAQ'

export default {
    data() {
        return {
            questionList: [],
        }
    },
    mounted() {
        DataFAQ.get()
            .then(res => {
                this.questionList = res.data;
                for (let i = 0; i < this.questionList.length; i++) {
                    this.questionList[i].answer = this.questionList[i].answer.replace(/&pound/g, "£");
                }
            })
            .catch(err => {
                console.log("Error: can not retrieve FAQs data")
            })
    }
}
</script>

<!-- <style>

</style> -->