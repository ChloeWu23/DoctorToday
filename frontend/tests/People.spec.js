import {describe, it, expect} from 'vitest'
import People from '../pages/People.vue'
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
        description: "Test Description",
        image: "@/assets/booking/booking.png"
    }]

    it('render proper texts for name, title and profile', () => {
        const wrapper = mount(People, {
            data () {
                return {
                    peopleList: testPeopleList
                }
            }
        })

        expect(wrapper.text()).toContain(testPeopleList[0].name)
        expect(wrapper.text()).toContain(testPeopleList[0].title)
        expect(wrapper.text()).toContain(testPeopleList[0].profile)
    })

    /*
    it('render proper people image', async () => {
        const wrapper = mount(People)
        const img = await wrapper.get('img')

        expect(img.attributes('src')).toBe(testPeopleList[0].image)
    })
    */

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
        const text = wrapper.find("div");
        
        expect(text.isVisible()).toBe(true);
        expect(wrapper.text()).toContain(testPeopleList[0].description)
    })
})