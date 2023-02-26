import {describe, it, expect} from 'vitest'
import BookingAppointment from '../src/views/BookingAppointment.vue'
import {mount} from '@vue/test-utils'

/*
describe('BookingAppointment', () => {
    const wrapper = mount(BookingAppointment)
    
    it('render BookingAppointment.vue', () => {
        expect(wrapper.html()).toContain("Booking Requests")
    });
    
})
*/

test('renders image properly', async () => {
    const wrapper = mount(BookingAppointment)
  
    // Wait for the image to load
    await waitFor(() => {
      const img = wrapper.find('img')
      return img.exists() && img.element.complete && img.element.naturalWidth !== 0
    })
  
    // Assert that the image is rendered properly
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('@/assets/booking/booking.png')
  })