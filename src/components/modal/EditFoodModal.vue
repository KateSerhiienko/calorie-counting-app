<template><p>EditFoodModal</p></template>

<script>
  export default {
    name: 'EditFoodModal',
    props: ['id'],
    mounted() {
      console.log('Food id:', this.id);
    },
  };
</script>
