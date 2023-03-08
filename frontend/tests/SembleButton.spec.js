import { mount } from '@vue/test-utils'
import SembleButton from '../components/SembleButton.vue'
import RequestAppointmentModal from '../components/RequestAppointmentModal.vue'

describe('Semble Button', () => {
  test('clicking the cross closes the modal ', () => {
    const data = { sembleForm: '<iframe src="">Mock</iframe>' }
    const wrapper = mount(SembleButton, {
      propsData: {
        data,
      },
      stubs: ['RequestAppointmentModal'], // stub the child component
    })

    const childWrapper = wrapper.findComponent(RequestAppointmentModal)
    const button = wrapper.find('button')
    const initial = wrapper.vm.showModal;
    button.trigger('click')
    expect(wrapper.vm.showModal).toBe(!initial)
  })
})
