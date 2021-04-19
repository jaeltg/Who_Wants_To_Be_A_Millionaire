<template>
  <div id="app">
    <h1>Who Wants to Be a Millionaire</h1>
    <gameplay />
  </div>
</template>

<script>
import Gameplay from './components/Gameplay.vue'

export default {
  name: 'App',
  data() {
    return {
      // currentState,
    }
  },
  components: {
    'gameplay': Gameplay
   
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
