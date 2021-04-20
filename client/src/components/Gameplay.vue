<template>
    
  <div id="grid-container">
      <div>
          <life-lines />
      <ul v-for="(money, index) in moneyList.slice().reverse()" :key="index" id="money-list">
          <li v-if="potentialPrize === money" class="highlight">
              £{{money}}
              </li>
             <li v-else class="normal"> <p>£{{money}}</p>
          </li>
      </ul>
      </div>
      <section v-if="!lost">
      <div>
          <h2 v-html="currentQuestion">{{currentQuestion}}</h2>
          <ol>
              <li v-for="(answer, index) in currentAnswers" :key="index" @click="checkAnswer(answer); answerSelected($event, answer)">
                 <button id="button" v-html="answer.answer" :class="answer.selected ? 'selected' : 'not-selected'">{{answer.answer}}</button>
             </li>
          </ol>
          <button v-if="indexCounter>0" @click="takeMoney()">Take my Money!</button>
      </div>
      </section>
      <section v-else>
          <div>
              <h2>{{name}}, you are a disappointment!!</h2>
              <p>You leave with £{{currentPrize}}</p>
            <button @click="restartGame" >Redeem yourself, loser!</button>
          </div>
      </section>
  </div>
</template>

<script>
import LifeLines from '../components/LifeLines.vue'
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
        winner: false,
        // moneyWithKeys: [],
       
       
    }
},
components: {
    'life-lines': LifeLines
   
  },
props: ["questions", "name"],

mounted() {
     this.getCurrentAnswers(this.indexCounter)
     this.getCurrentQuestion(this.indexCounter)
    //  this.addKeysToMoneyList()   

     eventBus.$on('get5050', () => {
        this.get5050()
        }) 
    
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
                const fullAnswer = {answer: incorrectAnswer, correct: false, selected: false} // in here add selected key?
                answers.push(fullAnswer)       
        })
        const answerCorrect =this.questions[index].correct_answer
        answers.push({answer: answerCorrect, correct: true, selected: false})

        let shuffledArray = shuffle(answers)
        this.currentAnswers = shuffledArray
    },

    // handleClick function - on click select answer (change select to true) then do check answer function which has the timeout and does the green to the right answer
    answerSelected: function(event, answer) {
        answer.selected = true
        // for (answer of this.currentAnswers) {
        if (answer.correct) {
            event.target.classList.add('correct')
        }
        },
    
    checkAnswer: function(answer) {
        setTimeout(() => {
        if (answer.correct && this.indexCounter < 14) {
            this.indexCounter ++;
            this.getCurrentQuestion(this.indexCounter)
            this.getCurrentAnswers(this.indexCounter)
            this.currentPrize = this.moneyList[this.indexCounter - 1]
            this.potentialPrize = this.moneyList[this.indexCounter]
        }
        else if (answer.correct && this.indexCounter === 14){
            eventBus.$emit('winner')
        }
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
          } 
        , 1000)
    },

        // addKeysToMoneyList: function() {
        //     this.moneyList.forEach((money) => {
        //         const prizeWithKeys = {quantity: money, basePrize: false}
        //         this.moneyWithKeys.push(prizeWithKeys)
        //     })
        //     this.moneyWithKeys.forEach((money) => {
        //         if (money.quantity === "1,000" || money.quantity === "32,000" || money.quantity === "1 MILLION") {
        //             money.basePrize = true
        //         }
        //     })
        // },
        
        restartGame: async function() {
        eventBus.$emit('go-home')
        // eventBus.$emit('restart-gameplay')
        // await this.getCurrentQuestion(this.indexCounter)
        // await this.getCurrentAnswers(this.indexCounter)
        // this.lost = false
        // this.indexCounter = 0
        // this.currentPrize = 0
    },

    takeMoney: function(){
        eventBus.$emit('take-money', this.currentPrize);
        
    },

    get5050: function() {
        for(var i = 0; i<3; i++) {
            if(this.currentAnswers[i].correct === false){
                this.currentAnswers.splice(i, 1)
            }
        }
        // console.log("Player wants 50-50")
        // this.currentAnswers.forEach((answer) => {
        //     this.currentAnswers.splice(answer, 1)
        // })
        // for (answer of this.currentAnswers) {
        //     if (answer.correct === false) {
        //         this.currentAnswers.splice(answer, 1)
        //     }
        // }


     
    }

    },
    
    
}

</script>

<style scoped>
ol {
list-style-type: upper-alpha;
}

#grid-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
}

.highlight {
    background-color: orange;
}

/* #button {
    background-color: none;
    transition: ease-in-out, background-color 1s ease-in-out;
}
#button:focus{
    background-color: orange;  
} */

.selected {
    background-color: orange
}

.correct {
    background-color: greenyellow
}

</style>