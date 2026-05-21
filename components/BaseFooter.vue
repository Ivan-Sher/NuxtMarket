<template>
  <footer class="footer">
    <div class="footer__section footer__section--top">
      <FooterNav class="footer__nav" />
      <FooterForm class="footer__form" />
    </div>
    <div class="footer__section footer__section--bottom">
      <FooterPolicy class="footer__policy" />
      <FooterIcons class="footer__icons" />
    </div>
  </footer>
</template>
<style scoped lang="scss">
  .footer {
    display: flex;
    flex-wrap: wrap;
    max-width: 1248px;
    margin: 0 auto;
    margin-top: 250px;
    margin-bottom: 100px;
    border-top: 1px solid #d8d8d8;

    @media (width <= 1272px) {
      margin: 250px 24px 100px;
    }

    @media (max-width: $bp-sm) {
      box-sizing: border-box;
      flex-wrap: wrap;
      width: 100%;
      max-width: 100%;
      padding: 0 16px;
      margin: 70px 0 20px;
      border: none;
    }

    &__section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      @media (max-width: $bp-512) {
        flex-flow: column-reverse wrap;
        align-items: start;
      }
    }

    &__section--top {
      padding: 50px 0;
    }
  }
</style>
