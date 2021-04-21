<template>
  <div>
      <h2>{{name}}, you chickened out! You leave with £{{ takeawayPrize }}</h2>
      <button @click="goHome()">Stop Yolking Around!</button>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'

export default {
    name: "take-money",
    props: ["takeawayPrize", "name"],
    methods: {
        goHome: function() {
            eventBus.$emit('go-home')
    }
  }
}
</script>

<style scoped>
h2{
    margin-top: 40px;
}
button {
    background-color: orange;
    padding: 10px;
    border-radius: 10px;
    font-weight: bold;
    color: darkblue;
    font-family: Copperplate;
    font-size: 25px;
    margin-top: 30px;
}

</style>