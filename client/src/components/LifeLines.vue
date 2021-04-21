<template>
    <div id="lifeline-container">
        <button @click="get5050()" v-if="fiftyFiftyActive" id="5050">
            <img src="../../public/images/Classic5050.png" alt="50:50">
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
    props: ["currentAnswers", "correctAnswerIndex", "phoneFriendMessage"],
    data() {
        return {
            fiftyFiftyActive: true,
            phoneAFriendActive: true,
            askAudienceActive: true,
            rightAnswerIndex: null
        }
    },
    methods: {
        phoneAFriend: function() {
            const message = "Chris is not sure ... but thinks it could be ... "
            eventBus.$emit("phoneAFriend", message)
            this.phoneAFriendActive = false
        },
        
         get5050: function() {
            const removedAnswers = []
            for (var i = 0; i<3; i++) {
                if (this.currentAnswers[i].correct === false && removedAnswers.length < 2){
                    this.currentAnswers[i].inactive = true
                    removedAnswers.push(this.currentAnswers[i])
                }
                this.fiftyFiftyActive = false
                // eventBus.$emit('get5050');
            } 
            },

        askAudience: function() {
            for (const answer of this.currentAnswers) {
                if (answer.correct === true)
                // this.correctAnswerIndex = this.currentAnswers.indexOf(answer)
                this.rightAnswerIndex = this.currentAnswers.indexOf(answer)
                eventBus.$emit("askAudience", this.rightAnswerIndex)
            }
            this.askAudienceActive = false;
            // eventBus.$emit('askAudience');
        }
        }

}
</script>

<style scoped>
button {
    background-color: transparent;
    border: none;
}
img {
    height: 40px;
    width: 80px;
}

#lifeline-container{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

</style>