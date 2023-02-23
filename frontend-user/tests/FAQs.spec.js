import {describe, it, expect} from 'vitest'
import FAQs from '../src/views/FAQs.vue'
import {mount} from '@vue/test-utils'
/*
describe('FAQs', () => {
    it('render FAQs.vue', () => {
        const wrapper = mount(FAQs)
        expect(wrapper.html()).toContain("Frequently Asked")
        expect(wrapper.html()).toContain("Questions")
    });
    

    const testQuestionList = [{
        question: "Test Question",
        answer: "Test Answer"
    }]

    it('render proper question and answer', () => {
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
*/

describe('FAQs', () => {
    it('displays the answers when the question is clicked', async () => {
        const testQuestionList = [{
            question: "Test Question",
            answer: "Test Answer"
        }]
      
        const wrapper = mount(FAQs,{
            data () {
                return {
                    questionList: testQuestionList,
                }
            }
        })
      const details = wrapper.find('details'); 
      expect(details.isVisible()).toBe(false); 
      const summary = details.find('summary');
      await summary.trigger('click');
      expect(details.isVisible()).toBe(false); 
      const answerDetails = details.find('.faqDetails'); 
      expect(answerDetails.text()).toContain(testQuestionList[0].answer);
    });
})
