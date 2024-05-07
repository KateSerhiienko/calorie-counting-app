<template></template>

<script>
  export default {
    name: 'EditFoodComponent',
    props: ['id'],
    mounted() {
      console.log('Food id:', this.id);
    },
  };
</script>
