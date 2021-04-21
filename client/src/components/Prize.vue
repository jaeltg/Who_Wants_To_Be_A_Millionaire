<template>
  <div>
      <img v-if="zsolt===false" :src="require(`../../../client/public/images/ludo.png`)" alt="">
      <h1 v-if="zsolt===true">I DON'T THINK SO!!!
        <audio autoplay volume="0.5">
        <source src="../../public/sounds/sad_trombone.mp3" />
      </audio>
      </h1>
      <img v-if="zsolt===true" :src="require(`../../../client/public/images/zsoltfinger.gif`)" alt="">
      <br>
      <button v-if="zsolt===false" @click="playLudo">Play a nice game of Ludo</button>
      <button v-if="zsolt===true" @click="goHome">TRY AGAIN</button>
  </div>
  
  
</template>

<script>
import { eventBus } from '@/main.js'

export default {
  name: "prize",
   data() {
    return {
      zsolt: false
    }
  },
  methods: {
        playLudo: function() {
            this.zsolt = true
        },
        goHome: function() {
            eventBus.$emit('go-home')
        }
  }
}
</script>

<style scoped>
button {
    background-color: orange;
    padding: 5px;
    border-radius: 10px;
    font-weight: bold;
    color: darkblue;
    font-family: Copperplate;
    font-size: 20px;
    margin-top: 30px;
}

h1 {
  margin-top: 40px;
  margin-bottom: 0px;
  font-size: 30px;
  text-align: center;
}

img {
  height: 501.271px;
  width: 450px;
}

button:focus {
    outline: 0px;
}
</style>