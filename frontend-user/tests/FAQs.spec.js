import {describe, it, expect} from 'vitest'
import FAQs from '../src/views/FAQs.vue'
import {mount} from '@vue/test-utils'

describe('FAQs', () => {
    it('render FAQs.vue', () => {
        const wrapper = mount(FAQs)
        expect(wrapper.html()).toContain("Frequently Asked")
    });
    

    const testQuestionList = [{
        question: "Test Question",
        answer: "Test Answer"
    }]

    it('render proper questionList', () => {
        const wrapper = mount(FAQs, {
            data () {
                return {
                    questionList: testQuestionList,
                }
            }
        })

        expect(wrapper.text()).toContain(testQuestionList[0].question)
        expect(wrapper.text()).toContain(testQuestionList[0].answer)
    })
})