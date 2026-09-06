import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTabs from '~/components/ui/BaseTabs.vue'

const tabs = [
  { title: 'Description', content: 'Premium quality leather jacket with durable stitching.' },
  { title: 'Additional Info', content: 'Hand wash cold. Do not bleach. Hang to dry.' },
  { title: 'Reviews', content: '★★★★☆ Average rating: 4.2 out of 5 from 120 reviews.' },
]

function mountTabs() {
  return mount(BaseTabs, {
    props: { tabs },
    global: {
      stubs: { ProductIcon: true },
    },
  })
}

describe('BaseTabs', () => {
  it('отображает заголовки табов', () => {
    const wrapper = mountTabs()

    expect(wrapper.text()).toContain('Description')
    expect(wrapper.text()).toContain('Additional Info')
    expect(wrapper.text()).toContain('Reviews')
  })

  it('показывает контент первого таба по умолчанию', () => {
    const wrapper = mountTabs()
    const panels = wrapper.findAll('.tabs-content > div')

    expect(panels[0]!.isVisible()).toBe(true)
    expect(panels[1]!.isVisible()).toBe(false)
    expect(panels[2]!.isVisible()).toBe(false)
  })

  it('переключает видимый контент при клике на таб', async () => {
    const wrapper = mountTabs()
    const panels = wrapper.findAll('.tabs-content > div')

    await wrapper.findAll('.tab-btn')[1]!.trigger('click')
    await wrapper.setProps({ modelValue: 1 })

    expect(panels[0]!.isVisible()).toBe(false)
    expect(panels[1]!.isVisible()).toBe(true)
    expect(panels[1]!.text()).toContain('Hand wash cold')
  })

  it('отображает корректный контент для каждого таба', async () => {
    const wrapper = mountTabs()
    const panels = wrapper.findAll('.tabs-content > div')
    const btns = wrapper.findAll('.tab-btn')

    expect(panels[0]!.text()).toContain('Premium quality leather jacket')

    await btns[1]!.trigger('click')
    await wrapper.setProps({ modelValue: 1 })
    expect(panels[1]!.text()).toContain('Hand wash cold')

    await btns[2]!.trigger('click')
    await wrapper.setProps({ modelValue: 2 })
    expect(panels[2]!.text()).toContain('Average rating: 4.2')
  })
})
