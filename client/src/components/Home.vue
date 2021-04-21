<template>
<div id="home-component">
    <h2>Welcome!</h2>
    <form @submit.prevent="handleClick">
        <label for="name">Please enter your name</label> 
        <br>     
        <input id="name" type="text" v-model="name" required>
        <br>
        <input type="submit" value="Start Game" id="submit">
    </form>
    <h3>TOP SCORES</h3>
    <ul>
        <li v-for="(score, index) in scoresList" :key="index">{{score.name}} won £{{score.score}}</li>
    </ul>
  </div>
</template>

<script>
import MillionerService from '../../services/MillionerService.js'
import { eventBus } from '@/main.js'

export default {
    name: "home",
    data() {
        return {
            name: "",
            scoresList: []
        }
    },
    mounted(){
        MillionerService.getScores()
        .then((scores) =>  scores.sort((a,b) => parseFloat(b.score) - parseFloat(a.score)))        
        .then((sortedScores) => (this.scoresList = sortedScores))
    },
    methods: {
        handleClick: function() {
            eventBus.$emit('start-gameplay');
            eventBus.$emit('reset-gameplay', "true");
            eventBus.$emit('name', this.name)
        }
    }
}
</script>

<style scoped>
#home-component {
    text-align: center
}
#submit {
    display: block;
    padding: 20px;
    margin-right: auto;
    margin-left: auto;
    margin-top:20px
}
</style>