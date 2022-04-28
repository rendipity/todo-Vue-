<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
import todoPage from '@/pages/todoPage'
export default {
  name: 'App',
  components: {
    todoPage
  }
}
</script>

<style>
#app{
  min-height: 660px;
}

</style>
