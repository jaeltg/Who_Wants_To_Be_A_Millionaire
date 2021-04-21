<template>
<div id="win-component">
<h1 id="name">{{name}}</h1> 
<h1 id="millionaire"> MILLIONAIRE</h1>

<audio autoplay volume="0.2">
<source src="../../public/sounds/untitled.mp3" />
</audio>

<div id="div1" style="visibility:hidden;">
    <p id="message">But wait {{name}}... what was all that suspicious coughing in the background...?</p>
    <br>
    <button @click="getPrize">Claim your prize and run!</button>
    <br>
    <button @click="newGame">Prove that you didn't cheat by playing again...</button>
</div>

</div>
</template>

<script>
import { eventBus } from '@/main.js'

export default {
name: 'win',
props: ["name"],
mounted () {
    setTimeout (() => {
    document.getElementById('div1').style.visibility = "visible";
    },3000)
},
methods: {
    newGame: function() {
            eventBus.$emit('go-home')
    },
    getPrize: function() {
        eventBus.$emit('get-prize')
    },
  }
}


</script>

<style scoped>
#win-component{
    background-image: url('../../../client/public/images/raining-money.gif');
    background-repeat: none;
    padding: 50px;
}

#name {
    border: white 4px double;
    border-radius: 20px;
    font-family: Copperplate; 
    font-size: 40px;
    color: orange;
    background-color: darkblue
}

#millionaire{
    font-family: Copperplate;
    font-size: 90px;
}

#message {
    font-weight: bolder;
    font-size: 30px;
    margin-top: 60px;
    margin-bottom: 60px;
    background-color: darkblue;
    border: white 4px double;
    border-radius: 20px;
    padding: 5px;
}

button { 
    background-color: orange;
    padding: 10px;
    border-radius: 10px;
    font-weight: bold;
    color: darkblue;
    font-family: Copperplate;
    font-size: 20px;
    margin-bottom: 20px
}

button:focus {
    outline: 0px;
}
</style>