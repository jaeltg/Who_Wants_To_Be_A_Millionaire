<template>
  <button @click="handleClick">Start Game</button>
</template>

<script>
import { eventBus } from '@/main.js'

export default {
    name: "home",
    data() {
        return {
            name: null
        }
    },
    methods: {
        handleClick: function() {
            eventBus.$emit('start-gameplay');
            eventBus.$emit('reset-gameplay', "true");
        }
    }

}
</script>

<style>

</style>