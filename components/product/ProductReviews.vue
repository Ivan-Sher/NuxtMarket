<script setup lang="ts">
  import type { Review } from '~/composables/useProductReviews'
  import BaseButton from '~/components/ui/BaseButton.vue'

  withDefaults(
    defineProps<{
      reviews: Review[]
      formName: string
      formEmail: string
      formRating: number
      formText: string
      errors: Record<string, string>
      successMessage: string
    }>(),
    {
      formName: '',
      formEmail: '',
      formRating: 0,
      formText: '',
      successMessage: '',
    },
  )

  defineEmits<{
    'update:formName': [value: string]
    'update:formEmail': [value: string]
    'update:formRating': [value: number]
    'update:formText': [value: string]
    submit: []
  }>()
</script>
<template>
  <div class="product-reviews">
    <div class="product-reviews__left">
      <h3>{{ reviews.length }} Reviews for lira earings</h3>
      <p v-if="reviews.length === 0">No reviews yet. Be the first!</p>
      <ul v-else>
        <li v-for="(review, index) in reviews" :key="index" class="review-item">
          <div class="review-item__title">
            <p class="name">{{ review.name }}</p>
            <p class="date">{{ review.date }}</p>
          </div>
          <div class="stars">
            <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= review.rating }"
              >★</span
            >
          </div>
          <p>{{ review.text }}</p>
        </li>
      </ul>
    </div>
    <div class="product-reviews__right">
      <h4>Add a Review</h4>
      <p class="desc">Your email address will not be published. Required fields are marked *</p>
      <form class="review-form" @submit.prevent="$emit('submit')">
        <div class="form-group">
          <textarea
            :value="formText"
            required
            rows="4"
            placeholder="Your Review*"
            @input="$emit('update:formText', ($event.target as HTMLTextAreaElement).value)"
          ></textarea>
          <span v-if="errors.text" class="error">{{ errors.text }}</span>
        </div>
        <div class="form-group">
          <input
            :value="formName"
            type="text"
            required
            placeholder="Enter your name*"
            @input="$emit('update:formName', ($event.target as HTMLInputElement).value)"
          />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>
        <div class="form-group">
          <input
            :value="formEmail"
            type="email"
            required
            placeholder="Enter your Email*"
            @input="$emit('update:formEmail', ($event.target as HTMLInputElement).value)"
          />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <input type="checkbox" class="form-group__checkbox" />
          <p class="checkbox-p">
            Save my name, email, and website in this browser for the next time I comment
          </p>
        </div>
        <div class="form-group rating">
          <label>Your rating*</label>
          <div class="star-select">
            <span
              v-for="i in 5"
              :key="i"
              class="star"
              :class="{ filled: i <= formRating }"
              @click="$emit('update:formRating', i)"
              >★</span
            >
          </div>
          <span v-if="errors.rating" class="error">{{ errors.rating }}</span>
        </div>
        <BaseButton type="submit" class="submit-btn">Submit</BaseButton>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </form>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .product-reviews {
    display: flex;
    gap: 60px;
    width: 100%;
    max-width: 1248px;
    margin: 10px 0;

    @media (max-width: $bp-sm) {
      flex-direction: column;
    }
  }

  .product-reviews__right,
  .product-reviews__left {
    width: 100%;
    max-width: 580px;
  }

  .product-reviews__left ul {
    padding: 0;
    list-style: none;
  }

  .product-reviews__left h3 {
    @include text(h3);
  }

  .product-reviews__right h4 {
    margin: 10px 0;

    @include text(h3);
  }

  .checkbox-p {
    margin-left: 10px;
    font-size: 13px;
    font-weight: 400;
    line-height: 30px;
    color: var(--dark-gray);
    text-transform: capitalize;
  }

  .desc {
    margin-bottom: 100px;
    font-size: 13px;
    font-weight: 400;
    line-height: 30px;
    color: var(--dark-gray);
    text-transform: capitalize;
  }

  .review-item {
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .review-item__title {
    display: flex;
    align-items: center;
  }

  .review-item__title .name {
    padding-right: 15px;
    margin: 0;

    @include text(h3);

    color: var(--black);
  }

  .review-item__title .date {
    margin: 0;
    font-size: var(--body-md-fs);
    font-weight: var(--body-md-fw);
    line-height: 22px;
    color: var(--dark-gray);
  }

  .review-item .stars {
    display: flex;
    gap: 5px;
    font-size: var(--body-lg-fs);
    color: #ccc;
  }

  .review-item .star.filled {
    color: #f5b342;
  }

  .star-select .star {
    font-size: 24px;
    color: #ccc;
    cursor: pointer;
    transition: color 0.2s;
  }

  .star-select .star.filled {
    color: #f5b342;
  }

  .review-form {
    margin-top: 20px;
  }

  .form-group {
    display: flex;
    align-items: center;
    justify-content: left;
    margin-bottom: 12px;
  }

  .form-group__checkbox {
    width: 100%;
    max-width: 18px;
  }

  .form-group input {
    width: 100%;
    padding: 15px 0;
    margin: 0;
    outline: none;
    border: none;
    border-bottom: 1px solid var(--gray);
  }

  .form-group textarea {
    width: 100%;
    height: 22px;
    padding: 15px 0;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    border: none;
    border-bottom: 1px solid var(--gray);
  }

  .form-group input::placeholder {
    font-size: var(--body-md-fs);
    font-weight: var(--body-md-fw);
    line-height: 22px;
    color: var(--dark-gray);
  }

  .form-group textarea::placeholder {
    font-size: var(--body-md-fs);
    font-weight: var(--body-md-fw);
    line-height: 22px;
    color: var(--dark-gray);
  }

  .form-group label {
    font-size: var(--body-md-fs);
    font-weight: var(--body-md-fw);
    line-height: 22px;
    color: var(--dark-gray);
  }

  .rating {
    display: block;
  }

  .error {
    font-size: 13px;
    color: #e74c3c;
  }

  .success {
    font-weight: 600;
    color: #27ae60;
  }

  .submit-btn {
    width: 120px;
    height: 50px;
    padding: 10px 24px;
    font-size: var(--body-lg-fs);
    font-weight: var(--body-lg-fw);
    line-height: 100%;
    color: var(--white);
    cursor: pointer;
    background: var(--black);
    border: none;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .submit-btn:hover {
    background: #333;
  }
</style>
