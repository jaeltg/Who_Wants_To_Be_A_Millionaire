<template>
  <div>
      <button @click="getCurrentAnswers(indexCounter); getCurrentQuestion(indexCounter);">Get Answers</button>
      <div>
      <ul>
          <li>
          </li>
      </ul>
      </div>
      <div>
          <h2 v-html="currentQuestion">{{currentQuestion}}</h2>
          <ul v-for="(answer, index) in currentAnswers" :key="index">
              <li @click="checkAnswer(answer)">
                 <button v-html="answer.answer">{{answer.answer}}</button>
             </li>
          </ul>
      </div>
  </div>
</template>

<script>
import {shuffle} from 'lodash';

export default {   
name: 'gameplay',
data() {
    return {
        questions: [],
        currentQuestion: null,
        currentAnswers: [],
        moneyList: [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000],
        indexCounter: 0
    }
},

mounted() {
    this.getAllQuestions()

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
        }
        else {
            return
        }
    }
 
}

}
</script>

<style>

</style>