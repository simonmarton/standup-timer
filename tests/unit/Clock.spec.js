import { shallowMount } from '@vue/test-utils';
import Clock from '@/components/Clock.vue';

describe('Clock.vue', () => {
  it('renders time passed', () => {
    const totalSeconds = 162;
    const wrapper = shallowMount(Clock, {
      propsData: { totalSeconds }
    });
    expect(wrapper.text()).toMatch('02:42');
  });
});
