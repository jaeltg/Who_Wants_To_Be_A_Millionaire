<template>
  <div id="grid-container">
      <div>
      <ul v-for="(money, index) in moneyList.slice().reverse()" :key="index" id="money-list">
          <li v-if="potentialPrize === money" class="highlight">
              {{money}}
              </li>
             <li v-else class="normal"> <p>£{{money}}</p>
          </li>
      </ul>
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
        currentQuestion: null,
        currentAnswers: [],
        moneyList: ["100", "200", "300", "500", "1,000", "2,000", "4,000", "8,000", "16,000", "32,000", "64,000", "125,000", "250,000", "500,000", "1 MILLION"],
        indexCounter: 0,
        currentPrize: 0,
        potentialPrize: "100",
        lost: false,
        moneyWithKeys: []
       
    }
},
props: ["questions"],

mounted() {
     this.getCurrentAnswers(this.indexCounter)
     this.getCurrentQuestion(this.indexCounter)
     this.addKeysToMoneyList()   
    
},

methods: {

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
            this.potentialPrize = this.moneyList[this.indexCounter]
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

        addKeysToMoneyList: function() {
            this.moneyList.forEach((money) => {
                const prizeWithKeys = {quantity: money, basePrize: false}
                this.moneyWithKeys.push(prizeWithKeys)
            })
            this.moneyWithKeys.forEach((money) => {
                if (money.quantity === "1,000" || money.quantity === "32,000" || money.quantity === "1 MILLION") {
                    money.basePrize = true
                }
            })
        },
        
        restartGame: async function() {
        eventBus.$emit('go-home')
        // eventBus.$emit('restart-gameplay')
        // await this.getCurrentQuestion(this.indexCounter)
        // await this.getCurrentAnswers(this.indexCounter)
        // this.lost = false
        // this.indexCounter = 0
        // this.currentPrize = 0
    }
    },
    
    
}

</script>

<style scoped>
#grid-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
}

.highlight {
    background-color: hotpink
}
</style>