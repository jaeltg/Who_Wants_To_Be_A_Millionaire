<template>
<div id="win-component">
<h1>{{name}}, you are a MILLIONAIRE!</h1>
<button @click="getPrize">Claim your Prize!</button>
<button @click="newGame">Back to Main Page</button>
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