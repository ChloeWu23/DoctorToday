import { mount } from '@vue/test-utils'
import SembleButton from '../components/SembleButton.vue'

describe('Semble Button', () => {
  test('clicking the cross closes the modal ', () => {
    const wrapper = mount(SembleButton)
    const button = wrapper.find('button')
    const initial = wrapper.vm.showModal;
    button.trigger('click')
    expect(wrapper.vm.showModal).toBe(!initial)
  })
})
