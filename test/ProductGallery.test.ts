import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductGallery from '~/components/product/ProductGallery.vue'

const mockImages = ['/images/photo-1.jpg', '/images/photo-2.jpg']

describe('ProductGallery', () => {
  it('отображает главное изображение с alt-текстом для доступности', () => {
    const wrapper = mount(ProductGallery, {
      props: { images: mockImages },
    })

    const mainImage = wrapper.find('.main-image img')
    expect(mainImage.exists()).toBe(true)
    expect(mainImage.attributes('alt')).toBe('Основное изображение')
  })

  it('переключает изображение при клике на миниатюру', async () => {
    const wrapper = mount(ProductGallery, {
      props: { images: mockImages },
    })

    const firstSrc = wrapper.find('.main-image img').attributes('src')

    await wrapper.findAll('.thumbnail')[1]!.trigger('click')

    const secondSrc = wrapper.find('.main-image img').attributes('src')

    expect(secondSrc).not.toBe(firstSrc)
    expect(secondSrc).toBe('/images/photo-2.jpg')
  })
})
