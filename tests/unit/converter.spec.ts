
import { mount } from '@vue/test-utils'
import Converter from '@/components/Converter/index.vue'

// test('setSelected demo', async () => {
//   const wrapper = mount(Converter)
//   const options = wrapper.find('select').findAll('option')

//   await options.at(1).setSelected()

//   expect(wrapper.find('option:checked')).toBe('bar')
// })

test('updates the model on user input', () => {
    const wrapper = mount(Converter)
    const newValue = 'A new extractor';
    const input = wrapper.find('input');

    (wrapper.find('input').element as HTMLInputElement).value = newValue;
    input.trigger('input');

    expect(wrapper.text()).toBe(newValue);
  });