<template>
<div class = "xl:max-w-screen-xl mx-auto" id="pageContent">
    <div class="container mx-auto h-[155px] md:h-auto 2xl:h-[600px] px-5 md:pl-20 md:bg-top md:pt-40 xl:max-w-screen-xl bg-[url('@/assets/faq.jpg')] bg-no-repeat bg-cover">
        <div class="justify-left pt-[50px] md:pt-0 md:pb-20">
            <div class="text-lg md:text-4xl font-bold text-sky-700
                        leading-relaxed md:leading-relaxed md:justify-self-left">
                Frequently Asked<br>Questions
            </div>
        </div>
        <div class="pt-10 md:pt-20"><br></div>
    </div>

    <div class="pb-10 flex justify-center">
        <div class="w-full h-full md:w-3/4 shadow-md backdrop-blur-sm bg-white bg-opacity-50">
            <div class="">
                <details class="open:bg-gray-200" v-for="(item, index) in questionList" :key="index">
                    <summary style="outline: none;" class="px-2 py-3 text-lg cursor-pointer hover:bg-gray-200 
                                    border-t-2 flex justify-between items-center w-full text-sm md:text-base"
                        id="faq.question">
                        <p class="p-2 text-sky-700">{{ index + 1 }}. {{ item.question }}</p>
                    </summary>
                    <div class="bg-white p-8 py-10 text-sm md:text-base text-justify leading-7"
                        style="white-space: pre-line">
                        {{ item.answer }}
                    </div>
                </details>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    async setup() {
        const {data: questionList, pending, error, refresh } = await useAsyncData(
            () => $fetch("https://doctor-today-back.herokuapp.com/faq")
        )
        return { questionList };
    }
}
</script>

<style>

</style>