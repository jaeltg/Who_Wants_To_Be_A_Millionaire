<template>
  <div id="app">
    <h1>Who Wants to Be a Millionaire</h1>
    <home v-if="gameView==='home'"/>
    <gameplay v-if="gameView==='gameplay'" :questions="questions"/>
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
      gameView: "home",
      questions: []
    }
  },
  components: {
    'gameplay': Gameplay,
    'home': Home
   
  },
  mounted() {
    this.getAllQuestions()
    
    eventBus.$on('start-gameplay', () => {
        this.gameView = "gameplay"

    eventBus.$on('go-home', () => {
      this.gameView = "home"
      this.getAllQuestions()

    
    })
        
    })  
  },
  methods: {
    getAllQuestions: async function() {
        const responseEasy = await fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
        const dataEasy = await responseEasy.json()
        const questionsEasy = dataEasy.results

        const responseMedium = await fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple')
        const dataMedium = await responseMedium.json()
        const questionsMedium = dataMedium.results

        const responseHard = await fetch('https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple')
        const dataHard = await responseHard.json()
        const questionsHard = dataHard.results

        this.questions = questionsEasy.concat(questionsMedium, questionsHard)
        
    },
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
