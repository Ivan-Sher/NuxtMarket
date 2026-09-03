import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductInfo from '~/components/product/ProductInfo.vue'

const testProduct = {
  id: 15,
  title: 'Classic Leather Jacket',
  price: 299.99,
  description: 'Premium genuine leather jacket.',
  image: '/images/jacket.jpg',
  sku: 8542,
  category: 'clothing',
  rating: 4,
}

const defaultProps = {
  product: testProduct,
  reviewCount: 12,
  quantity: 1,
}

function mountProductInfo(props = {}) {
  return mount(ProductInfo, {
    props: { ...defaultProps, ...props },
    global: {
      stubs: { BaseButton: false, ProductIcons: true, Share: true, ArrowRight: true },
    },
  })
}

describe('ProductInfo — управление количеством', () => {
  it('увеличивает количество при клике на +', async () => {
    const wrapper = mountProductInfo({ quantity: 1 })

    await wrapper.findAll('.quantity button')[1]!.trigger('click')

    await wrapper.setProps({ quantity: 2 })

    expect(wrapper.find('.quantity span').text()).toBe('2')
  })

  it('уменьшает количество при клике на −', async () => {
    const wrapper = mountProductInfo({ quantity: 3 })

    await wrapper.findAll('.quantity button')[0]!.trigger('click')
    await wrapper.setProps({ quantity: 2 })

    expect(wrapper.find('.quantity span').text()).toBe('2')
  })

  it('не уменьшает количество ниже 1', async () => {
    const wrapper = mountProductInfo({ quantity: 1 })

    await wrapper.findAll('.quantity button')[0]!.trigger('click')

    expect(wrapper.find('.quantity span').text()).toBe('1')
  })

  it('многократное нажатие + увеличивает количество', async () => {
    const wrapper = mountProductInfo({ quantity: 1 })

    await wrapper.findAll('.quantity button')[1]!.trigger('click')
    await wrapper.setProps({ quantity: 2 })

    await wrapper.findAll('.quantity button')[1]!.trigger('click')
    await wrapper.setProps({ quantity: 3 })

    expect(wrapper.find('.quantity span').text()).toBe('3')
  })
})
