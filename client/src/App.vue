<template>
  <div id="app">
    <img src="images/millioners-logo.png" alt="Who Wants to be a Millioner!" id="logo">
    <home v-if="gameView ==='home'"/>
    <gameplay v-if="gameView ==='gameplay'" :questions="questions" :name="name"/>
    <take-money v-if="gameView ==='take-money'" :takeawayPrize="takeawayPrize" :name="name"/>
    <win v-if="gameView ==='win'" :name="name"/>
    <prize v-if="gameView ==='prize'"/>
  </div>
</template>

<script>
import Gameplay from './components/Gameplay.vue'
import Home from './components/Home.vue'
import TakeMoney from './components/TakeMoney.vue'
import Win from './components/Win.vue'
import Prize from './components/Prize.vue'
import MillionerService from '../services/MillionerService.js'
import { eventBus } from '@/main.js'

export default {
  name: 'App',
  data() {
    return {
      gameView: "home",
      questions: [],
      takeawayPrize: 0,
      name: null
    }
  },

  components: {
    'gameplay': Gameplay,
    'home': Home,
    'take-money':TakeMoney,
    'win': Win,
    'prize': Prize
   
  },

  mounted() {
    this.getAllQuestions()
    
    eventBus.$on('start-gameplay', () => {
        this.gameView = "gameplay"
    }) 
        
    eventBus.$on('go-home', () => {
      this.takeawayPrize = 0
      this.gameView = "home"
      this.getAllQuestions()
    })

    eventBus.$on('take-money', (prize) => {
      this.gameView = "take-money"
      this.takeawayPrize = prize
    })  

    eventBus.$on('winner', () => {
      this.gameView = "win"
    })

    eventBus.$on('get-prize', () => {
      this.gameView = "prize"
    })

    eventBus.$on('name', (name) => {
      this.name = name
    })

    },
    
  methods: {
    getAllQuestions: async function() {
        const questionsEasy = await this.getQuestions('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
        const questionsMedium = await this.getQuestions('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple')
        const questionsHard = await this.getQuestions('https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple')
  
        this.questions = questionsEasy.concat(questionsMedium, questionsHard)  
    },

    getQuestions: async function(APIurl) {
      const response = await fetch(APIurl)
      const data = await response.json()
      return data.results
    }

  }

}
</script>

<style>
body {
 background: rgb(9,9,121);
 background: linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(95,27,196,1) 50%, rgba(9,9,121,1) 100%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 20px;
}

#logo {
  width:200px;
  height:200px;
}

</style>
