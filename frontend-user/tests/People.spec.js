import {describe, it, expect} from 'vitest'
import People from '../src/views/People.vue'
import {mount} from '@vue/test-utils'

describe('People', () => {
    
    it('render People.vue', () => {
        const wrapper = mount(People)
        expect(wrapper.text()).toContain("Meet Our Team")
    });

    const testPeopleList = [{
        name: "testName",
        title: "test_title"
    }]

    it('render proper texts', () => {
        const wrapper = mount(People, {
            data () {
                return {
                    peopleList: testPeopleList,
                }
            }
        })

        expect(wrapper.text()).toContain(testPeopleList[0].name)
        expect(wrapper.text()).toContain(testPeopleList[0].title)
    })
})