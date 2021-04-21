<template>
<div id="home-component">
    <h2>Welcome!</h2>
    <!-- <audio autoplay volume="0.5">
  <source src="../../public/sounds/main_theme.mp3" />
</audio> -->

    <form @submit.prevent="handleClick">
        <label for="name">Please enter your name</label> 
        <br>     
        <input id="name" type="text" v-model="name" required>
        <br>
        <input type="submit" value="Start Game" id="submit">
    </form>
    <h3 id="top-scores">TOP SCORES</h3>
    <ul id="scores-list">
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
            scoresList: [],
            formattedScores: []
        }
    },
    mounted(){
        MillionerService.getScores()
        .then((scores) =>  scores.sort((a,b) => parseInt(b.score) - parseInt(a.score)))        
        .then((sortedScores) => (this.scoresList = sortedScores.slice(0, 5)))
    },
    methods: {
        handleClick: function() {
            eventBus.$emit('start-gameplay');
            eventBus.$emit('reset-gameplay', "true");
            eventBus.$emit('name', this.name)
        },
        formatScores: function() {

        }
    }
}
</script>
<style scoped>
h2 {
    font-family: Copperplate;
    font-size: 50px;
    margin-bottom: 10px;
}    
label {
    font-size: 20px;
    margin-bottom: 20px;
}
#name {
    border-radius: 10px;
    border: white 5px solid;
    margin-top: 15px;
    font-family: Avenir;
}

#home-component {
    text-align: center
}
#submit {
    background-color: orange;
    padding: 10px;
    font-weight: bold;
    color: darkblue;
    font-size: 30px;
    font-family: Copperplate;
    margin-top: 80px;
    border-radius: 10px;
}
#top-scores {
    font-size: 30px;
     font-family: Copperplate;
     margin-top: 80px;
}
#scores-list{
    list-style: none;
    padding: 0;
}
#scores-list > li {
    font-size: 20px;
}
</style>