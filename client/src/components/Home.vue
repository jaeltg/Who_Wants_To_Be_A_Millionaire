<template>
<div id="home-component">
    <h2>Welcome!</h2>
    <form @submit.prevent="handleClick">
        <label for="name">Please enter your name</label> 
        <br>     
        <input id="name" type="text" v-model="name" required>
        <br>
        <input type="submit" value="Start Game" id="submit">
    </form>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'

export default {
    name: "home",
    data() {
        return {
            name: ""
        }
    },
    methods: {
        handleClick: function() {
            eventBus.$emit('start-gameplay');
            eventBus.$emit('reset-gameplay', "true");
            eventBus.$emit('name', this.name)
        }
    }
}
</script>

<style scoped>
#home-component {
    text-align: center
}
#submit {
    display: block;
    padding: 20px;
    margin-right: auto;
    margin-left: auto;
    margin-top:20px
}
</style>