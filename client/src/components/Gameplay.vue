<template>
  <div>
      <button @click="getCurrentAnswers(); getCurrentQuestion();">Get Answers</button>
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
        moneyList: [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000]
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
        this.currentQuestion = this.questions[0].question
        console.log(this.currentQuestion)
    },

    getCurrentAnswers: function(index) {
        let answers = []
        const answersWrong = this.questions[0].incorrect_answers // [answer, answer, ...]
        answersWrong.forEach( incorrectAnswer => {
                const fullAnswer = {answer: incorrectAnswer, correct: false}
                answers.push(fullAnswer)       
        })
        const answerCorrect =this.questions[0].correct_answer
        answers.push({answer: answerCorrect, correct: true})

        let shuffledArray = shuffle(answers)
        this.currentAnswers = shuffledArray
    }
 
}

}
</script>

<style>

</style>