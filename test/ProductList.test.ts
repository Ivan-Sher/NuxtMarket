import { describe, it, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ProductList from '~/components/product/ProductList.vue'
import ProductCard from '~/components/product/ProductCard.vue'

vi.mock('~/stores/cart', () => ({
  useCartStore: vi.fn(() => ({
    addItem: vi.fn(),
  })),
}))

const testProducts = [
  {
    id: 1,
    title: 'Wool Blend Coat',
    price: 189.99,
    image: '/images/coat.jpg',
    description: 'Warm wool blend coat.',
    sku: 1001,
    category: 'clothing',
    rating: 4,
  },
  {
    id: 2,
    title: 'Cashmere Scarf',
    price: 79.99,
    image: '/images/scarf.jpg',
    description: 'Soft cashmere scarf.',
    sku: 1002,
    category: 'accessories',
    rating: 5,
  },
  {
    id: 3,
    title: 'Leather Gloves',
    price: 49.99,
    image: '/images/gloves.jpg',
    description: 'Genuine leather gloves.',
    sku: 1003,
    category: 'accessories',
    rating: 3,
  },
]

function mountProductList() {
  const pinia = createPinia()
  setActivePinia(pinia)

  return mount(ProductList, {
    props: { products: testProducts },
    global: {
      plugins: [pinia],
      components: {
        ProductCard,
      },
    },
  })
}

describe('ProductList — похожие товары', () => {
  it('отображает все карточки товаров', () => {
    const wrapper = mountProductList()
    const cards = wrapper.findAll('.product-card')

    expect(cards).toHaveLength(3)
  })

  it('отображает название каждого товара', () => {
    const wrapper = mountProductList()
    const titles = wrapper.findAll('.product-card__title')

    expect(titles[0]!.text()).toContain('Wool Blend Coat')
    expect(titles[1]!.text()).toContain('Cashmere Scarf')
    expect(titles[2]!.text()).toContain('Leather Gloves')
  })

  it('отображает цену каждого товара', () => {
    const wrapper = mountProductList()
    const prices = wrapper.findAll('.product-card__price')

    expect(prices[0]!.text()).toContain('$ 189.99')
    expect(prices[1]!.text()).toContain('$ 79.99')
    expect(prices[2]!.text()).toContain('$ 49.99')
  })

  it('отображает изображение каждого товара', () => {
    const wrapper = mountProductList()
    const images = wrapper.findAll('img')

    expect(images[0]!.attributes('src')).toBe('/images/coat.jpg')
    expect(images[1]!.attributes('src')).toBe('/images/scarf.jpg')
    expect(images[2]!.attributes('src')).toBe('/images/gloves.jpg')
  })
})
