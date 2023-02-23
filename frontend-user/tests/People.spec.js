import {describe, it, expect} from 'vitest'
import People from '../src/views/People.vue'
import {mount} from '@vue/test-utils'

describe('People', () => {
    const wrapper = mount(People)
    
    it('render People.vue', () => {
        expect(wrapper.text()).toContain("Meet Our Team")
    });

    const testPeopleList = [{
        name: "testName",
        title: "test_title"
    }]

    it('render proper texts', () => {
        const wrapper2 = mount(People, {
            data () {
                return {
                    peopleList: testPeopleList,
                }
            }
        })

        expect(wrapper2.text()).toContain(testPeopleList[0].name)
        expect(wrapper2.text()).toContain(testPeopleList[0].title)
    })
})