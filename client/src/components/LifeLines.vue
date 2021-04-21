<template>
    <div>
        <button @click="get5050()" v-if="fiftyFiftyActive" id="5050">
            <img src="images/Classic5050.png" alt="50:50">
        </button>
        <button @click="phoneAFriend()" v-if="phoneAFriendActive" id="phone-friend">
            <img src="images/call.png" alt="Phone a Friend">
        </button>
        <button @click="askAudience()" v-if="askAudienceActive" id="audience">
            <img src="images/Audience.png" alt="Ask the Audience">
        </button>
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

<style scoped>


</style>