<template>
  <div>
      <h3>{{name}}, you took your money! You leave with £{{ takeawayPrize }}</h3>
      <button @click="goHome()">Start Again</button>
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

<style>

</style>