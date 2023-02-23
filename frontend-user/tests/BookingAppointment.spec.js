import {describe, it, expect} from 'vitest'
import BookingAppointment from '../src/views/BookingAppointment.vue'
import {mount} from '@vue/test-utils'

describe('BookingAppointment', () => {
    const wrapper = mount(BookingAppointment)
    
    it('render BookingAppointment.vue', () => {
        expect(wrapper.html()).toContain("Booking Requests")
    });
    
})