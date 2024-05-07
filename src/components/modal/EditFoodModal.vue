<template></template>

<script>
  export default {
    name: 'EditFoodModal',
    props: ['id'],
    mounted() {
      console.log('Food id:', this.id);
    },
  };
</script>
