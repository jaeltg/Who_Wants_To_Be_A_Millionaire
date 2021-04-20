<template>
    <div>
        <button @click="get5050()" v-if="fiftyFiftyActive" >50 : 50</button>
        <button @click="phoneAFriend()" v-if="phoneAFriendActive">Phone a friend</button>
        <button>Ask the audience</button>
    </div>
  
</template>

<script>
import { eventBus } from '@/main.js'

export default {
    name: "life-lines",
    data() {
        return {
            fiftyFiftyActive: true,
            phoneAFriendActive: true
        }
    },
    methods: {
        get5050: function() {
            eventBus.$emit('get5050');
            this.fiftyFiftyActive = false
        },
        phoneAFriend: function() {
            eventBus.$emit('phoneAFriend');
            this.phoneAFriendActive = false
        }
    }

}
</script>

<style>

</style>