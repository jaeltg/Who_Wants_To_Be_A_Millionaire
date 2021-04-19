<template>
  <div id="app">
    <h1>Who Wants to Be a Millionaire</h1>
    <home v-if="gameView==='home'"/>
    <gameplay v-if="gameView==='gameplay'"/>
    <!-- <take-money v-if="gameView='take-money'"/>
    <win v-if="gameView='win'"/> -->
  </div>
</template>

<script>
import Gameplay from './components/Gameplay.vue'
import Home from './components/Home.vue'
import { eventBus } from '@/main.js'

export default {
  name: 'App',
  data() {
    return {
      gameView: "home"
    }
  },
  components: {
    'gameplay': Gameplay,
    'home': Home
   
  },
  mounted() {
    eventBus.$on('start-gameplay', () => {
        this.gameView = "gameplay"
        
    })
    
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
