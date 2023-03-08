import {describe, it, expect} from 'vitest'
import FAQs from '../pages/about/FAQs.vue'
import {mount} from '@vue/test-utils'
import { waitFor } from '@testing-library/vue'

describe('FAQs', () => {

    it('render FAQs.vue', async () => {
        const wrapper = mount(FAQs)
        //expect(wrapper.html()).toMatchInlineSnapshot("Frequently Asked")
        //expect(wrapper.text()).toContain("Frequently Asked")
        await waitFor(() => expect(wrapper.html()).toContain("Questions"))
    })
/*
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

    it('render proper question texts when not clicked yet', () => {
        expect(wrapper.text()).toContain(testQuestionList[0].question)
    })

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
