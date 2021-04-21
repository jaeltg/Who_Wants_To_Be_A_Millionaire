<template>
  <div>
      <img v-if="zsolt===false" :src="require(`../../../client/public/images/ludo.png`)" alt="">
      <h1 v-if="zsolt===true">I DON'T THINK SO!!!</h1>
      <img v-if="zsolt===true" :src="require(`../../../client/public/images/zsoltfinger.gif`)" alt="">
      <button v-if="zsolt===false" @click="playLudo">Place a nice game of Ludo</button>
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

<style>

</style>