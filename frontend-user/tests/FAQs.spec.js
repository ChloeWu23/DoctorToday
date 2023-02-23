import {describe, it, expect} from 'vitest'
import FAQs from '../src/views/FAQs.vue'
import {mount} from '@vue/test-utils'

describe('FAQs', () => {
    const wrapper = mount(FAQs)
    
    it('render FAQs.vue', () => {
        expect(wrapper.html()).toContain("Frequently Asked")
    });
    
})