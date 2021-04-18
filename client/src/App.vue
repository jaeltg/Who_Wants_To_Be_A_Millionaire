<template>
  <div id="app">
    Welcome to millionaires!!!
  </div>
  <h1>Who Wants To Be a Millionaire</h1>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      questions: [],
      currentQuestion: null,
      currentState
    }
  },
  components: {
    
   
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
