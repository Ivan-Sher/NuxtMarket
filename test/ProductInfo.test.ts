// test/ProductInfo.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductInfo from '~/components/product/ProductInfo.vue'

const testProduct = {
  id: 15,
  title: 'Classic Leather Jacket',
  price: 299.99,
  description: 'Premium genuine leather jacket with a timeless design.',
  image: '/images/jacket.jpg',
  sku: 8542,
  category: 'clothing',
  rating: 4,
}

const defaultProps = {
  product: testProduct,
  reviewCount: 12,
}

describe('ProductInfo', () => {
  it('отображает всю информацию о товаре', () => {
    const wrapper = mount(ProductInfo, {
      props: defaultProps,
      global: {
        stubs: {
          BaseButton: false,
          ProductIcons: true,
          Share: true,
          ArrowRight: true,
        },
      },
    })

    expect(wrapper.text()).toContain('Classic Leather Jacket')
    expect(wrapper.text()).toContain('$ 299.99')
    expect(wrapper.text()).toContain('12 customer reviews')
    expect(wrapper.text()).toContain('Premium genuine leather jacket with a timeless design.')
    expect(wrapper.text()).toContain('SKU: 8542')
    expect(wrapper.text()).toContain('Categories: clothing')
  })

  it('отображает кнопку ADD TO CART и текущее количество', () => {
    const wrapper = mount(ProductInfo, {
      props: defaultProps,
      global: {
        stubs: {
          BaseButton: false,
          ProductIcons: true,
          Share: true,
          ArrowRight: true,
        },
      },
    })

    expect(wrapper.text()).toContain('ADD TO CART')
    expect(wrapper.text()).toContain('1')
  })
})
