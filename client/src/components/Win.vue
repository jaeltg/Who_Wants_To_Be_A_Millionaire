<template>
<div id="win-component">
<h1>{{name}}</h1> 
<h1> MILLIONAIRE</h1>


<button @click="getPrize">Claim your prize and run!</button>
<button @click="newGame">Prove that you didn't cheat by playing again...</button>
</div>
</template>

<script>
import { eventBus } from '@/main.js'

export default {
name: 'win',
props: ["name"],
methods: {
    newGame: function() {
            eventBus.$emit('go-home')
    },
    getPrize: function() {
        eventBus.$emit('get-prize')
    }
  }
}
</script>

<style scoped>
#win-component{
    background-image: url('../../../client/public/images/raining-money.gif');

}


</style>