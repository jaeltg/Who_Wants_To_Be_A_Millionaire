<template>
    
  <div id="grid-container">
      <div id="features">
          <life-lines :currentAnswers="currentAnswers" :correctAnswerIndex="correctAnswerIndex" :phoneFriendMessage="phoneFriendMessage"/>
          <money-list :moneyList="moneyList" :potentialPrize="potentialPrize"/>
     </div>
          
      <section v-if="!lost">
      <div>
          <img v-if="displayingGraph" :src="require(`../../../client/public/images/${correctAnswerIndex}.png`)" alt="">
          <h3 v-html="phoneFriendMessage">{{phoneFriendMessage}} </h3>
          <h2 v-html="currentQuestion" id="question">{{currentQuestion}}</h2>  
                    
          <ol id="answer-container">
              <li class="answer" v-for="(answer, index) in currentAnswers" :key="index" 
              @click="checkAnswer(answer); answerSelected($event, answer)" 
              :class="answer.selected ? 'selected' : 'not-selected'" 
              :id="answer.right ? 'right' : 'wrong'">
                 <button v-html="answer.answer" 
                 :class="answer.inactive ? 'inactive' : 'active'" :disabled="answer.inactive" >{{answer.answer}}</button>
             </li>
          </ol>
          <button class="button" v-if="indexCounter>0" @click="takeMoney()">Take my Money!</button>
      </div>
      </section>
      <section v-else>
          <div>
            <audio autoplay volume="0.2">
            <source src="../../public/sounds/wrong_answer.mp3" />
            </audio>  
              <h2 id='lost-message'>{{name}}, you are a disappointment!!</h2>
              <p id='prize-money'>You leave with £{{currentPrize}}</p>
            <button class="button" id="restart-game" @click="restartGame" >Redeem yourself, loser!</button>
          </div>
      </section>
  </div>
</template>

<script>
import LifeLines from '../components/LifeLines.vue'
import MoneyList from '../components/MoneyList.vue'
import MillionerService from '../../services/MillionerService.js'
import {shuffle} from 'lodash';
import { eventBus } from '@/main.js'

export default {   
    name: 'gameplay',
    data() {
        return {
            currentQuestion: null,
            currentAnswers: [],
            moneyList: ["100", "200", "300", "500", "1,000", "2,000", "4,000", "8,000", "16,000", "32,000", "64,000", "125,000", "250,000", "500,000", "1,000,000"],
            indexCounter: 0,
            currentPrize: 0,
            potentialPrize: "100",
            lost: false,
            winner: false,
            currentAnswerCorrect: null,
            phoneFriendMessage: "",
            correctAnswerIndex: null,
            displayingGraph: false
            
        }
    },

    components: {
        'life-lines': LifeLines,
        'money-list': MoneyList
    },

    props: ["questions", "name"],

    mounted() {
        this.getCurrentAnswers(this.indexCounter)
        this.getCurrentQuestion(this.indexCounter)  

        eventBus.$on('get5050', () => {
            this.get5050()
            }) ,

        eventBus.$on('phoneAFriend', (payload) => {
            this.phoneFriendMessage = payload + this.currentAnswerCorrect
        }),

        eventBus.$on('askAudience', (payload) => {
            this.correctAnswerIndex = payload
            this.displayingGraph = true
        })
        
    },

    methods: {
        getCurrentQuestion: function(index) {
            this.currentQuestion = this.questions[index].question
            console.log(this.currentQuestion)
        },

        getCurrentAnswers: function(index) {
            let answers = []
            const answersWrong = this.questions[index].incorrect_answers
            answers = answersWrong.map( incorrectAnswer => {
                    return {answer: incorrectAnswer, correct: false, selected: false, inactive: false}     
            })
            const answerCorrect =this.questions[index].correct_answer
            this.currentAnswerCorrect = answerCorrect
            answers.push({answer: answerCorrect, correct: true, right: false, selected: false, inactive: false})

            this.currentAnswers = shuffle(answers)
        },

        // handleClick function - on click select answer (change select to true) then do check answer function which has the timeout and does the green to the right answer
        answerSelected: function(event, answer) {
            answer.selected = true
            setTimeout(() => {
            for (const answer of this.currentAnswers) {
                if (answer.correct === true) {
                    answer.right = true
                }
              }
            }, 1000)
        },
        
        checkAnswer: function(answer) {
            setTimeout(() => {
            if (answer.correct && this.indexCounter < 14) {
                this.indexCounter ++;
                this.getCurrentQuestion(this.indexCounter)
                this.getCurrentAnswers(this.indexCounter)
                this.currentPrize = this.moneyList[this.indexCounter - 1]
                this.potentialPrize = this.moneyList[this.indexCounter]
                this.phoneFriendMessage = ""
                this.displayingGraph = false
                
            }

            else if (answer.correct && this.indexCounter === 14){
                const score = {
                        name: this.name,
                        score: 10000000
                    }
                MillionerService.addScore(score)
                eventBus.$emit('winner')
            }

            else {
                this.lost = true;
                if (this.indexCounter < 4) {
                    this.currentPrize = 0
                    const score = {
                        name: this.name,
                        score: 0
                    }
                    MillionerService.addScore(score)
                }
                else if (this.indexCounter < 9){
                    this.currentPrize = 1000
                    const score = {
                        name: this.name,
                        score: 1000
                    }
                    MillionerService.addScore(score)
             
                                    }
                else if (this.indexCounter <= 14){
                    this.currentPrize = 32000
                    const score = {
                        name: this.name,
                        score: 32000
                    }
                    MillionerService.addScore(score)
                    
                    
                }  
              }      
            } 
            , 2000)
        },

        restartGame: async function() {
            eventBus.$emit('go-home')
        },

        takeMoney: function(){
            const score = {
                name: this.name,
                score: this.currentPrize.replace(",","")
            }
            MillionerService.addScore(score)
            .then(eventBus.$emit('take-money', this.currentPrize));  
        }
      }
    }
</script>

<style scoped>
ol {
list-style-type: upper-alpha;
list-style-position: inside;
text-align: left;
}

#grid-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
}

.selected {
    background-color: orange; 
    color: darkblue 
}
.selected ::marker {
    color:darkblue
}
.selected > button {
    color:darkblue;
}

#right {
    background-color: greenyellow;
}

#right > button {
    color:darkblue;
}

#answer-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 80px;
}

.answer {
    border: white 4px double;
    border-radius: 20px;
    width: 80%;
    font-size: 25px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 20px;
    margin-bottom: 20px,;
    margin-top: 20px;
    color: orange;
    font-weight: bold;
    font-family: Copperplate;
}

button {
    background-color: transparent;
    color: white;
    border: none;
    font-size: 18px;
    font-family: Avenir;
  
}

.button {
    background-color: orange;
    padding: 10px;
    border-radius: 10px;
    font-weight: bold;
    color: darkblue;
    font-family: Copperplate;
    font-size: 25px;
}

button:focus {
    outline: 0px;
}

#question {
    border: white 4px double;
    border-radius: 20px;
    margin-top: 60px;
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    padding: 5px;
}

#features {
    margin-left: 30px;
}

.inactive {
    color: transparent;
}

#lost-message {
    margin-top: 60px
}

#prize-money {
    font-size: 20px;
    margin-bottom: 60px;
}

</style>