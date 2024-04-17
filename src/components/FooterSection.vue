<template>
  <div class="wrapper">
    <ul>
      <li><b>Kateryna Serhiienko</b></li>
      <li>09599 Freiberg Germany</li>
      <li>april 2024</li>
    </ul>
    <ul>
      <li>
        <a
          href="mailto:kate.serhiienko@gmail.com"
          target="_blank"
          >E-mail</a
        >
      </li>
      <li>
        <a
          href="https://github.com/"
          target="_blank"
          >GitHub</a
        >
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/kateserhiienko/"
          target="_blank"
          >LinkedIn</a
        >
      </li>
      <li>
        <a
          href="https://www.artstation.com/katerynaserhiienko3"
          target="_blank"
          >ArtStation</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FooterSection',
};
</script>

<style
  scoped
  lang="scss"
>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $background-color;
  }
</style>
