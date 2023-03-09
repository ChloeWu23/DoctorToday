import {describe, it, expect} from 'vitest'
import FAQs from '../src/views/FAQs.vue'
import {mount} from '@vue/test-utils'

describe('FAQs', () => {

    const testQuestionList = [{
        question: "Test Question",
        answer: "Test Answer"
    }]

    const wrapper = mount(FAQs, {
        data () {
            return {
                questionList: testQuestionList,
            }
        }
    })

    
    it('render FAQs.vue', () => {
        expect(wrapper.html()).toContain("Frequently Asked")
        expect(wrapper.html()).toContain("Questions")
    })

    it('render proper question texts when not clicked yet', () => {
        expect(wrapper.text()).toContain(testQuestionList[0].question)
    })
/*
    it('hide answers when not clicked yet', () => {
        const details = wrapper.find('details') 
        expect(details.isVisible()).toBe(false)
    })


    it('display answers when the question is clicked', async () => {

        const details = wrapper.find('details')
        
        const summary = wrapper.find('details').find('summary')
        await summary.trigger('click')

        expect(details.isVisible()).toBe(false)
        
        const answerDetails = details.find('.faqDetails')
        expect(answerDetails.text()).toContain(testQuestionList[0].answer)
    })
    */
})
