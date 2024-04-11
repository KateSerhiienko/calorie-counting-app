<template>
  <div>
    <router-link to="/">Greeting</router-link>
    <router-link to="/calorie_counting">Calorie counting</router-link>
    <router-link to="/calorie_recording">Calorie recording</router-link>
  </div>
</template>

<style scoped>
div {
  margin-top: 20px;
  width: 180px;
  display: inline-block;
  vertical-align: top;
}
div a {
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
}
</style>
