<template>
<div id="win-component">
<h1>{{name}}</h1> 
<h1> MILLIONAIRE</h1>

<div id="div1" style="visibility:hidden;">
    <p>But wait {{name}}... what was all that suspicious coughing in the background...?</p>
    <br>
    <button @click="getPrize">Claim your prize and run!</button>
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

p { 
    font-weight: 100px;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 40px;
    padding-top: 80px;
    padding-bottom: 80px;
}

h1 {
    border-style:double;
    border-radius: 20px;
    font-family: Copperplate;
}

button { 
    padding: 20px;
    margin: 20px;
}

</style>