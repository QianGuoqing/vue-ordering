<template>
  <div id="app">
    <product-list-one></product-list-one>
    <product-list-two></product-list-two>
  </div>
</template>

<script>
  import ProductListOne from './components/ProductListOne'
  import ProductListTwo from './components/ProductListTwo'
  export default {
    name: 'App',
    components: {
      ProductListOne,
      ProductListTwo
    },
    data() {
      return {}
    },
  }
</script>

<style>
  body {
    color: #555;
  }
</style>
