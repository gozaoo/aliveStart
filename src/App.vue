<script>
  import searchBar from './components/searchBar.vue'
  import background from './components/background.vue'
  
  export default {
    name: 'app',
    components:{
      searchBar,
      background
    },
    data(){
      return {
      }
    },
    methods: {

    }
  };

</script>

<template>
  <h1 class="title">你好</h1>
  <background />
  <searchBar></searchBar>

</template>

<style scoped>
  .title{
    color: #fffb;
  }
</style>
  