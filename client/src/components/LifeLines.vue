<template>
    <div>
        <button @click="get5050()" v-if="fiftyFiftyActive" >50 : 50</button>
        <button @click="phoneAFriend()" v-if="phoneAFriendActive">Phone a friend</button>
        <button @click="askAudience()" v-if="askAudienceActive">Ask the audience</button>
    </div>
  
</template>

<script>
import { eventBus } from '@/main.js'

export default {
    name: "life-lines",
    data() {
        return {
            fiftyFiftyActive: true,
            phoneAFriendActive: true,
            askAudienceActive: true
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
        },
        askAudience: function() {
            eventBus.$emit('askAudience');
            this.askAudienceActive = false;
        }
    }

}
</script>

<style>

</style>