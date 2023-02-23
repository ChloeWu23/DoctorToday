import {describe, it, expect} from 'vitest'
import People from '../src/views/People.vue'
import {mount} from '@vue/test-utils'

describe('People', () => {
    
    it('render People.vue', () => {
        const wrapper = mount(People)
        expect(wrapper.text()).toContain("Meet Our Team")
    });

    const testPeopleList = [{
        name: "Test Name",
        title: "Test Title",
        profile: "Test Profile",
        description: "Test Description"
    }]

    it('render proper texts for name, title and profile', () => {
        const wrapper = mount(People, {
            data () {
                return {
                    peopleList:
                }
            }
        })

        expect(wrapper.text()).toContain(testPeopleList[0].name)
        expect(wrapper.text()).toContain(testPeopleList[0].title)
        expect(wrapper.text()).toContain(testPeopleList[0].profile)

    })

    it('not show description when button is no clicked', () => {
        const wrapper = mount(People, {
            data () {
                return {
                    peopleList: testPeopleList,
                }
            }
        })

        expect(wrapper.text()).not.toContain(testPeopleList[0].description)
    })

    it('show description when button is clicked', async () => {
        const wrapper = mount(People, {
            data () {
                return {
                    peopleList: testPeopleList,
                }
            }
        })

        await wrapper.find("button").trigger("click")

        expect(wrapper.text()).toContain(testPeopleList[0].description)
    })
})