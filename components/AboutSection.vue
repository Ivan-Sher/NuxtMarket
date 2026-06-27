<template>
  <div class="about">
    <div class="about__head">
      <h3>About</h3>
      <h5>Who we are and why we do what we do!</h5>
      <p>
        Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin ante a, gravida
        arcu. Nam fringilla molestie velit, eget pellentesque risus scelerisque a. Nam ac urna
        maximus, tempor magna et, placerat urna. Curabitur eu magna enim. Proin placerat tortor
        lacus, ac sodales lectus placerat quis.
      </p>
    </div>
    <div class="about__trends">
      <h4>Top trends</h4>
      <div class="about__img">
        <NuxtImg src="/About.jpg" width="670" height="300" alt="About" />
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat
        hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris
        eget arcu facilisis consequat sed eu felis.
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .about {
    box-sizing: border-box;
    display: block;
    width: 100%;
    max-width: 670px;
    margin: 90px 0 0;

    @media (max-width: $bp-sm) {
      margin-top: 20px;
      margin-bottom: 70px;
    }

    &__head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
    }

    &__head h3 {
      @include text(h4);

      width: 100%;
      margin: 0;
      text-align: center;

      @media (max-width: $bp-sm) {
        @include text(h1);

        text-align: left;
      }
    }

    &__head h5 {
      @include text(h3);

      width: 100%;
      margin-top: 24px;
      margin-bottom: 46px;
      text-align: center;

      @media (max-width: $bp-sm) {
        margin-top: 0;
        margin-bottom: 15px;
        text-align: left;
      }
    }

    &__head p {
      @include text(body-lg);

      margin: 0;

      @media (max-width: $bp-sm) {
        @include text(h4);

        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }

    &__trends {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin-top: 40px;

      @media (max-width: $bp-sm) {
        margin-top: 20px;
      }
    }

    &__trends h4 {
      @include text(h5);

      margin-top: 0;
      margin-bottom: 20px;

      @media (max-width: $bp-sm) {
        @include text(h2);

        margin-bottom: 10px;
      }
    }

    &__img {
      width: 100%;
      overflow: hidden;
      border-radius: 8px;

      img {
        display: block;
        width: 100%;
        height: auto;

        @media (max-width: $bp-sm) {
          height: 200px;
          object-fit: cover;
        }
      }
    }

    &__trends p {
      margin-top: 50px;
      margin-bottom: 0;
      line-height: 27px;

      @media (max-width: $bp-sm) {
        @include text(h4);

        display: -webkit-box;
        margin-top: 16px;
        overflow: hidden;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }
  }
</style>
