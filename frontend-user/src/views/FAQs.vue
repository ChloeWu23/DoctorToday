<template>
    
    <div class = "text-left text-2xl">
		<h1>Frequently Asked Questions</h1>
        <div><br></div>
	</div> 
    
    <div class = "text-left m-0">
    <ol style="list-style-type: decimal">
        <li v-for = "(item,index) in QuestionList" :key = "item.id">
            <p class = "text-left text-lg font-bold m-2">
                {{ item.question }}
            </p>
            <p class = "text-left text-medium italic m-2">
                {{ item.answer }}
            </p>
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