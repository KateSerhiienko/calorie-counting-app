<template>
  <header class="header glb-header">
    <p class="greeting">Welcome to</p>
    <p class="name">Calorie Counter</p>
    <p class="slogan">Weigh More, Weigh Less</p>
  </header>
</template>

<script>
  export default {
    name: 'GreetingPage',
  };
</script>

<style
  scoped
  lang="scss"
>
  .header {
    width: 54%;
    height: 100%;
    font-family: Amiko;
  }

  .greeting {
    margin-top: 60px;
    text-transform: initial;
    font-size: 28px;
  }

  .name {
    margin-top: 100px;
    font-family: Righteous;
    font-size: 34px;
  }

  .slogan {
    font-size: 18px;
    font-weight: normal;
  }
</style>
