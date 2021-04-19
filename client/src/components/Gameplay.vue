<template>
  <div>
      <button @click="getCurrentAnswers(indexCounter); getCurrentQuestion(indexCounter);">Get Answers</button>
      <div>
      <!-- <ul v-for="(money, index) in moneyList" :key="index">
          <li>
              <p>£{{money}}</p>
          </li>
      </ul> -->
      <p>{{currentPrize}}</p>
      </div>
      <section v-if="!lost">
      <div>
          <h2 v-html="currentQuestion">{{currentQuestion}}</h2>
          <ul v-for="(answer, index) in currentAnswers" :key="index">
              <li @click="checkAnswer(answer)">
                 <button v-html="answer.answer">{{answer.answer}}</button>
             </li>
          </ul>
          <button>Take my Money!</button>
      </div>
      </section>
      <section v-else>
          <div>
              <h2>Name, you are a disappointment!!</h2>
              <p>You leave with £{{currentPrize}}</p>
            <button @click="restartGame" >Redeem yourself, loser!</button>
            <button>Go to Main Page</button>
          </div>
      </section>
  </div>
</template>

<script>
import {shuffle} from 'lodash';
import { eventBus } from '@/main.js'

export default {   
name: 'gameplay',
data() {
    return {
        questions: [],
        currentQuestion: null,
        currentAnswers: [],
        moneyList: ["100", "200", "300", "500", "1,000", "2,000", "4,000", "8,000", "16,000", "32,000", "64,000", "125,000", "250,000", "500,000", "1 MILLION"],
        indexCounter: 0,
        currentPrize: 0,
        lost: false,
        active: false

    }
},

mounted() {
    eventBus.$on('reset-gameplay', (payload) => {
        this.active = payload[0]
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

    getCurrentQuestion: function(index) {
        this.currentQuestion = this.questions[index].question
        console.log(this.currentQuestion)
    },

    getCurrentAnswers: function(index) {
        let answers = []
        const answersWrong = this.questions[index].incorrect_answers // [answer, answer, ...]
        answersWrong.forEach( incorrectAnswer => {
                const fullAnswer = {answer: incorrectAnswer, correct: false}
                answers.push(fullAnswer)       
        })
        const answerCorrect =this.questions[index].correct_answer
        answers.push({answer: answerCorrect, correct: true})

        let shuffledArray = shuffle(answers)
        this.currentAnswers = shuffledArray
    },

    checkAnswer: function(answer) {
        if (answer.correct && this.indexCounter < 14) {
            this.indexCounter ++;
            this.getCurrentQuestion(this.indexCounter)
            this.getCurrentAnswers(this.indexCounter)
            this.currentPrize = this.moneyList[this.indexCounter - 1]
        }
        // else if (answer.correct && this.indexCounter === 14){
        //     return
        // }
        else {
            this.lost = true;
            if (this.indexCounter < 4) {
                this.currentPrize = 0
            }
            else if (this.indexCounter < 9){
                this.currentPrize = "1,000"
            }
            else if (this.indexCounter < 14){
                this.currentPrize = "32,000"
            }        
          } 
        },
        
        restartGame: function() {
        this.lost = false
        this.indexCounter = 0
        this.getAllQuestions()
        .then(this.getCurrentQuestion(this.indexCounter))
        .then(this.getCurrentAnswers(this.indexCounter))
        this.currentPrize = 0
    }
    },
    watch: {
    active: function() {
        this.getAllQuestions()
        .then(this.getCurrentAnswers(this.indexCounter))
        .then(this.getCurrentQuestion(this.indexCounter))
        }
    },
    
    
}

</script>

<style>

</style>